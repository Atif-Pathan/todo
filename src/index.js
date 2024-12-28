import './styles.css';

const collapseBtn = document.querySelector('.collapse-btn');
const nav = document.querySelector('.nav');
const caretIcon = collapseBtn.querySelector('.fa-caret-up');

// Collapse and expand the nav menu
collapseBtn.addEventListener('click', () => {
  nav.classList.toggle('collapsed');
  if (nav.classList.contains('collapsed')) {
    caretIcon.classList.remove('fa-rotate-270');
    caretIcon.classList.add('fa-rotate-90');
  } else {
    caretIcon.classList.remove('fa-rotate-90');
    caretIcon.classList.add('fa-rotate-270');
  }
});

// Select all radio buttons
const allRadios = document.querySelectorAll('.tasks input[type="radio"], .categories input[type="radio"]');

// Add event listeners to enforce "only one checked" rule
allRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    // Loop through all radios and uncheck those not part of the current group
    allRadios.forEach((otherRadio) => {
      if (otherRadio !== radio && otherRadio.name !== radio.name) {
        otherRadio.checked = false;
      }
    });
  });
});

// Select all radio buttons in both tasks and categories sections
const insetBg = document.querySelector('.inset-bg'); // The global inset background
const START_POSITION = 7.5; // Starting position in rem for tasks
const SHIFT_AMOUNT = 3; // The amount to shift per radio button in rem
const CATEGORY_OFFSET = 4; // Additional rem offset for categories section
let currentPosition = START_POSITION;

// Add event listener to each radio button
allRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      // Check if the clicked radio is in tasks or categories
      const isTaskRadio = radio.closest('.tasks') !== null;

      // Find all radio buttons in their respective sections
      const taskRadios = document.querySelectorAll('.tasks input[type="radio"]');
      const categoryRadios = document.querySelectorAll('.categories input[type="radio"]');

      // Calculate the index
      const index = isTaskRadio
        ? Array.from(taskRadios).indexOf(radio) // Index within tasks
        : Array.from(categoryRadios).indexOf(radio) + taskRadios.length; // Index within categories + task count

      // Apply the CATEGORY_OFFSET if the radio is in categories
      const offset = isTaskRadio ? 0 : CATEGORY_OFFSET;

      // Calculate the new position
      const newPosition = START_POSITION + index * SHIFT_AMOUNT + offset;

      // Update the inset background position
      insetBg.style.top = `${newPosition}rem`;

      // Update the current position
      currentPosition = newPosition;
    }
  });
});


