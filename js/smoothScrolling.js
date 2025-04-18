// Function to handle smooth scrolling
function scrollToSection(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // Get the height of the sticky navigation
        const navHeight = document.querySelector('.services-nav')?.offsetHeight || 0;

        // Calculate the element's position relative to the document
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

        // Calculate the offset position accounting for the sticky nav
        const offsetPosition = elementPosition - navHeight - 20; // Adding a small buffer

        // Perform the smooth scroll
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Update active state in navigation
        updateActiveNavItem(elementId);

        // Return true to indicate success
        return true;
    }
    // Return false if element not found
    return false;
}

// Function to scroll to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/// Function to update active navigation item (improved version)
function updateActiveNavItem(elementId) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.services-nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Find the corresponding nav item using a data attribute instead of onclick
    const navItems = document.querySelectorAll('.services-nav-item');
    for (let i = 0; i < navItems.length; i++) {
        // Extract the section ID from the onclick function name
        const onclickValue = navItems[i].getAttribute('onclick');
        if (onclickValue && onclickValue.includes(elementId)) {
            navItems[i].classList.add('active');
            break;
        }
    }
}

// Function to update active filter button
function updateActiveFilterButton(category) {
    // Remove active class from all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the clicked filter button
    const clickedButton = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Function to filter case studies
function filterCaseStudies(category) {
    const caseStudies = document.querySelectorAll('.case-study-card');

    if (category === 'all') {
        // Show all case studies
        caseStudies.forEach(study => {
            study.style.display = 'flex';
        });
    } else {
        // Filter case studies based on category
        caseStudies.forEach(study => {
            if (study.dataset.category.includes(category)) {
                study.style.display = 'flex';
            } else {
                study.style.display = 'none';
            }
        });
    }

    // Update active button
    updateActiveFilterButton(category);
}

// Improved setupScrollSpy function with debounce
function setupScrollSpy() {
    const sections = document.querySelectorAll('.service-detail');
    const navItems = document.querySelectorAll('.services-nav-item');
    const navHeight = document.querySelector('.services-nav')?.offsetHeight || 0;

    if (sections.length > 0 && navItems.length > 0) {
        // Create a debounced scroll handler
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            // Clear the timeout if it exists
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Set a timeout to run the scroll spy logic
            scrollTimeout = setTimeout(() => {
                let current = '';
                let closestDistance = Infinity;
                const scrollPosition = window.pageYOffset + navHeight + 100;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    // Find the section closest to the viewport top
                    if (scrollPosition >= sectionTop &&
                        scrollPosition <= sectionTop + sectionHeight) {
                        const distance = Math.abs(scrollPosition - (sectionTop + sectionHeight / 2));
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            current = section.getAttribute('id');
                        }
                    }
                });

                if (current) {
                    updateActiveNavItem(current);
                }
            }, 50); // 50ms debounce
        });
    }
}

// Add this function to your existing smoothScrolling.js file

// Improved fragment handler
function checkForFragmentAndScroll() {
    setTimeout(() => {
        const fragment = window.location.hash.substring(1);
        if (fragment) {
            scrollToSection(fragment);
        }
    }, 500); // Give page time to fully load
}

// IMPORTANT: This is the function name your Blazor code is trying to call
function initScrolling() {
    console.log("initScrolling called - starting setup...");
    setupScrollSpy();
    checkForFragmentAndScroll();
    console.log("initScrolling completed");
    return true;
}

    // Setup scroll spy
    setupScrollSpy();

    // Check for fragment in URL
    checkForFragmentAndScroll();

    return true;
}

// Make the function available globally
window.checkForFragmentAndScroll = checkForFragmentAndScroll;

// Initialize scroll spy when the page loads
document.addEventListener('DOMContentLoaded', setupScrollSpy);

// Make functions available globally
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.updateActiveNavItem = updateActiveNavItem;
window.setupScrollSpy = setupScrollSpy;
window.filterCaseStudies = filterCaseStudies;
window.initScrolling = initScrolling;
window.checkForFragmentAndScroll = checkForFragmentAndScroll;