import TaskManager from "../modules/TaskManager.js";
import categoryUIManager from "../modules/CategoryUIManager.js";

export function openModal(currentTabId = null) {
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
  priorities.forEach((priority) => {
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

  const newCategoryOption = document.createElement('option');
  newCategoryOption.value = 'create-new';
  newCategoryOption.textContent = 'Create New Category';
  categorySelect.appendChild(newCategoryOption);

  // Input for new category
  const newCategoryInput = document.createElement('input');
  newCategoryInput.type = 'text';
  newCategoryInput.placeholder = 'Enter new category';
  newCategoryInput.classList.add('new-category-input');
  newCategoryInput.style.display = 'none';

  const populateCategories = () => {
    categorySelect.innerHTML = ''; // Clear existing options

    const categories = TaskManager.getAllCategories();
    const defaultCategory = TaskManager.getCategoryByName('General');
    let preselectedCategory = defaultCategory ? defaultCategory.name : null;

    if (categories.length === 0) {
      // No categories available, show only "Create New" option
      const noCategoryOption = document.createElement('option');
      noCategoryOption.value = 'create-new';
      noCategoryOption.textContent = 'Create New Category';
      noCategoryOption.selected = true;
      categorySelect.appendChild(noCategoryOption);
      newCategoryInput.style.display = 'block';
    } else {
      // Populate categories
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        
        if (currentTabId && currentTabId.includes('category-')) {
          if (currentTabId.replace('category-', '') === category.name) {
            option.selected = true; // Preselect the current category tab
            preselectedCategory = category.name;
          }
        } else if (!currentTabId && category.name === 'General') {
          option.selected = true; // Preselect General for task tabs
          preselectedCategory = 'General';
        }
        categorySelect.appendChild(option);
      });

      // Add "Create New Category" option
      const createNewOption = document.createElement('option');
      createNewOption.value = 'create-new';
      createNewOption.textContent = 'Create New Category';
      categorySelect.appendChild(createNewOption);

      // Preselect General if no category matches
      if (!preselectedCategory) {
        categorySelect.value = defaultCategory
          ? defaultCategory.name
          : categories[categories.length - 1].name; // Last updated category
      }
    }
  };

  populateCategories();

  categorySelect.addEventListener('change', () => {
    if (categorySelect.value === 'create-new') {
      newCategoryInput.style.display = 'block';
    } else {
      newCategoryInput.style.display = 'none';
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
      dueDate: dueDateInput.value ? parseDueDate(dueDateInput.value) : null,
      priority: prioritySelect.value,
    };

    if (!todoDetails.title) {
      alert('Title is required.');
      return;
    }

    let selectedCategory = categorySelect.value;
    if (selectedCategory === 'create-new') {
      let newCategoryName = newCategoryInput.value.trim();
      newCategoryName = newCategoryName.charAt(0).toUpperCase() + newCategoryName.slice(1);
      if (!newCategoryName) {
        alert('Category name is required.');
        return;
      }

      try {
        TaskManager.createCategory(newCategoryName);
        categoryUIManager.addCategory(newCategoryName); // Update the UI
        selectedCategory = newCategoryName; // Use the new category
      } catch (error) {
        alert(error.message);
        return;
      }
    }

    try {
      TaskManager.addTodoToCategory(todoDetails, selectedCategory);
      // console.log(`Todo created in category "${selectedCategory}":`, todoDetails);
      closeModal();
      // reloadTabContent(); 
    } catch (error) {
      alert(error.message);
    }
  });

  function parseDueDate(inputValue) {
    // Split the input value (YYYY-MM-DD) into components
    const [year, month, day] = inputValue.split('-').map(Number);
    // Create a new Date object using the components (month is 0-indexed)
    return new Date(year, month - 1, day);
  }

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', closeModal);

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
  modalContent.appendChild(newCategoryInput);
  modalContent.appendChild(buttonContainer);

  modal.appendChild(overlay);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Function to close and remove the modal
function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) modal.remove();

  // Dispatch a custom event to signal that the data has been updated
  const event = new CustomEvent('contentUpdated');
  document.dispatchEvent(event);
}
