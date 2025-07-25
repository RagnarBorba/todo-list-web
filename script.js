const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const shouldDisplay =
      currentFilter === 'all' ||
      (currentFilter === 'completed' && task.completed) ||
      (currentFilter === 'pending' && !task.completed);

    if (shouldDisplay) {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);
      li.innerHTML = `
        <span onclick="toggleTask(${index})">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${index})">X</button>
      `;
      taskList.appendChild(li);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
document.getElementById('clear-all-btn').addEventListener('click', clearAllTasks);


renderTasks();

function clearAllTasks() {
  tasks = []; // esvazia a lista
  renderTasks(); // atualiza a interface
}
