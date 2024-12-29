class CategoryUIManager {
  constructor(categoriesContainerSelector) {
    this.categoriesContainer = document.querySelector(categoriesContainerSelector);

    if (!this.categoriesContainer) {
      throw new Error('Categories container not found!');
    }
  }

  /**
   * Adds a new category to the UI
   * @param {string} categoryName - The name of the new category
   */
  addCategory(categoryName) {
    if (!categoryName) {
      throw new Error('Category name is required to add it to the UI.');
    }

    // Create a new radio input for the category
    const input = document.createElement('input');
    input.type = 'radio';
    input.classList.add('user-category');
    input.id = `category-${categoryName.toLowerCase()}`;
    input.name = 'vertical-categories';
    input.hidden = true;

    // Create a label for the category
    const label = document.createElement('label');
    label.setAttribute('for', input.id);
    label.classList.add('categories__tab');
    label.innerHTML = `
      <i class="fa-solid fa-folder fa-sm"></i>
      ${categoryName}
    `;

    // Append the input and label to the container
    this.categoriesContainer.appendChild(input);
    this.categoriesContainer.appendChild(label);
  }

  /**
   * Removes a category from the UI
   * @param {string} categoryName - The name of the category to remove
   */
  removeCategory(categoryName) {
    if (!categoryName) {
      throw new Error('Category name is required to remove it from the UI.');
    }

    // Find and remove the input and label for the category
    const input = this.categoriesContainer.querySelector(
      `#category-${categoryName.toLowerCase()}`
    );
    const label = this.categoriesContainer.querySelector(
      `label[for="category-${categoryName.toLowerCase()}"]`
    );

    if (input) input.remove();
    if (label) label.remove();
  }
}

export default CategoryUIManager;
