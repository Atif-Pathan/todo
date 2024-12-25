import Category from "./Category.js";
import TodoItem from "./TodoItem.js";

class TaskManager {
  static instance;
  static defaultCategoryName = "General";

  constructor() {
    if (TaskManager.instance) {
      return TaskManager.instance; // Return existing singleton instance
    }

    this.categories = [];
    this._ensureDefaultCategory();
    TaskManager.instance = this; // Store the new instance, is no instance existed
  }

  _ensureDefaultCategory() {
    // Create the default category if it doesn't exist
    if (
      !this.categories.find(
        (cat) => cat.name === TaskManager.defaultCategoryName
      )
    ) {
      this.categories.push(new Category(TaskManager.defaultCategoryName));
    }
  }

  // -- Category Management --
  getAllCategories() {
    return this.categories;
  }

  createCategory(name) {
    if (this.categories.find((cat) => cat.name === name)) {
      throw new Error(`Category "${name}" already exists.`);
    }
    this.categories.push(new Category(name));
  }

  getCategoryByName(name) {
    return this.categories.find((cat) => cat.name === name);
  }

  deleteCategory(name) {
    const index = this.categories.findIndex((cat) => cat.name === name);
    if (index === -1) {
      throw new Error(`Category "${name}" not found.`);
    }
    this.categories.splice(index, 1);
  }

  renameCategory(oldName, newName) {
    const category = this.getCategoryByName(oldName);
    if (!category) {
      throw new Error(`Category "${oldName}" not found.`);
    }
    if (this.categories.find((cat) => cat.name === newName)) {
      throw new Error(`Category "${newName}" already exists.`);
    }
    category.name = newName;
  }

  // -- Todo Management (within a category) --
  addTodoToCategory(todoDetails, categoryName = TaskManager.defaultCategoryName) {
    const category = this.getCategoryByName(categoryName);
    if (!category) {
      throw new Error(`Category "${categoryName}" not found.`);
    }
    const todo = new TodoItem(todoDetails);
    category.addTodo(todo);
  }

  deleteTodo(todoId, categoryName) {
    const category = this.getCategoryByName(categoryName);
    if (!category) {
      throw new Error(`Category "${categoryName}" not found.`);
    }

    const todo = category.getTodoById(todoId);
    if (!todo) {
      throw new Error(
        `Todo with ID "${todoId}" not found in category "${categoryName}".`
      );
    }
    category.removeTodo(todoId);
  }

  updateTodo(todoId, categoryName, updatedDetails) {
    const category = this.getCategoryByName(categoryName);
    if (!category) {
      throw new Error(`Category "${categoryName}" not found.`);
    }

    const todo = category.getTodoById(todoId);
    if (!todo) {
      throw new Error(
        `Todo with ID "${todoId}" not found in category "${categoryName}".`
      );
    }

    if (updatedDetails.title) todo.setTitle(updatedDetails.title);
    if (updatedDetails.description) todo.setDescription(updatedDetails.description);
    if (updatedDetails.dueDate) todo.setDueDate(updatedDetails.dueDate);
    if (updatedDetails.priority) todo.setPriority(updatedDetails.priority);
    if (updatedDetails.status) todo.setStatus(updatedDetails.status);
  }

  moveTodo(todoId, fromCategoryName, toCategoryName) {
    const fromCategory = this.getCategoryByName(fromCategoryName);
    if (!fromCategory) {
      throw new Error(`Source category "${fromCategoryName}" not found.`);
    }

    const toCategory = this.getCategoryByName(toCategoryName);
    if (!toCategory) {
      throw new Error(`Destination category "${toCategoryName}" not found.`);
    }

    const todo = fromCategory.getTodoById(todoId);
    if (!todo) {
      throw new Error(
        `Todo with ID "${todoId}" not found in category "${fromCategoryName}".`
      );
    }
    fromCategory.removeTodo(todoId);
    toCategory.addTodo(todo);
  }

  checkOverdueTodos() {
    const currentDate = new Date();
    this.categories.forEach((category) => {
      category.todos.forEach((todo) => {
        // use todoItem utility method
        todo.checkOverdue(currentDate);
      });
    });
  }  

  // -- Filtering & Sorting (Global for all todos) --
  getTodosByStatus(status) {
    const validStatuses = ["incomplete", "complete", "overdue"];
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Invalid status: "${status}". Valid statuses are ${validStatuses.join(", ")}.`
      );
    }

    return this.categories.flatMap((cat) =>
      cat.todos.filter((todo) => todo.getStatus() === status)
    );
  }

  getTodosByPriority(priority) {
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      throw new Error(
        `Invalid priority: "${priority}". Valid priorities are ${validPriorities.join(", ")}.`
      );
    }

    return this.categories.flatMap((cat) =>
      cat.todos.filter((todo) => todo.getPriority() === priority)
    );
  }

  sortTodosBy(property, order = "asc") {
    const validProperties = ["dueDate", "priority"];
    if (!validProperties.includes(property)) {
      throw new Error(
        `Invalid sort property: "${property}". Valid properties are ${validProperties.join(", ")}.`
      );
    }

    // We want to maintain references to actual TodoItems but also track the category name
    // so let's keep them as objects containing { todo, categoryName }
    return this.categories
      .flatMap((cat) =>
        cat.todos.map((todo) => ({ todo, categoryName: cat.name }))
      )
      .sort((a, b) => {
        let comparison = 0;

        if (property === "dueDate") {
          const dateA = a.todo.getDueDate() ? new Date(a.todo.getDueDate()) : null;
          const dateB = b.todo.getDueDate() ? new Date(b.todo.getDueDate()) : null;

          if (dateA && dateB) {
            comparison = dateA - dateB;
          } else if (!dateA && dateB) {
            comparison = -1; 
          } else if (dateA && !dateB) {
            comparison = 1; 
          }
        } else if (property === "priority") {
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          comparison =
            priorityOrder[a.todo.getPriority()] - priorityOrder[b.todo.getPriority()];
        }

        return order === "asc" ? comparison : -comparison;
      });
  }

  getStatsForCategory(categoryName) {
    const category = this.getCategoryByName(categoryName);
    if (!category) {
      throw new Error(`Category "${categoryName}" not found.`);
    }

    const stats = {
      totalTodos: category.todos.length,
      incomplete: 0,
      complete: 0,
      overdue: 0,
    };

    category.todos.forEach((todo) => {
      const status = todo.getStatus();
      if (status === "incomplete") stats.incomplete++;
      if (status === "complete") stats.complete++;
      if (status === "overdue") stats.overdue++;
    });

    return stats;
  }
}

export default new TaskManager();
