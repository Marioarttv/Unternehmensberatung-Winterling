/* smoothScrolling.js — single, self‑contained version  
   Wraps everything in an IIFE so no globals leak and avoids duplicate declarations.
   Exposes only the public helpers on window. */
(() => {
    // ---------- Helpers ----------
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    /* -------------------- Smooth scrolling -------------------- */
    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (!el) return false;

        const navHeight = $('.services-nav')?.offsetHeight || 0;
        const targetY = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({ top: targetY, behavior: 'smooth' });
        updateActiveNavItem(id);
        return true;
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* -------------------- Active‑link handling -------------------- */
    function updateActiveNavItem(id) {
        $$('.services-nav-item').forEach(item => {
            item.classList.toggle('active',
                // data‑dataset or href or legacy onclick matches the id
                item.dataset.target === id ||
                (item.getAttribute('href') || '').endsWith(`#${id}`) ||
                (item.getAttribute('onclick') || '').includes(id));
        });
    }

    /* -------------------- Case‑study filtering -------------------- */
    function updateActiveFilterButton(cat) {
        $$('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.category === cat));
    }

    function filterCaseStudies(cat) {
        $$('.case-study-card').forEach(card => {
            card.style.display = (cat === 'all' || card.dataset.category.includes(cat)) ? 'flex' : 'none';
        });
        updateActiveFilterButton(cat);
    }

    /* -------------------- Scroll‑spy -------------------- */
    function setupScrollSpy() {
        const sections = $$('.service-detail');
        const navHeight = $('.services-nav')?.offsetHeight || 0;
        if (!sections.length) return;

        let timeout;
        window.addEventListener('scroll', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const scrollPos = window.pageYOffset + navHeight + 100;
                let current = '';
                let closest = Infinity;

                sections.forEach(sec => {
                    const top = sec.offsetTop;
                    const bottom = top + sec.offsetHeight;
                    if (scrollPos >= top && scrollPos <= bottom) {
                        const dist = Math.abs(scrollPos - (top + sec.offsetHeight / 2));
                        if (dist < closest) {
                            closest = dist;
                            current = sec.id;
                        }
                    }
                });
                if (current) updateActiveNavItem(current);
            }, 50);
        });
    }

    /* -------------------- Fragment jump after load -------------------- */
    function checkForFragmentAndScroll() {
        setTimeout(() => {
            const frag = window.location.hash.slice(1);
            if (frag) scrollToSection(frag);
        }, 500);
    }

    /* -------------------- Public init -------------------- */
    function initScrolling() {
        setupScrollSpy();
        checkForFragmentAndScroll();
    }

    // Run automatically on DOM ready (keeps MainLayout simpler)
    document.addEventListener('DOMContentLoaded', initScrolling);

    // Expose helpers Blazor might call
    Object.assign(window, {
        scrollToSection,
        scrollToTop,
        updateActiveNavItem,
        setupScrollSpy,
        filterCaseStudies,
        initScrolling,
        checkForFragmentAndScroll
    });
})();
