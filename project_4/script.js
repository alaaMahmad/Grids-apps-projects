// Alaa Ahmad
class Task {
    constructor(description) {
       
        this.id = Date.now().toString(); 
        this.description = description;
        this.isCompleted = false;
    }
}

class Storage {
    // A static method TO called without creating an instance of the class
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            //to sure we have instances of the Task class
            const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
            tasks = tasksFromStorage.map(taskData => {
                const task = new Task(taskData.description);
                task.id = taskData.id;
                task.isCompleted = taskData.isCompleted;
                return task;
            });
        }
        return tasks;
    }

    static addTask(task) {
        const tasks = Storage.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //to update task
    static updateTask(id) {
        const tasks = Storage.getTasks();
        tasks.forEach(task => {
            if (task.id === id) {
                task.isCompleted = !task.isCompleted;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(id) {
        let tasks = Storage.getTasks();
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// fOR User Interface 
class UI {
    static displayTasks() {
        const tasks = Storage.getTasks();
        tasks.forEach(task => UI.addTaskToList(task));
    }

    
    static addTaskToList(task) {
        const list = document.getElementById('task-list');
        const item = document.createElement('li');
        // add completed class if needed
        item.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
        item.setAttribute('data-id', task.id);

        item.innerHTML = `
            <input type="checkbox" class="complete-cb" ${task.isCompleted ? 'checked' : ''}>
            <span>${task.description}</span>
            <button class="delete-btn">Delete</button>
        `;
        list.append(item);
    }
    
    static removeTaskFromList(element) {
        if (element.classList.contains('delete-btn')) {
            // Find the grandparent li element and delete it
            element.parentElement.remove();
        }
    }

    
    static toggleComplete(checkbox) {
        checkbox.parentElement.classList.toggle('completed');
    }

    static clearInput() {
        document.getElementById('task-input').value = '';
    }
}


//for Display tasks when the page loads
document.addEventListener('DOMContentLoaded', UI.displayTasks);

//  Add a task
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault(); //to precent the browser reloads the page 

    const description = document.getElementById('task-input').value.trim();

    if (description) {
        const task = new Task(description);
        UI.addTaskToList(task);
        Storage.addTask(task);
        UI.clearInput();
    }
});



document.getElementById('task-list').addEventListener('click', (e) => {
    const target = e.target;
    
    // Handle deleting a task
    if (target.classList.contains('delete-btn')) {//to get pearant i mean to get <li>
        const taskElement = target.closest('.task-item'); 
        if (taskElement) {
            const id = taskElement.getAttribute('data-id');
            Storage.removeTask(id);
            UI.removeTaskFromList(target);
        }
    }
});

// Listen for checkbox changes on the task list
document.getElementById('task-list').addEventListener('change', (e) => {
    const target = e.target;

    // Handle completing a task
    if (target.classList.contains('complete-cb')){ //to get pearant i mean to get <li>
     
        const taskElement = target.closest('.task-item');
        if (taskElement) {
            const id = taskElement.getAttribute('data-id');
            Storage.updateTask(id);
            UI.toggleComplete(target);
        }
    }
});