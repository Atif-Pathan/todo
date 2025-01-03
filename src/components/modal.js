import TaskManager from "../modules/TaskManager.js";

/**
 * Opens the modal to create a new Todo, pre-selecting category based on `currentTabId`.
 * @param {string|null} currentTabId - The ID of the current tab (e.g. "category-Work", "today", etc.).
 */
export function openModal(currentTabId = null) {
  if (document.querySelector(".modal")) return; // Avoid multiple modals

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  overlay.addEventListener("click", closeModal);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Title input
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title (required):";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.required = true;

  // Description input
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  const descriptionInput = document.createElement("textarea");

  // Due date input
  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date:";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";

  // Priority input
  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority:";
  const prioritySelect = document.createElement("select");
  const priorities = ["Low", "Medium", "High"];
  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority.toLowerCase();
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });

  // Category dropdown
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category:";
  const categorySelect = document.createElement("select");
  categorySelect.id = "category-select";

  // "Create New Category" hidden input
  const newCategoryInput = document.createElement("input");
  newCategoryInput.type = "text";
  newCategoryInput.placeholder = "Enter new category";
  newCategoryInput.classList.add("new-category-input");
  newCategoryInput.style.display = "none";

  // 1) Populate the Category <select> with existing categories
  function populateCategories() {
    categorySelect.innerHTML = "";

    const categories = TaskManager.getAllCategories();
    if (categories.length === 0) {
      // If no categories exist, user must either create a new category
      const noCatOption = document.createElement("option");
      noCatOption.value = "";
      noCatOption.textContent = "No categories available";
      noCatOption.disabled = true;
      noCatOption.selected = true;
      categorySelect.appendChild(noCatOption);
    } else {
      // Add each category as an <option>
      categories.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.name; // e.g. "General", "Work"
        option.textContent = cat.name;
        categorySelect.appendChild(option);
      });
    }

    // Finally, add "Create New Category" option
    const createOption = document.createElement("option");
    createOption.value = "create-new";
    createOption.textContent = "Create New Category";
    categorySelect.appendChild(createOption);

    // 2) Decide which category should be pre-selected:
    let preselectName = null;

    // If the current tab is a category tab, e.g. "category-Work"
    if (currentTabId && currentTabId.startsWith("category-")) {
      const categoryName = currentTabId.replace("category-", "");
      // If it exists in TaskManager, default to that
      const foundCat = TaskManager.getCategoryByName(categoryName);
      if (foundCat) {
        preselectName = foundCat.name;
      }
    }

    // Otherwise, if no specific category found, default to "General" if it exists
    if (!preselectName) {
      // See if "General" is in the list
      const generalCat = TaskManager.getCategoryByName("General");
      if (generalCat) {
        preselectName = "General";
      } else if (categories.length > 0) {
        // fallback: pick the first existing category
        preselectName = categories[0].name;
      }
    }

    // Set the <select> to preselectName if found
    if (preselectName) {
      categorySelect.value = preselectName;
    }
  }

  populateCategories();

  // 3) Toggle the newCategoryInput based on selection
  categorySelect.addEventListener("change", () => {
    if (categorySelect.value === "create-new") {
      newCategoryInput.style.display = "block";
    } else {
      newCategoryInput.style.display = "none";
    }
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("modal-buttons");

  const createButton = document.createElement("button");
  createButton.textContent = "Create";
  createButton.addEventListener("click", handleCreateTodo);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", closeModal);

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

  // 4) The "Create" button logic
  function handleCreateTodo() {
    const todoDetails = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      dueDate: dueDateInput.value ? parseDueDate(dueDateInput.value) : null,
      priority: prioritySelect.value,
    };

    if (!todoDetails.title) {
      alert("Title is required.");
      return;
    }

    let chosenCategory = categorySelect.value; // e.g. "General" or "Work" or "create-new"
    if (chosenCategory === "create-new") {
      const newCatName = newCategoryInput.value.trim();
      if (!newCatName) {
        alert("Category name is required.");
        return;
      }
      const formatted = newCatName.charAt(0).toUpperCase() + newCatName.slice(1);
      try {
        TaskManager.createCategory(formatted);
        chosenCategory = formatted;
      } catch (error) {
        alert(error.message);
        return;
      }
    }

    try {
      TaskManager.addTodoToCategory(todoDetails, chosenCategory);
      closeModal();

      // 5) Switch the nav to that category's tab
      const radioId = `category-${chosenCategory}`;
      const newRadio = document.getElementById(radioId);
      if (newRadio) {
        newRadio.checked = true;
        // Dispatch a change event to force re-render of that category tab
        const event = new Event("change", { bubbles: true });
        newRadio.dispatchEvent(event);
      } else {
        // If there's no matching radio, e.g. user doesn't have that category in nav
        // do nothing or you can console.warn
        console.warn(`No radio found for category '${chosenCategory}'`);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  function parseDueDate(inputValue) {
    const [year, month, day] = inputValue.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
}
