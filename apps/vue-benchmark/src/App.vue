<script setup>
import { ref } from 'vue';

const generateTasks = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Task ${index + 1}`,
    priority: ['Low', 'Medium', 'High'][index % 3],
    completed: index % 2 === 0
  }));

const tasks = ref(generateTasks(100));
const newTask = ref('');
const priority = ref('Medium');

const benchmark = (label, operation) => {
  const start = performance.now();
  operation();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(2)} ms`);
};

const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value = [
    ...tasks.value,
    { id: Date.now(), title: newTask.value.trim(), priority: priority.value, completed: false }
  ];
  newTask.value = '';
};

const updateTask = (id, key, value) => {
  tasks.value = tasks.value.map((task) =>
    task.id === id ? { ...task, [key]: value } : task
  );
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
};

const renderN = (count) => {
  benchmark(`Render ${count}`, () => {
    tasks.value = generateTasks(count);
  });
};

const updateFifty = () => {
  benchmark('Update 50 tasks', () => {
    tasks.value = tasks.value.map((task, index) =>
      index < 50 ? { ...task, priority: 'High', title: `${task.title} updated` } : task
    );
  });
};

const deleteFifty = () => {
  benchmark('Delete 50 tasks', () => {
    tasks.value = tasks.value.filter((_, index) => index >= 50);
  });
};
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <h1>Vue DOM Benchmark</h1>
      <div class="actions">
        <button @click="renderN(100)">Render 100</button>
        <button @click="renderN(500)">Render 500</button>
        <button @click="renderN(1000)">Render 1000</button>
        <button @click="updateFifty">Update 50</button>
        <button @click="deleteFifty">Delete 50</button>
      </div>
    </header>

    <div class="form-row">
      <input v-model="newTask" placeholder="Add a task" />
      <select v-model="priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="addTask">Add task</button>
    </div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <input :value="task.title" @input="updateTask(task.id, 'title', $event.target.value)" />
        <select :value="task.priority" @change="updateTask(task.id, 'priority', $event.target.value)">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </main>
</template>
