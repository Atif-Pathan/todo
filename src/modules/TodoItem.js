import { v4 as uuidv4 } from "uuid";
import { formatISO, isBefore } from "date-fns";

class TodoItem {
  constructor({
    title,
    description = "",
    dueDate = null,
    priority = "low",
    status = "incomplete",
  } = {}) {
    if (!title) {
      throw new Error("Title is required for a TodoItem.");
    }
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.priority = priority;
    this.status = status;
    this.createdDate = new Date();
    this.updatedDate = this.createdDate;
  }

  // Getters
  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate ? formatISO(this.dueDate) : null;
  }

  getPriority() {
    return this.priority;
  }

  getStatus() {
    return this.status;
  }

  getCreatedDate() {
    return formatISO(this.createdDate);
  }

  getUpdatedDate() {
    return formatISO(this.updatedDate);
  }

  // Setters
  setTitle(newTitle) {
    if (!newTitle) {
      throw new Error("Title cannot be empty.");
    }
    this.title = newTitle;
    this._updateTimestamp();
  }

  setDescription(newDescription) {
    this.description = newDescription;
    this._updateTimestamp();
  }

  setDueDate(newDueDate) {
    const date = new Date(newDueDate);
    if (isNaN(date)) {
      throw new Error("Invalid date.");
    }
    this.dueDate = date;
    this._updateTimestamp();
  }

  setPriority(newPriority) {
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(newPriority)) {
      throw new Error(
        "Priority must be 'low', 'medium', or 'high'."
      );
    }
    this.priority = newPriority;
    this._updateTimestamp();
  }

  setStatus(newStatus) {
    const validStatuses = ["incomplete", "complete", "overdue"];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(
        "Status must be 'incomplete', 'complete', or 'overdue'."
      );
    }
    this.status = newStatus;
    this._updateTimestamp();
  }

  // Utility Methods
  markAsComplete() {
    this.status = "complete";
    this._updateTimestamp();
  }

  markAsIncomplete() {
    this.status = "incomplete";
    this._updateTimestamp();
  }

  checkOverdue(currentDate = new Date()) {
    if (this.dueDate && isBefore(this.dueDate, currentDate)) {
      this.status = "overdue";
      this._updateTimestamp();
    }
  }

  // to check overdue status without modifying todoItem
  isOverdue(currentDate = new Date()) {
    return this.dueDate && isBefore(this.dueDate, currentDate);
  }

  // Private method to update the timestamp after each setter is called
  _updateTimestamp() {
    this.updatedDate = new Date();
  }
}

export default TodoItem;
