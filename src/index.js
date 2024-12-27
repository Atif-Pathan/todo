import './styles.css'

const collapseBtn = document.querySelector('.collapse-btn');
const nav = document.querySelector('.nav');
const caretIcon = collapseBtn.querySelector('.fa-caret-up');

// collapse and expand the nav menu
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

// Select all task-row labels and dynamic content container
const taskRows = document.querySelectorAll('.task-row');
const dynamicContent = document.getElementById('dynamic-content');

// Add click event listeners for each tab
taskRows.forEach((row) => {
  row.addEventListener('click', () => {
    const tabId = row.htmlFor;

    // Update the dynamic content based on the selected tab
    if (tabId === 'upcoming') {
      dynamicContent.textContent = 'Upcoming tasks will appear here...';
    } else if (tabId === 'today') {
      dynamicContent.textContent = "Today's tasks will appear here...";
    } else if (tabId === 'all-tasks') {
      dynamicContent.textContent = 'All tasks will appear here...';
    }
  });
});


