<script>
  const generateTasks = (count) =>
    Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: `Task ${index + 1}`,
      priority: ['Low', 'Medium', 'High'][index % 3],
      completed: index % 2 === 0
    }));

  let tasks = generateTasks(100);
  let newTask = '';
  let priority = 'Medium';

  const benchmark = (label, operation) => {
    const start = performance.now();
    operation();
    const end = performance.now();
    console.log(`${label}: ${(end - start).toFixed(2)} ms`);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    tasks = [...tasks, { id: Date.now(), title: newTask.trim(), priority, completed: false }];
    newTask = '';
  };

  const updateTask = (id, field, value) => {
    tasks = tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task));
  };

  const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
  };

  const renderN = (count) => {
    benchmark(`Render ${count}`, () => {
      tasks = generateTasks(count);
    });
  };

  const updateFifty = () => {
    benchmark('Update 50 tasks', () => {
      tasks = tasks.map((task, index) =>
        index < 50 ? { ...task, priority: 'High', title: `${task.title} updated` } : task
      );
    });
  };

  const deleteFifty = () => {
    benchmark('Delete 50 tasks', () => {
      tasks = tasks.filter((_, index) => index >= 50);
    });
  };
</script>

<main class="app-shell">
  <header class="topbar">
    <h1>Svelte DOM Benchmark</h1>
    <div class="actions">
      <button on:click={() => renderN(100)}>Render 100</button>
      <button on:click={() => renderN(500)}>Render 500</button>
      <button on:click={() => renderN(1000)}>Render 1000</button>
      <button on:click={updateFifty}>Update 50</button>
      <button on:click={deleteFifty}>Delete 50</button>
    </div>
  </header>

  <div class="form-row">
    <input bind:value={newTask} placeholder="Add a task" />
    <select bind:value={priority}>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <button on:click={addTask}>Add task</button>
  </div>

  <ul class="task-list">
    {#each tasks as task (task.id)}
      <li class="task-item">
        <input value={task.title} on:input={(event) => updateTask(task.id, 'title', event.target.value)} />
        <select value={task.priority} on:change={(event) => updateTask(task.id, 'priority', event.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button on:click={() => deleteTask(task.id)}>Delete</button>
      </li>
    {/each}
  </ul>
</main>
