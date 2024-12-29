import TaskManager from "../modules/TaskManager.js";
import CategoryUIManager from "../modules/CategoryUIManager.js";

// Initialize CategoryUIManager
const categoryUIManager = new CategoryUIManager('.categories .segmented-control');

// Function to open the modal
export function openModal() {
  if (document.querySelector('.modal')) return; // Avoid multiple modals

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  overlay.addEventListener('click', closeModal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  // Title input
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title (required):';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.required = true;

  // Description input
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description:';
  const descriptionInput = document.createElement('textarea');

  // Due date input
  const dueDateLabel = document.createElement('label');
  dueDateLabel.textContent = 'Due Date:';
  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';

  // Priority input
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority:';
  const prioritySelect = document.createElement('select');
  const priorities = ['Low', 'Medium', 'High'];
  priorities.forEach(priority => {
    const option = document.createElement('option');
    option.value = priority.toLowerCase();
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });

  // Category dropdown
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Category:';
  const categorySelect = document.createElement('select');
  categorySelect.id = 'category-select';

  // Populate dropdown with categories
  const populateCategories = () => {
    categorySelect.innerHTML = '';
    const categories = TaskManager.getAllCategories();
    if (categories.length === 0) {
      const noCategoryOption = document.createElement('option');
      noCategoryOption.value = '';
      noCategoryOption.textContent = 'No categories available';
      noCategoryOption.disabled = true;
      noCategoryOption.selected = true;
      categorySelect.appendChild(noCategoryOption);
    } else {
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    }
  };
  populateCategories();

  // Add New Category Button
  const addCategoryButton = document.createElement('button');
  addCategoryButton.textContent = 'Add New Category';
  addCategoryButton.classList.add('add-category-btn');
  addCategoryButton.type = 'button';

  // Input for new category
  const newCategoryInput = document.createElement('input');
  newCategoryInput.type = 'text';
  newCategoryInput.placeholder = 'Enter new category';
  newCategoryInput.classList.add('new-category-input');
  newCategoryInput.style.display = 'none';

  // Save new category
  const saveCategoryButton = document.createElement('button');
  saveCategoryButton.textContent = 'Save';
  saveCategoryButton.classList.add('save-category-btn');
  saveCategoryButton.type = 'button';
  saveCategoryButton.style.display = 'none';

  addCategoryButton.addEventListener('click', () => {
    newCategoryInput.style.display = 'block';
    saveCategoryButton.style.display = 'block';
  });

  saveCategoryButton.addEventListener('click', () => {
    const newCategory = newCategoryInput.value.trim();
    if (newCategory) {
      try {
        // Add the category to TaskManager
        TaskManager.createCategory(newCategory);

        // Update the dropdown
        populateCategories();

        // Update the UI with the new category
        categoryUIManager.addCategory(newCategory);

        // Automatically select the new category
        categorySelect.value = newCategory;

        // Reset the input fields
        newCategoryInput.value = '';
        newCategoryInput.style.display = 'none';
        saveCategoryButton.style.display = 'none';
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Category name cannot be empty.');
    }
  });

  // Buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('modal-buttons');

  const createButton = document.createElement('button');
  createButton.textContent = 'Create';
  createButton.addEventListener('click', () => {
    const todoDetails = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      dueDate: dueDateInput.value ? new Date(dueDateInput.value) : null,
      priority: prioritySelect.value,
    };

    // Validate title
    if (!todoDetails.title) {
      alert('Title is required.');
      return;
    }

    const categoryName = categorySelect.value || TaskManager.defaultCategoryName;

    try {
      TaskManager.addTodoToCategory(todoDetails, categoryName);
      console.log(`Todo created in category "${categoryName}":`, todoDetails);
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', closeModal);

  // Append everything to modal content
  buttonContainer.appendChild(createButton);
  buttonContainer.appendChild(cancelButton);

  modalContent.appendChild(titleLabel);
  modalContent.appendChild(titleInput);
  modalContent.appendChild(descriptionLabel);
  modalContent.appendChild(descriptionInput);
  modalContent.appendChild(dueDateLabel);
  modalContent.appendChild(dueDateInput);
  modalContent.appendChild(priorityLabel);
  modalContent.appendChild(prioritySelect);
  modalContent.appendChild(categoryLabel);
  modalContent.appendChild(categorySelect);
  modalContent.appendChild(addCategoryButton);
  modalContent.appendChild(newCategoryInput);
  modalContent.appendChild(saveCategoryButton);
  modalContent.appendChild(buttonContainer);

  modal.appendChild(overlay);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Function to close and remove the modal
function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) modal.remove();
}
