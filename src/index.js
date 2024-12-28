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

// Single inset background
const insetBg = document.querySelector('.inset-bg');
const allRadios = document.querySelectorAll('input[type="radio"]');
const taskRadios = document.querySelectorAll('.tasks input[type="radio"]');
const categoryRadios = document.querySelectorAll('.categories input[type="radio"]');

// Function to move the inset shadow
const moveInsetShadow = () => {
  const selectedRadio = Array.from(allRadios).find((radio) => radio.checked);

  if (selectedRadio) {
    const radios = selectedRadio.closest('.tasks')
      ? taskRadios
      : categoryRadios;

    const parentContainer = selectedRadio.closest('.tasks') || selectedRadio.closest('.categories');
    const radioIndex = Array.from(radios).indexOf(selectedRadio);

    // Hardcode starting position for "Upcoming"
    const baseTranslateY = selectedRadio.closest('.tasks') ? 0 : 0; // Starts at 0px
    const translateStep = 100 + 10; // Adjust step based on spacing (100% height + 10px gap)

    const newTranslateY = baseTranslateY + radioIndex * translateStep;

    // Move the inset-bg
    insetBg.style.transform = `translateY(${newTranslateY}%)`;
    insetBg.style.opacity = '1';

    // Append inset-bg to the correct container
    parentContainer.appendChild(insetBg);
  } else {
    // Hide inset-bg if no radio button is selected
    insetBg.style.opacity = '0';
  }
};

// Ensure only one radio button is checked across all groups
allRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    allRadios.forEach((otherRadio) => {
      if (otherRadio !== radio && otherRadio.name !== radio.name) {
        otherRadio.checked = false;
      }
    });
    moveInsetShadow();
  });
});

// Initialize inset shadow on page load
moveInsetShadow();
