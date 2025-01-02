import TaskManager from './TaskManager.js';
import StickyWall from './StickyWall.js'; // Updated to use StickyWall for rendering category-level sticky notes
import TodoRenderer from './TodoRenderer.js';
import { isSameDay, isAfter, startOfToday, parseISO, isBefore } from 'date-fns';

class TabManager {
  constructor(contentViewSelector) {
    this.contentView = document.querySelector(contentViewSelector);
    if (!this.contentView) {
      throw new Error('Content view container not found!');
    }

    this.taskManager = TaskManager; // Reference to TaskManager for fetching todos
    this.currentTabId = 'today'; // Default tab to render
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
    const addTodoButton = document.querySelector('.add-todo-btn');
    addTodoButton.addEventListener('click', () => {
      import('../components/modal.js').then(({ openModal }) => openModal(tabId));
    });
    // header.appendChild(addTodoButton);

    // Append the header to the content view
    this.contentView.appendChild(header);

    if (tabId === 'all-tasks') {
      const todosGrid = document.createElement('div');
      todosGrid.classList.add('category-grid');
      // Render category-level sticky notes
      const categories = this.taskManager.getAllCategories();
      if (categories.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No categories exist. Create a new category to add Todos to!';
        emptyMessage.classList.add('empty-message-sticky');
        todosGrid.appendChild(emptyMessage);
      } else {
        StickyWall.renderAllCategories(categories, todosGrid); // Use StickyWall to render categories
      }
      this.contentView.appendChild(todosGrid);
    } else {
      const todosList = document.createElement('div');
      todosList.classList.add('todo-item-list');
      // Render individual todos for other tabs
      const todos = this.getTodosForTab(tabId);
      if (todos.length !== 0) {
        todos.forEach((todo) => {
          const todoItem = TodoRenderer.renderTodoItem(todo); // Render the todo item
          todosList.appendChild(todoItem);
        });
      } else {
        const emptyMessage = document.createElement('p');
        if (tabId === 'overdue') {
          emptyMessage.innerHTML = `No overdue tasks. Keep it up!`;
        } else if (tabId === 'today') {
          emptyMessage.innerHTML = `No tasks for today!`;
        } else if (tabId === 'upcoming') {
          emptyMessage.innerHTML = `No upcoming tasks, maybe you missed some in the <u>overdue section</u>!`;
        } else {
          emptyMessage.innerHTML = `No tasks in ${tabId.replace('category-', '')}.`;
        }
        emptyMessage.classList.add('empty-message-todo');
        todosList.appendChild(emptyMessage);
      }
      this.contentView.appendChild(todosList);
    }
    
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
    } else if (tabId === 'overdue') {
      this.taskManager.checkOverdueTodos();
      // Filter overdue todos
      return this.taskManager
        .getAllCategories()
        .flatMap((category) =>
          category.listTodos().filter((todo) =>
            todo.getDueDate()
              ? isBefore(parseISO(todo.getDueDate()), today) &&
                todo.getStatus() === 'overdue'
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
    if (tabId === 'all-tasks') return 'The Sticky Wall';
    if (tabId === 'today') return "Today's Tasks";
    if (tabId === 'upcoming') return 'Upcoming Tasks';
    if (tabId === 'overdue') return 'Overdue Tasks';
    const newCat = tabId.replace('category-', '');
    return newCat.charAt(0).toUpperCase() + newCat.slice(1); // For categories
  }
}

export default TabManager;
