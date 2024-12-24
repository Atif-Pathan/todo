import oreo from "./images/oreo.png";
import caramel from "./images/creme-brulee.png";
import vanilla from "./images/donut-vanilla.png";
import coconut from "./images/coconut.png";

export function loadReview() {
    const content = document.getElementById('content');
    content.textContent = ""; // Clear existing content

    const reviewsPage = document.createElement('div');
    reviewsPage.classList.add('reviews-page');

    // Reviews Title
    const reviewsTitle = document.createElement('div');
    reviewsTitle.classList.add('reviews-title');
    const h1 = document.createElement('h1');
    h1.textContent = 'HEAR WHAT OUR DREAMERS HAVE TO SAY';
    const p = document.createElement('p');
    p.innerHTML = 'Follow our Instagram to see more: <span>@dreamydonuts</span>';
    reviewsTitle.appendChild(h1);
    // reviewsTitle.appendChild(p);

    // Reviews Container
    const reviewsContainer = document.createElement('div');
    reviewsContainer.classList.add('reviews-container');

    const reviews = [
        { name: 'Olivia Harper', review: 'The Coconut Bliss was sweet and fresh—perfect for any tropical cravings!' },
        { name: 'Max Dawson', review: 'Dreamy Donuts are my weekend must-have. They always impress with taste and variety!' },
        { name: 'Sophia Clarke', review: 'Caramel Delight is heavenly. A perfect treat for anyone who loves a sweet indulgence!' },
        { name: 'Lucas Bennett', review: 'Every donut is a masterpiece—creative, flavorful, and always beautifully presented.' }
    ];    

    reviews.forEach(({ name, review }) => {
        const reviewBox = document.createElement('div');
        reviewBox.classList.add('review-box');

        const h3 = document.createElement('h3');
        h3.textContent = name;

        const p = document.createElement('p');
        p.innerHTML = review;

        reviewBox.appendChild(h3);
        reviewBox.appendChild(p);
        reviewsContainer.appendChild(reviewBox);
    });

    // Most Loved Section
    const mostLovedSection = document.createElement('div');
    mostLovedSection.classList.add('most-loved-section');

    const topPicksTitle = document.createElement('h2');
    topPicksTitle.classList.add('top-picks-title');
    topPicksTitle.innerHTML = '<i class="fa-solid fa-angles-down"></i> This Week\'s Top Picks <i class="fa-solid fa-angles-down"></i>';
    mostLovedSection.appendChild(topPicksTitle);

    const mostLovedContainer = document.createElement('div');
    mostLovedContainer.classList.add('most-loved-container');

    const donuts = [
        {
            imgSrc: oreo,
            alt: 'Oreo Indulgence Donut',
            name: 'Oreo Indulgence',
            tags: ['#Crunchy', '#Chocolatey', '#SpecialOreoSauce']
        },
        {
            imgSrc: caramel,
            alt: 'Caramel Delight Donut',
            name: 'Caramel Delight',
            tags: ['#CustardFilled', '#SilkySmooth', '#RichTexture', '#Decadent']
        },
        {
            imgSrc: vanilla,
            alt: 'Golden Vanilla Donut',
            name: 'Golden Vanilla',
            tags: ['#Classic', '#SoftTexture', '#TimelessFlavor', '#VanillaGlaze']
        },
        {
            imgSrc: coconut,
            alt: 'Coconut Bliss Donut',
            name: 'Coconut Bliss',
            tags: ['#Tropical', '#FluffyTexture', '#CoconutShavings', '#Elegant']
        }
    ];

    donuts.forEach(({ imgSrc, alt, name, tags }) => {
        const donutItem = document.createElement('div');
        donutItem.classList.add('donut-item');

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = alt;

        const h3 = document.createElement('h3');
        h3.textContent = name;

        const donutTags = document.createElement('div');
        donutTags.classList.add('donut-tags');

        tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            donutTags.appendChild(span);
        });

        donutItem.appendChild(img);
        donutItem.appendChild(h3);
        donutItem.appendChild(donutTags);
        mostLovedContainer.appendChild(donutItem);
    });

    mostLovedSection.appendChild(mostLovedContainer);

    // Append everything to the reviews page
    reviewsPage.appendChild(reviewsTitle);
    reviewsPage.appendChild(reviewsContainer);
    reviewsPage.appendChild(mostLovedSection);

    // Append the reviews page to the content div
    content.appendChild(reviewsPage);
}
