// Alaa Ahmad
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('input');
    const addTaskBtn = document.getElementById('btn');
    const taskList = document.getElementById('task-list');

    const getTasks = () => {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    };

    const addTask = (task) => {
        const tasks = getTasks();
        tasks.push({ text: task, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        runTasks();
    };

    const removeTask = (index) => {
        const tasks = getTasks();
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        runTasks();
    };

    
    const toggleCompleted = (index) => {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        runTasks();
    };

    
    const runTasks = () => {
        const tasks = getTasks();
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
           
            if (task.completed) {
                li.classList.add('completed');
            }

            // Create Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                toggleCompleted(index);
            });

            // Create Span for task text
            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            // Create Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                removeTask(index);
            });

            // Add to list 
            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            taskList.append(li);
        });
    };

    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            addTask(task);
            taskInput.value = '';
        }
    });

    runTasks();
});