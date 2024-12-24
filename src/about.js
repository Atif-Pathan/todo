import middleDonut from "./images/about-us-donut.png"

export function loadAbout() {
    // Select the #content container
    const content = document.getElementById('content');

    // Clear existing content
    content.textContent = '';

    // Create the about-wrapper div
    const aboutWrapper = document.createElement('div');
    aboutWrapper.classList.add('about-wrapper');

    // Create and append the center image container
    const centerImageContainer = document.createElement('div');
    centerImageContainer.classList.add('center-image-container');

    const centerImage = document.createElement('img');
    centerImage.src = middleDonut;
    centerImage.alt = 'Donut';
    centerImage.classList.add('center-donut');

    centerImageContainer.appendChild(centerImage);
    aboutWrapper.appendChild(centerImageContainer);

    // Create and append the left text
    const leftText = document.createElement('div');
    leftText.classList.add('left-text');
    leftText.innerHTML = `
        Welcome to <strong>Dreamy Donuts</strong>, where each creation is a sweet escape. 
        Every donut blends delicate flavors with soft textures to create moments worth savoring. 
        Using the finest ingredients, we craft every bite to touch you with magic.
    `;
    aboutWrapper.appendChild(leftText);

    // Create and append the right text
    const rightText = document.createElement('div');
    rightText.classList.add('right-text');
    rightText.innerHTML = `
        Step into a world where the comforting aroma of freshly baked donuts fills the air. 
        Each flavor is crafted with creativity, passion, and joy to brighten your day. 
        Savor every bite and let it inspire you to <strong>DREAM</strong> with every delicious moment.
    `;
    aboutWrapper.appendChild(rightText);

    // Append the about-wrapper to #content
    content.appendChild(aboutWrapper);
}
