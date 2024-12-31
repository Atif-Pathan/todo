import TaskManager from './TaskManager.js';
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

    // Add a title for the current tab
    const title = document.createElement('h2');
    title.textContent = `${this.getTabTitle(tabId)}`;
    title.classList.add('page-title');
    this.contentView.appendChild(title);

    // Add a button to open the modal for creating a new todo
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = 'Add Todo';
    addTodoButton.classList.add('add-todo-btn');
    addTodoButton.addEventListener('click', () => {
      import('../components/modal.js').then(({ openModal }) => openModal(tabId));
    });
    this.contentView.appendChild(addTodoButton);

    // Render the list of todos based on the selected tab
    const taskList = document.createElement('ul');
    taskList.classList.add('task-list');

    // Fetch and filter todos based on the tab
    const todos = this.getTodosForTab(tabId);
    if (todos.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No todos to display.';
      this.contentView.appendChild(emptyMessage);
    } else {
      todos.forEach((todo) => {
        const listItem = this.createTodoListItem(todo);
        taskList.appendChild(listItem);
      });
    }

    this.contentView.appendChild(taskList);
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
            todo.getDueDate() ? (isAfter(parseISO(todo.getDueDate()), today) &&
            todo.getStatus() === 'incomplete') : null
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
   * Create a list item for a todo.
   * @param {Object} todo - The todo item.
   * @returns {HTMLElement} - List item element.
   */
  createTodoListItem(todo) {
    const listItem = document.createElement('li');
    listItem.textContent = `${todo.getTitle()} (Priority: ${todo.getPriority()})`;
    return listItem;
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
