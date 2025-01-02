class TodoRenderer {
    /**
     * Renders a single todo item as an HTML element styled as a sticky note.
     * @param {Object} todo - The todo item.
     * @returns {HTMLElement} - The rendered todo item element.
     */
    static renderTodoItem(todo) {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
  
      const title = document.createElement('h3');
      title.textContent = todo.getTitle();
      title.classList.add('todo-title');
  
      const description = document.createElement('p');
      description.textContent = todo.getDescription() || 'No description provided.';
      description.classList.add('todo-description');
  
      const dueDate = document.createElement('p');
      dueDate.textContent = `Due: ${todo.getDueDate() || 'No due date'}`;
      dueDate.classList.add('todo-due-date');
  
      const priority = document.createElement('p');
      priority.textContent = `Priority: ${todo.getPriority()}`;
      priority.classList.add('todo-priority', `priority-${todo.getPriority()}`);
  
      const status = document.createElement('p');
      status.textContent = `Status: ${todo.getStatus()}`;
      status.classList.add('todo-status', `status-${todo.getStatus()}`);
  
      // Add a delete button for the todo item
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('todo-delete-btn');
      deleteButton.addEventListener('click', () => {
        const category = todo.getCategory(); // Assuming `getCategory` exists on todo
        if (category) {
          category.removeTodoById(todo.getId());
          document.dispatchEvent(new CustomEvent('contentUpdated'));
        }
      });
  
      // Append elements to the todo item container
      todoItem.appendChild(title);
      todoItem.appendChild(description);
      todoItem.appendChild(dueDate);
      todoItem.appendChild(priority);
      todoItem.appendChild(status);
      todoItem.appendChild(deleteButton);
  
      return todoItem;
    }
}
  
export default TodoRenderer;
  