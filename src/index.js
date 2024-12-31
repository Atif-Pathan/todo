import './styles.css';
import TabManager from './modules/TabManager.js';
import TaskManager from './modules/TaskManager.js';
import categoryUIManager from './modules/CategoryUIManager.js';

// Initialize TabManager for managing tab switching
const tabManager = new TabManager('.content-view');

// Collapse/Expand Navigation Logic
const collapseBtn = document.querySelector('.collapse-btn');
const nav = document.querySelector('.nav');
const caretIcon = collapseBtn.querySelector('.fa-caret-up');

const addCatDiv = document.querySelector('.add-category-input');
const addCategoryButton = document.querySelector('.add-category-btn');
const NewCatInput = document.getElementById('add-new-category');
const submitNewCatButton = document.querySelector('.add-cat');

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
const START_POSITION = 7; // Starting position in rem for tasks
const SHIFT_AMOUNT = 3; // The amount to shift per radio button in rem
let CATEGORY_OFFSET = 4; // Additional rem offset for categories section

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

    // Render the appropriate tab content
    tabManager.renderTabContent(radio.id);
  }
});

// Function to show the input div
function showAddCategoryInput() {
  addCatDiv.style.display = 'flex'; // Ensure it's visible before animation
  requestAnimationFrame(() => {
    addCatDiv.classList.add('open');
  });
}

// Function to hide the input div
function hideAddCategoryInput() {
  addCatDiv.classList.remove('open');
  addCatDiv.addEventListener('transitionend', function onTransitionEnd() {
    if (!addCatDiv.classList.contains('open')) {
      addCatDiv.style.display = 'none'; // Hide it after the animation completes
    }
    addCatDiv.removeEventListener('transitionend', onTransitionEnd);
  });
}

addCategoryButton.addEventListener('click', () => {
  console.log("Button clicked, calling createNewCategoryInput");
  const checkedCategoryRadio = document.querySelector('.categories input[type="radio"]:checked');
  if (addCatDiv.classList.contains('open')) {
    if (checkedCategoryRadio) {
      const currentTop = parseFloat(insetBg.style.top); // Get current `top` in rem
      const newTop = currentTop - 3; // subract 3 rem
      insetBg.style.top = `${newTop}rem`; // Set new `top` in rem
    }
    hideAddCategoryInput();
  } else {
    if (checkedCategoryRadio) {
      const currentTop = parseFloat(insetBg.style.top); // Get current `top` in rem
      const newTop = currentTop + 3; // Add 3 rem
      insetBg.style.top = `${newTop}rem`; // Set new `top` in rem
    }
    showAddCategoryInput();
  }
});

document.addEventListener('click', (event) => {
  // Check if the click is outside the `add-category-input` and not on the button
  if (
    !addCatDiv.contains(event.target) &&
    !addCategoryButton.contains(event.target) &&
    addCatDiv.classList.contains('open')
  ) {
    const checkedCategoryRadio = document.querySelector('.categories input[type="radio"]:checked');
    if (checkedCategoryRadio) {
      const currentTop = parseFloat(insetBg.style.top); // Get current `top` in rem
      const newTop = currentTop - 3; // subract 3 rem
      insetBg.style.top = `${newTop}rem`; // Set new `top` in rem
    }
    hideAddCategoryInput();
  }
});

function submitCategory() {
  if (NewCatInput.value.trim() !== '') {
    // create a new category
    try {
      const newCatName = NewCatInput.value.charAt(0).toUpperCase() + NewCatInput.value.slice(1);
      TaskManager.createCategory(newCatName);
      categoryUIManager.addCategory(newCatName); // Update the UI

      // Select the newly added category radio button
      const newCategoryId = `category-${newCatName}`;
      const newCategoryRadio = document.getElementById(newCategoryId);
      if (newCategoryRadio) {
        newCategoryRadio.checked = true;

        // Optionally, dispatch a 'change' event to trigger any associated listeners
        const event = new Event('change', { bubbles: true });
        newCategoryRadio.dispatchEvent(event);
      }
    } catch (error) {
      alert(error.message);
      return;
    }
    NewCatInput.value = '';
    hideAddCategoryInput();
  }
}

// submit input if you press check mark or Enter key
submitNewCatButton.addEventListener('click', submitCategory);
NewCatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitCategory();
  }
});