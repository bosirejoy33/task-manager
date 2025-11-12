// src/Task.js
export class Task {
  constructor(id, title, done = false) {
    this.id = String(id);
    this.title = String(title).trim();
    this.done = Boolean(done);
  }

  toggle() {
    this.done = !this.done;
  }

  toJSON() {
    // Control how JSON.stringify serializes Task
    return { id: this.id, title: this.title, done: this.done, type: 'Task' };
  }

static fromJSON(obj) {
    if (!obj) return null;
    return new Task(obj.id, obj.title, obj.done, obj.dueDate);
   }
}
//this class extends the task deadline
export class TimedTask extends Task {
  constructor(id, title, done = false, dueDate = null) {
    super(id, title, done);
    this.dueDate = dueDate ? new Date(dueDate) : null;
  }
  isOverdue() {
    if (!this.dueDate) return false;
    return !this.done && this.dueDate < new Date();
  }
  toJSON() {
    const json = super.toJSON();
    json.dueDate = this.dueDate;
    return {
    ...super.toJSON(),
    dueDate: this.dueDate ? this.dueDate.toISOString() : null,
    type: 'TimedTask'
  };
  }

   static fromJSON(obj) {
    if (!obj) return null;
    return new TimedTask(obj.id, obj.title, obj.done, obj.dueDate);
   }
}