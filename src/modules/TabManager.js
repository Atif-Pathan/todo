import TaskManager from './TaskManager.js';
import TodoRenderer from './TodoRenderer.js';
import { isSameDay, isAfter, startOfToday, parseISO } from 'date-fns';

class TabManager {
  constructor(contentViewSelector) {
    this.contentView = document.querySelector(contentViewSelector);
    if (!this.contentView) {
      throw new Error('Content view container not found!');
    }

    this.taskManager = TaskManager; // Reference to TaskManager for fetching todos
    this.currentTabId = 'all-tasks'; // Default tab to render
    this.renderTabContent(this.currentTabId); // Render the default tab on initialization

    // Listen for the custom event and re-render the current tab
    document.addEventListener('contentUpdated', () => {
      this.renderTabContent(this.currentTabId);
    });
  }

  /**
   * Render content for the selected tab.
   * @param {string} tabId - ID of the selected tab.
   */
  renderTabContent(tabId) {
    this.currentTabId = tabId;
    this.contentView.innerHTML = ''; // Clear existing content
  
    // Create a header container
    const header = document.createElement('div');
    header.classList.add('content-header');
  
    // Add a title for the current tab
    const title = document.createElement('h2');
    title.textContent = `${this.getTabTitle(tabId)}`;
    title.classList.add('page-title');
    header.appendChild(title);
  
    // Add a button to open the modal for creating a new todo
    const addTodoButton = document.createElement('button');
    addTodoButton.innerHTML = `<i class="fa-solid fa-plus fa-sm"></i>Add Todo`;
    addTodoButton.classList.add('add-todo-btn');
    addTodoButton.addEventListener('click', () => {
      import('../components/modal.js').then(({ openModal }) => openModal(tabId));
    });
    header.appendChild(addTodoButton);
  
    // Append the header to the content view
    this.contentView.appendChild(header);
  
    // Create a container for the todos grid
    const todosGrid = document.createElement('div');
    todosGrid.classList.add('todos-grid');
  
    // Fetch and filter todos based on the tab
    const todos = this.getTodosForTab(tabId);
    if (todos.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No todos to display.';
      emptyMessage.classList.add('empty-message');
      todosGrid.appendChild(emptyMessage);
    } else {
      todos.forEach((todo) => {
        const todoItem = TodoRenderer.renderTodoItem(todo); // Render the sticky note for each todo
        todosGrid.appendChild(todoItem);
      });
    }
  
    // Append the grid to the content view
    this.contentView.appendChild(todosGrid);
  }  

  /**
   * Get todos for the selected tab.
   * @param {string} tabId - ID of the selected tab.
   * @returns {Array} - List of filtered todos.
   */
  getTodosForTab(tabId) {
    const today = startOfToday();

    if (tabId === 'all-tasks') {
      return this.taskManager.getAllCategories().flatMap((category) =>
        category.listTodos()
      );
    } else if (tabId === 'today') {
      // Filter todos due today
      return this.taskManager
        .getAllCategories()
        .flatMap((category) =>
          category.listTodos().filter((todo) =>
            todo.getDueDate() ? isSameDay(parseISO(todo.getDueDate()), today) : null
          )
        );
    } else if (tabId === 'upcoming') {
      // Filter upcoming todos
      return this.taskManager
        .getAllCategories()
        .flatMap((category) =>
          category.listTodos().filter((todo) =>
            todo.getDueDate()
              ? isAfter(parseISO(todo.getDueDate()), today) &&
                todo.getStatus() === 'incomplete'
              : null
          )
        );
    } else {
      // Treat as a category tab
      const category = this.taskManager.getCategoryByName(
        tabId.replace('category-', '')
      );
      return category ? category.listTodos() : [];
    }
  }

  /**
   * Get a user-friendly title for the selected tab.
   * @param {string} tabId - ID of the selected tab.
   * @returns {string} - Tab title.
   */
  getTabTitle(tabId) {
    if (tabId === 'all-tasks') return 'All Tasks';
    if (tabId === 'today') return "Today's Tasks";
    if (tabId === 'upcoming') return 'Upcoming Tasks';
    const newCat = tabId.replace('category-', '');
    return newCat.charAt(0).toUpperCase() + newCat.slice(1); // For categories
  }
}

export default TabManager;
