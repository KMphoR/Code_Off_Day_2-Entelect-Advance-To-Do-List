
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ADD NEW TASK
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate').value;
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        const task = {
            name: taskName,
            dueDate: dueDate,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        taskInput.value = '';
        dueDate.value = '';
        displayTasks();
    }
    else {
        alert("Task name can't be empty");
    }
}

// CLEAR FUNCTION
function clearAllTasks() {
    tasks = [];
    saveTasks();
    displayTasks();
}

// EDIT FUNCTION
function editTask(index, newName) {
    tasks[index].name = newName;
    saveTasks();
    displayTasks();
}

// DELETE FUNCTION
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// TICK FUNCTION
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// SORT FUNCTION 
function sortTasks() {
    const sortOption = document.getElementById('sortOption').value;
    if (sortOption === 'status') {
        tasks.sort((a, b) => a.completed - b.completed);
    } 
    else if (sortOption === 'date') {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    displayTasks();
}

// SAVING TASKS TO STORAGE
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/// DISPLAYING TASKS
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleComplete(index);

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = task.name;
        editInput.onchange = (e) => editTask(index, e.target.value);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        const dueDate = document.createElement('span');
        dueDate.innerHTML = ` Due: ${task.dueDate}`;

        listItem.appendChild(checkbox);
        listItem.appendChild(editInput);
        listItem.appendChild(deleteButton);
        listItem.appendChild(dueDate);
        taskList.appendChild(listItem);
    });
}

displayTasks();