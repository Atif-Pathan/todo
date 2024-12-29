import './styles.css';
import { openModal } from '../src/components/modal';

// Add a button to trigger the modal
const contentDiv = document.querySelector('.content-view');
const addTodoButton = document.createElement('button');
addTodoButton.textContent = 'Add Todo';
addTodoButton.classList.add('add-todo-btn');
addTodoButton.addEventListener('click', openModal);

// Append the button to the content div
contentDiv.appendChild(addTodoButton);

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

// Global variables for the inset background
const insetBg = document.querySelector('.inset-bg'); // The global inset background
const START_POSITION = 7.5; // Starting position in rem for tasks
const SHIFT_AMOUNT = 3; // The amount to shift per radio button in rem
const CATEGORY_OFFSET = 4; // Additional rem offset for categories section

// Event delegation for radio buttons in the nav
nav.addEventListener('change', (event) => {
  const radio = event.target;

  // Check if the event target is a radio button
  if (radio.tagName === 'INPUT' && radio.type === 'radio') {
    // Enforce "only one checked" rule across groups
    const allRadios = document.querySelectorAll('.tasks input[type="radio"], .categories input[type="radio"]');
    allRadios.forEach((otherRadio) => {
      if (otherRadio !== radio && otherRadio.name !== radio.name) {
        otherRadio.checked = false;
      }
    });

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
  }
});
