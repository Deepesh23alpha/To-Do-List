const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const total = document.getElementById("totalCount");
const completed = document.getElementById("compCount");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tCount = tasks.length;
let cCount = tasks.filter(task => task.completed).length;

function updateLocalStorageTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCounts() {
  total.innerText = tCount;
  completed.innerText = cCount;
}

function renderTasks() {
  listContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = task.name;
    
    if (task.completed) {
      li.classList.add("checked");
    }

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    listContainer.appendChild(li);
  });
}

// Event listener for marking tasks as completed or uncompleted
listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    const index = Array.from(listContainer.children).indexOf(e.target);
    const clickedTask = tasks[index];
    if (!clickedTask.completed) {
      clickedTask.completed = true;
      cCount++; // Increment completed count when marking a task as completed
    } else {
      clickedTask.completed = false;
      cCount--; // Decrement completed count when marking a completed task as incomplete
    }
    updateLocalStorageTasks();
    updateCounts();
    renderTasks();
  }
});

// Event listener for deleting tasks
listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "SPAN") {
    const index = Array.from(listContainer.children).indexOf(e.target.parentElement);
    const deletedTask = tasks[index];
    if (deletedTask.completed) {
      cCount--; // Decrement completed count when deleting a completed task
    }
    tasks.splice(index, 1);
    tCount--;
    updateLocalStorageTasks();
    updateCounts();
    renderTasks();
  }
});

function addTask() {
  if (inputBox.value === '') {
    alert("Task cannot be empty!");
  } else {
    let task = {
      name: inputBox.value,
      completed: false
    };

    tasks.push(task);
    tCount++;
    updateLocalStorageTasks();
    updateCounts();
    renderTasks();
  }
  inputBox.value = "";
}

inputBox.addEventListener('keypress', function (q) {
  if (q.key === 'Enter') {
    addTask();
  }
});

updateCounts();
renderTasks();

