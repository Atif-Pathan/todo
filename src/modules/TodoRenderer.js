class TodoRenderer {
  /**
   * Renders a single todo item as a row-based HTML element.
   * @param {Object} todo - The todo item (instance of TodoItem).
   * @param {Object} [options={}] - Additional options.
   * @param {boolean} [options.showCategory=false] - Whether to display category label.
   * @param {string} [options.categoryName=''] - If you already know the category name.
   * @returns {HTMLElement} - The rendered row element.
   */
  static renderTodoItem(todo, { showCategory = false, categoryName = '' } = {}) {
    // Create the main container for the row
    const row = document.createElement('div');
    row.classList.add('todo-item-row');

    // Completed? Then add 'completed' class
    if (todo.getStatus() === 'complete') {
      row.classList.add('completed');
    }
    // Overdue? Then add 'overdue' class (optional)
    if (todo.getStatus() === 'overdue') {
      row.classList.add('overdue');
    }

    // Checkbox to toggle complete/incomplete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-checkbox');
    // If the current status is 'complete', check the box
    checkbox.checked = (todo.getStatus() === 'complete');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        todo.setStatus('complete');
      } else {
        todo.setStatus('incomplete');
      }
      // The 'setStatus' call should handle dispatching 'contentUpdated'
      // and also your localStorage save, if implemented that way.
    });
    row.appendChild(checkbox);

    // Title
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('todo-title');
    titleSpan.textContent = todo.getTitle();
    row.appendChild(titleSpan);

    // Priority label
    const prioritySpan = document.createElement('span');
    prioritySpan.classList.add('todo-priority', `priority-${todo.getPriority()}`);
    prioritySpan.textContent = `Priority: ${todo.getPriority()}`;
    row.appendChild(prioritySpan);

    // If we’re in a "global" tab (today, upcoming, overdue), show category
    if (showCategory && categoryName) {
      const categoryBadge = document.createElement('span');
      categoryBadge.classList.add('todo-category-badge');
      categoryBadge.textContent = categoryName;
      row.appendChild(categoryBadge);
    }

    // Due date
    const dueDate = todo.getDueDate();
    const dueSpan = document.createElement('span');
    dueSpan.classList.add('todo-due-date');
    dueSpan.textContent = dueDate ? `Due: ${dueDate}` : 'No due date';
    row.appendChild(dueSpan);

    // (Optional) Edit button (no real functionality yet)
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo-btn');
    editBtn.textContent = 'Edit';
    // Potentially add logic, e.g. open an "edit" modal
    editBtn.addEventListener('click', () => {
      // TODO: open edit form or do something
      alert('TODO: Implement edit modal or logic!');
    });
    row.appendChild(editBtn);

    return row;
  }
}

export default TodoRenderer;
