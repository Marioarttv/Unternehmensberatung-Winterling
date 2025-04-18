// Function to initialize FAQ filtering
function initializeFaqFiltering() {
    // Initially filter by 'all' category
    filterFaqsByCategory('all');

    // Add event listener for search input
    const searchInput = document.getElementById('faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterFaqsByQuery(this.value);
        });
    }
}

// Function to filter FAQs by category
function filterFaqsByCategory(category) {
    // Update active state on category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        if (button.textContent.toLowerCase().includes(category) ||
            (category === 'all' && button.textContent.toLowerCase().includes('alle'))) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');

    // Filter items based on category
    faqItems.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            const itemCategories = item.dataset.categories || '';
            if (itemCategories.includes(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });

    // Show/hide category sections based on matching items
    const faqCategories = document.querySelectorAll('.faq-category');
    faqCategories.forEach(faqCategory => {
        const categoryId = faqCategory.id;
        const hasVisibleItems = Array.from(
            faqCategory.querySelectorAll('.faq-item')
        ).some(item => item.style.display !== 'none');

        faqCategory.style.display = hasVisibleItems ? 'block' : 'none';
    });
}

// Function to filter FAQs by search query
function filterFaqsByQuery(query) {
    query = query.toLowerCase().trim();

    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');

    // Filter items based on query
    faqItems.forEach(item => {
        const questionText = item.querySelector('h3').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

        if (query === '' || questionText.includes(query) || answerText.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Show/hide category sections based on matching items
    const faqCategories = document.querySelectorAll('.faq-category');
    faqCategories.forEach(faqCategory => {
        const categoryId = faqCategory.id;
        const hasVisibleItems = Array.from(
            faqCategory.querySelectorAll('.faq-item')
        ).some(item => item.style.display !== 'none');

        faqCategory.style.display = hasVisibleItems ? 'block' : 'none';
    });

    // Show message if no results found
    const noResultsMessage = document.querySelector('.no-results-message');
    const hasVisibleItems = Array.from(faqItems).some(item => item.style.display !== 'none');

    if (noResultsMessage) {
        noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
    }
}

// Make functions available globally
window.initializeFaqFiltering = initializeFaqFiltering;
window.filterFaqsByCategory = filterFaqsByCategory;
window.filterFaqsByQuery = filterFaqsByQuery;