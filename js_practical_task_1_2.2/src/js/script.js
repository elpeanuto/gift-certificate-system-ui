let isSearching = false;

// Infinite items (certificates) scroll
function isBottomOfPage() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

function handleInfiniteScroll() {
    if (isBottomOfPage() && !isSearching) {
        const NUM_CERTIFICATES_TO_LOAD = 10;
        const startIndex = document.querySelectorAll('.product-card').length;
        const giftCertificates = JSON.parse(localStorage.getItem('giftCertificates'));
        const remainingCertificates = giftCertificates.length - startIndex;
        const endIndex = startIndex + Math.min(NUM_CERTIFICATES_TO_LOAD, remainingCertificates);

        if (endIndex > startIndex) {
            displayGiftCertificates(startIndex, endIndex);
        }
    }

    saveScrollPosition();
}

const throttledHandleInfiniteScroll = _.throttle(handleInfiniteScroll, 100); 
window.addEventListener('scroll', throttledHandleInfiniteScroll);

// Search by name, description and tags
function performFullSearch(query) {
    isSearching = true;
    const giftCertificates = JSON.parse(localStorage.getItem('giftCertificates'));
    const matchingCertificates = giftCertificates.filter(certificate =>
        certificate.name.toLowerCase().includes(query) ||
        certificate.description.toLowerCase().includes(query) ||
        certificate.tags.some(tag => tag.name.toLowerCase().includes(query))
    );

    displayCertificates(matchingCertificates);
}

function performTagSearch(tagQuery) {
    isSearching = true;
    const giftCertificates = JSON.parse(localStorage.getItem('giftCertificates'));
    const matchingCertificates = giftCertificates.filter(certificate =>
        certificate.tags.some(tag => tag.name.toLowerCase().includes(tagQuery))
    );

    displayCertificates(matchingCertificates);
}

function displayCertificates(certificates) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = '';

    certificates.forEach((certificate, index) => {
        const productCardHTML = productCardTemplate({
            imageSrc: certificate.img,
            name: certificate.name,
            tags: certificate.tags,
            price: certificate.price.toFixed(2),
            productId: index + 1,
        });

        productContainer.insertAdjacentHTML('beforeend', productCardHTML);
    });

    saveScrollPosition();
}

// Scroll back to top button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.classList.add('scroll-to-top-btn');
scrollToTopBtn.innerHTML = '&uarr;';
scrollToTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopBtn);

const SCROLL_THRESHOLD = 200;
function toggleScrollToTopButton() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

    if (window.scrollY > SCROLL_THRESHOLD) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

const throttledToggleScrollToTopButton = _.throttle(toggleScrollToTopButton, 300); 
window.addEventListener('scroll', throttledToggleScrollToTopButton);

// Feature to return to the last scroll position on the page
function scrollToLastPosition() {
    const lastPosition = localStorage.getItem('scrollPosition');
    if (lastPosition) {
        window.scrollTo({
            top: parseInt(lastPosition),
            behavior: 'smooth'
        });
    }
}

function saveScrollPosition() {
    localStorage.setItem('scrollPosition', window.scrollY);
}

window.addEventListener('load', scrollToLastPosition);

const throttledSaveScrollPosition = _.throttle(saveScrollPosition, 300); 
window.addEventListener('scroll', throttledSaveScrollPosition);
