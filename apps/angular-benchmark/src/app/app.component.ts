import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = this.generateTasks(100);
  newTask = '';
  priority: Task['priority'] = 'Medium';

  generateTasks(count: number): Task[] {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: `Task ${index + 1}`,
      priority: ['Low', 'Medium', 'High'][index % 3] as Task['priority'],
      completed: index % 2 === 0
    }));
  }

  benchmark(label: string, operation: () => void): void {
    const start = performance.now();
    operation();
    const end = performance.now();
    console.log(`${label}: ${(end - start).toFixed(2)} ms`);
  }

  addTask(): void {
    if (!this.newTask.trim()) return;
    this.tasks = [...this.tasks, {
      id: Date.now(),
      title: this.newTask.trim(),
      priority: this.priority,
      completed: false
    }];
    this.newTask = '';
  }

  updateTask(id: number, field: 'title' | 'priority', value: string): void {
    this.tasks = this.tasks.map((task) => task.id === id ? { ...task, [field]: value } : task);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  renderN(count: number): void {
    this.benchmark(`Render ${count}`, () => {
      this.tasks = this.generateTasks(count);
    });
  }

  updateFifty(): void {
    this.benchmark('Update 50 tasks', () => {
      this.tasks = this.tasks.map((task, index) =>
        index < 50 ? { ...task, priority: 'High', title: `${task.title} updated` } : task
      );
    });
  }

  deleteFifty(): void {
    this.benchmark('Delete 50 tasks', () => {
      this.tasks = this.tasks.filter((_, index) => index >= 50);
    });
  }
}
