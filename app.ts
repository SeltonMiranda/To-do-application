interface Task {
  id: number;
  task: string | null;
  completed: boolean;
}

const form: HTMLFormElement | null = document.querySelector(".task-form");
const input: HTMLInputElement | null = document.querySelector(".task-input") ;
const todolist: HTMLUListElement | null = document.querySelector(".todo-list") ;

const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks : string | null = localStorage.getItem('tasks');
  
  if (savedTasks === null) {
    return [];
  }

  return JSON.parse(savedTasks);
}

let tasklist: Task[] = loadTasksFromLocalStorage();

const addTask = (task: string): void => {
  const newTask: Task = {
    id: Date.now(),
    task: task || null,
    completed: false
  };

  if (newTask.task === null) {
    return;
  }

  tasklist.push(newTask);
  saveTasks(tasklist);
  renderTasks(tasklist);
}

const removeTask = (id: number): void => {
  tasklist = tasklist.filter((task) => task.id !== id);
  saveTasks(tasklist);
  renderTasks(tasklist);
}

const toggleTaskComplete = (id: number): void => {
  const task: Task | undefined = tasklist.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasklist);
    renderTasks(tasklist);
  }
}
const renderTasks = (tasklist: Task[]): void => {
  if (todolist === null) {
    return;
  }

  todolist.innerHTML = '';
  tasklist.forEach((task) => {
    const li: HTMLLIElement = document.createElement("li");

    const taskText: HTMLSpanElement = document.createElement("span");
    taskText.innerHTML = task.task || '';

    taskText.classList.toggle('completed', task.completed);

    const completeButton = document.createElement('button') as HTMLButtonElement;
    completeButton.innerHTML = 'Complete Task';
    completeButton.onclick = () => toggleTaskComplete(task.id);

    const removeButton = document.createElement('button') as HTMLButtonElement;
    removeButton.innerHTML = 'Remove Task';
    removeButton.onclick = () => removeTask(task.id);

    li.appendChild(taskText);
    li.appendChild(completeButton);
    li.appendChild(removeButton);
    todolist.appendChild(li);
  })
}

const saveTasks = (tasklist: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasklist));
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (input === null) {
      return;
    }

    const newTask = input.value.trim();
    if (newTask) {
      addTask(newTask);
      input.value = '';
    }
  })
}


renderTasks(tasklist);