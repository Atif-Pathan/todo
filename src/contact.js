import arrowLong from "./images/long-arrow-thin.png";

// contact.js
export function loadContactPage() {
    const content = document.getElementById('content');

    const contactPage = document.createElement('div');
    contactPage.classList.add('contact-page');

    const contactMain = document.createElement('div');
    contactMain.classList.add('contact-main');

    const heading = document.createElement('h3');
    heading.classList.add('contact-heading');
    heading.textContent = 'Subscribe to our Newsletter!';

    const para = document.createElement('p');
    para.classList.add('contact-content');
    para.innerHTML = 'Stay connected with us! Subscribe to our newsletter for exclusive updates, special offers, and the latest flavors. Join the Dreamy Donuts community and get a <span>10% discount coupon</span>!';

    const form = document.createElement('form');
    form.classList.add('contact-form');

    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'ENTER YOUR EMAIL';
    emailInput.required = true;

    formGroup.appendChild(emailInput);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';

    const arrowSpan = document.createElement('span');
    const arrowImg = document.createElement('img');
    arrowImg.src = arrowLong;
    arrowImg.alt = 'subscribe here!';
    arrowImg.title = 'subscribe!'
    arrowSpan.appendChild(arrowImg);

    submitBtn.appendChild(arrowSpan);

    form.appendChild(formGroup);
    form.appendChild(submitBtn);

    contactMain.appendChild(heading);
    contactMain.appendChild(para);
    contactMain.appendChild(form);

    const contactLeft = document.createElement('div');
    contactLeft.classList.add('contact-left');

    const contactDetails = document.createElement('div');
    contactDetails.classList.add('contact-details');

    const contactUsHeading = document.createElement('h2');
    contactUsHeading.id = 'contact-us-heading';
    contactUsHeading.textContent = 'Contact Us';

    const phoneP = document.createElement('p');
    phoneP.innerHTML = '<i class="fa-solid fa-phone fa-contact-icons" style="color: #f53490;"></i><a href="tel:+18003668887">+1-800-DONUTS</a>';

    const emailP = document.createElement('p');
    emailP.innerHTML = '<i class="fa-solid fa-envelope fa-contact-icons" style="color: #f53490;"></i><a href="mailto:support@dreamydonuts.com">support@dreamydonuts.com</a>';

    const locationP = document.createElement('p');
    locationP.innerHTML = '<i class="fa-solid fa-location-dot fa-contact-icons" style="color: #f53490;"></i>123 Donut Lane, Sweet City, USA';

    contactDetails.appendChild(contactUsHeading);
    contactDetails.appendChild(phoneP);
    contactDetails.appendChild(emailP);
    contactDetails.appendChild(locationP);

    const operatingHours = document.createElement('div');
    operatingHours.classList.add('operating-hours');

    const opHoursHeading = document.createElement('h3');
    opHoursHeading.id = 'op-hours-heading';
    opHoursHeading.textContent = 'Operating Hours';

    const hoursList = document.createElement('ul');
    hoursList.innerHTML = `
        <li>Mon–Fri: <strong>8:00 AM to 8:00 PM</strong></li>
        <li>Sat–Sun: <strong>9:00 AM to 10:00 PM</strong></li>
    `;

    operatingHours.appendChild(opHoursHeading);
    operatingHours.appendChild(hoursList);

    const socialMedia = document.createElement('div');
    socialMedia.classList.add('social-media');
    socialMedia.innerHTML = `
        <a href="https://www.facebook.com" target="_blank"><i class="fa-brands fa-facebook"></i></a> /
        <a href="https://www.instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></a> /
        <a href="https://www.twitter.com" target="_blank"><i class="fa-brands fa-x-twitter"></i></a> / 
        <a href="https://github.com/atif-pathan" target="_blank"><i class="fa-brands fa-github"></i></a>
    `;

    contactLeft.appendChild(contactDetails);
    contactLeft.appendChild(operatingHours);
    contactLeft.appendChild(socialMedia);

    contactPage.appendChild(contactMain);
    contactPage.appendChild(contactLeft);

    content.appendChild(contactPage);
}
