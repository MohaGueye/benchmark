import { useMemo, useState } from 'react';

const seedTasks = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Task ${index + 1}`,
    priority: ['Low', 'Medium', 'High'][index % 3],
    completed: index % 2 === 0
  }));

const priorityColors = {
  Low: '#5eead4',
  Medium: '#fbbf24',
  High: '#f87171'
};

export default function App() {
  const [tasks, setTasks] = useState(() => seedTasks(100));
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');

  const benchmark = (label, operation) => {
    const start = performance.now();
    operation();
    const end = performance.now();
    console.log(`${label}: ${(end - start).toFixed(2)} ms`);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), title: newTask.trim(), priority, completed: false };
    setTasks((prev) => [...prev, task]);
    setNewTask('');
  };

  const updateTask = (id, field, value) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, [field]: value } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const loadLargeDataset = (count) => {
    benchmark(`Render ${count}`, () => setTasks(seedTasks(count)));
  };

  const updateFifty = () => {
    benchmark('Update 50 tasks', () => {
      setTasks((prev) =>
        prev.map((task, index) =>
          index < 50 ? { ...task, priority: 'High', title: `${task.title} updated` } : task
        )
      );
    });
  };

  const deleteFifty = () => {
    benchmark('Delete 50 tasks', () => {
      setTasks((prev) => prev.filter((_, index) => index >= 50));
    });
  };

  const taskList = useMemo(() => tasks, [tasks]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>React DOM Benchmark</h1>
        <div className="actions">
          <button onClick={() => loadLargeDataset(100)}>Render 100</button>
          <button onClick={() => loadLargeDataset(500)}>Render 500</button>
          <button onClick={() => loadLargeDataset(1000)}>Render 1000</button>
          <button onClick={updateFifty}>Update 50</button>
          <button onClick={deleteFifty}>Delete 50</button>
        </div>
      </header>

      <div className="form-row">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add task</button>
      </div>

      <ul className="task-list">
        {taskList.map((task) => (
          <li key={task.id} className="task-item">
            <input
              value={task.title}
              onChange={(e) => updateTask(task.id, 'title', e.target.value)}
            />
            <select
              value={task.priority}
              onChange={(e) => updateTask(task.id, 'priority', e.target.value)}
              style={{ borderColor: priorityColors[task.priority] || '#5eead4' }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
