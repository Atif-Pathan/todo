import { v4 as uuidv4 } from "uuid";

class Category {
  constructor(name) {
    if (!name) {
      throw new Error("Category name is required.");
    }

    this.id = uuidv4();
    this.name = name;
    this.todos = [];
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (!newName) {
      throw new Error("Category name cannot be empty.");
    }
    this._name = newName;
  }

  addTodo(todo) {
    if (!todo || !todo.getId()) {
      // We now use todo.getId() for consistency
      throw new Error("Invalid TodoItem.");
    }
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.getId() !== todoId);
  }

  listTodos() {
    return this.todos;
  }

  getTodosByStatus(status) {
    const validStatuses = ["incomplete", "complete", "overdue"];
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Invalid status: "${status}". Valid statuses are ${validStatuses.join(", ")}.`
      );
    }

    return this.todos.filter((todo) => todo.getStatus() === status);
  }

  getTodosByPriority(priority) {
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      throw new Error(
        `Invalid priority: "${priority}". Valid priorities are ${validPriorities.join(", ")}.`
      );
    }

    return this.todos.filter((todo) => todo.getPriority() === priority);
  }

  sortTodosBy(property, order = "asc") {
    const validProperties = ["dueDate", "priority"];
    if (!validProperties.includes(property)) {
      throw new Error(
        `Invalid sort property: "${property}". Valid properties are ${validProperties.join(", ")}.`
      );
    }

    // Clone and sort to avoid mutating the original array
    const sortedTodos = [...this.todos].sort((a, b) => {
      let comparison = 0;

      if (property === "dueDate") {
        const dateA = a.getDueDate() ? new Date(a.getDueDate()) : null;
        const dateB = b.getDueDate() ? new Date(b.getDueDate()) : null;

        if (dateA && dateB) {
          comparison = dateA - dateB;
        } else if (!dateA && dateB) {
          // If one has no dueDate, decide how to handle it
          comparison = -1;
        } else if (dateA && !dateB) {
          comparison = 1;
        }
        // If neither has dueDate, comparison stays 0
      } else if (property === "priority") {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        comparison =
          priorityOrder[a.getPriority()] - priorityOrder[b.getPriority()];
      }

      return order === "asc" ? comparison : -comparison;
    });

    return sortedTodos;
  }

  getTodoById(todoId) {
    return this.todos.find((todo) => todo.getId() === todoId) || null;
  }
}

export default Category;
