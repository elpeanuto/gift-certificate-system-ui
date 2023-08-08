const apiUrl = `https://api.unsplash.com/photos/random?count=30&client_id=VS8sF8ILVH7cqR5MqNb7LiJO8Iq7M3Y3m4TuvHVC-Hw`;
const tagNames = ["Shopping", "Food", "Travel", "Experience", "Entertainment"];

const productCardTemplateSource = document.getElementById('product-card-template').innerHTML;
const productCardTemplate = Handlebars.compile(productCardTemplateSource);

async function fetchImages(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.map(x => x.urls.regular);
}

function generateTagsWithImages(tagNames, imageLinks) {
    const tags = [];

    tagNames.forEach((tagName, i) => {
        const tag = {
            name: tagName,
            image: imageLinks[i]
        };
        tags.push(tag);
    });

    localStorage.setItem('tags', JSON.stringify(tags));
}

function displayTags(tags) {
    const tagsList = document.querySelector('.tags-list');

    tags.forEach((tag) => {
        const tagItem = document.createElement('li');
        tagItem.classList.add('tags-item');
        const tagImage = document.createElement('img');
        tagImage.classList.add('tags-image');
        tagImage.src = tag.image;
        const tagNameElement = document.createElement('span');
        tagNameElement.classList.add('tags-name');
        tagNameElement.textContent = tag.name;

        tagItem.addEventListener('click', () => {
            const formattedTagName = tag.name.toLowerCase();
            performTagSearch(formattedTagName);
        });

        tagItem.appendChild(tagImage);
        tagItem.appendChild(tagNameElement);
        tagsList.appendChild(tagItem);
    });
}


async function generateAndDisplayTags(tagNames, apiUrl) {
    const tagsFromLocalStorage = JSON.parse(localStorage.getItem('tags'));

    if (tagsFromLocalStorage) {
        displayTags(tagsFromLocalStorage);
    } else {
        const imageLinks = await fetchImages(apiUrl);
        generateTagsWithImages(tagNames, imageLinks);
        displayTags(tagNames, imageLinks);
        location.reload();
    }
}

async function generateRandomGiftCertificates(numOfCertificates) {
    try {
        const currentDate = new Date();
        const imageLinks = await fetchImages(apiUrl);
        const giftCertificates = [];

        const tagNames = ["Shopping", "Food", "Travel", "Experience", "Entertainment"];

        let j = 0;

        for (let i = 0; i < numOfCertificates; i++) {
            const numTags = Math.floor(Math.random() * 3) + 1;
            const tags = [];

            for (let k = 0; k < numTags; k++) {
                const tagName = tagNames[Math.floor(Math.random() * tagNames.length)];
                tags.push({ "name": tagName });
            }

            const giftCertificate = {
                "name": `Gift Certificate ${i + 1}`,
                "description": "Gift Certificate Description",
                "price": Math.random() * 100 + 50,
                "duration": Math.floor(Math.random() * 90) + 30,
                "tags": tags,
                "img": imageLinks[j],
                "createDate": new Date(currentDate.getTime() - Math.random() * 10000000000),
                "lastUpdateDate": currentDate
            };

            j++;

            if (j >= 30) {
                j = 0;
            }

            giftCertificates.push(giftCertificate);
        }

        return giftCertificates;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

async function reGenerate(numOfCertificates) {
    if (!JSON.parse(localStorage.getItem('giftCertificates'))) {
        await generateGiftCertificates(numOfCertificates);

        location.reload();
    }
}

async function generateGiftCertificates(numOfCertificates) {
    try {
        let allCertificates = await generateRandomGiftCertificates(numOfCertificates);

        allCertificates.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());

        localStorage.setItem('giftCertificates', JSON.stringify(allCertificates));
    } catch (error) {
        console.error('Error generating gift certificates:', error);
    }
}

function displayGiftCertificates(startIndex, endIndex) {
    const productContainer = document.querySelector('.product-container');
    const giftCertificates = JSON.parse(localStorage.getItem('giftCertificates'));
    const numOfCertificate = giftCertificates.length;

    endIndex = numOfCertificate < endIndex ? numOfCertificate : endIndex;

    for (let i = startIndex; i < endIndex; i++) {
        const certificate = giftCertificates[i];
        const productCardHTML = productCardTemplate({
            imageSrc: certificate.img,
            name: certificate.name,
            tags: certificate.tags,
            price: certificate.price.toFixed(2),
            productId: i + 1,
        });

        productContainer.insertAdjacentHTML('beforeend', productCardHTML);
    }

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((productCard) => {
        productCard.addEventListener('click', function () {
            window.location.href = `product-view.html`;
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let numInitialCertificates = 10;
    const scrollPosition = localStorage.getItem('scrollPosition')

    if (scrollPosition > 2 * 400) {
        numInitialCertificates = Math.floor(scrollPosition / 400) * 5;
    }

    displayGiftCertificates(0, numInitialCertificates);

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    const debouncedSearch = _.debounce(function () {
        const query = searchInput.value.trim().toLowerCase();
        performFullSearch(query);
    }, 500);

    searchInput.addEventListener('input', debouncedSearch);

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim().toLowerCase();
        performFullSearch(query);
    });
});

function addNewGiftCertificate() {
    const giftCertificates = JSON.parse(localStorage.getItem('giftCertificates'));

    const newCertificate = {
        "name": "New Gift Certificate",
        "description": "New Gift Certificate Description",
        "price": Math.random() * 100 + 50,
        "duration": Math.floor(Math.random() * 90) + 30,
        "tags": [
            { "name": "Travel" }
        ],
        "img": "img/test.jpg",
        "createDate": new Date(),
        "lastUpdateDate": new Date()
    };

    giftCertificates.unshift(newCertificate);
    localStorage.setItem('giftCertificates', JSON.stringify(giftCertificates));
    location.reload();
}

generateAndDisplayTags(tagNames, apiUrl);
reGenerate(100);
