import './styles.css';

import Category from './modules/Category';
import TodoItem from './modules/TodoItem';


// Create a new category
const generalCategory = new Category("General");
console.log("Category created:", generalCategory);
console.log(generalCategory.listTodos()); // Should be []


// Expected output:
// Category created: Category { id: '...', name: 'General', todos: [] }

// Create a todo
const todo1 = new TodoItem({
    title: "Learn JavaScript",
    description: "Practice ES6+ concepts",
    dueDate: "2024-12-31",
    priority: "high",
  });
  
  // Add the todo to the category
  generalCategory.addTodo(todo1);
  console.log("Todos after adding one:", generalCategory.listTodos());
  
  // Expected output:
  // Todos after adding one: [ TodoItem { id: '...', title: 'Learn JavaScript', ... } ]
  
  const foundTodo = generalCategory.getTodoById(todo1.id);
  console.log("Found todo:", foundTodo);
  
  // Expected output:
  // Found todo: TodoItem { id: '...', title: 'Learn JavaScript', ... }
  
  // Remove the todo
generalCategory.removeTodo(todo1.id);
console.log("Todos after removing:", generalCategory.listTodos());

// Expected output:
// Todos after removing: []


// Create multiple todos
const todo2 = new TodoItem({
    title: "Write a blog post",
    status: "complete",
  });
  
  const todo3 = new TodoItem({
    title: "Prepare for presentation",
    status: "incomplete",
  });
  
  // Add todos to the category
  generalCategory.addTodo(todo2);
  generalCategory.addTodo(todo3);
  
  // Filter by status
  const completedTodos = generalCategory.getTodosByStatus("complete");
  console.log("Completed todos:", completedTodos);
  
  // Expected output:
  // Completed todos: [ TodoItem { id: '...', title: 'Write a blog post', status: 'complete', ... } ]
  