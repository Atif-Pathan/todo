import { loadHomePage } from './homepage.js';
import { loadMenu } from './menu.js';
import { loadContactPage } from './contact.js';
import { loadReview } from './review.js';
import { loadAbout } from './about.js';
import './styles.css';

const content = document.getElementById('content');
loadHomePage();

const navButtons = document.querySelectorAll('.nav-btn');
const logoBtn = document.querySelector('.logo-btn');

if (logoBtn) {
    logoBtn.addEventListener('click', () => {
        content.textContent = "";
        loadHomePage();
    });
}

// Assuming order of navButtons is:
// 0: logo-btn (Home)
// 1: Menu
// 2: About
// 3: Reviews
// 4: Contact

navButtons[1].addEventListener('click', () => {
    content.textContent = "";
    loadMenu();
});

navButtons[2].addEventListener('click', () => {
    content.textContent = "";
    loadAbout();
});

navButtons[3].addEventListener('click', () => {
    content.textContent = "";
    loadReview();
});

navButtons[4].addEventListener('click', () => {
    content.textContent = "";
    loadContactPage();
});

navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        navButtons.forEach((button) => button.classList.remove('active')); // Remove active from all
        btn.classList.add('active'); // Add active to the clicked tab
    });
});
