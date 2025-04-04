const tasks = [];

function addTask() {
  let newTask = document.getElementById('new-task').value;
  if (newTask.trim() !== '') {
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].task == newTask) {
        alert("Эта задача уже добавлена!")
        return;
      }
    }  
    tasks.push({ task: newTask, completed: false });
    const taskIndex = tasks.length - 1;

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = newTask;
    taskNameElement.style.flex = '1 1 100%';

    const deleteTask = document.createElement('button');
    deleteTask.innerText = "❌";    
    deleteTask.style.marginLeft = '3px';

    const changeTask = document.createElement('button');
    changeTask.innerText = "✏";
    changeTask.style.paddingLeft = '8px';
    changeTask.style.paddingRight = '8px';
    
    listItem.appendChild(taskNameElement); 
    listItem.appendChild(changeTask);
    listItem.appendChild(deleteTask);  

    deleteTask.addEventListener('click', function (e) {
      e.stopPropagation();
      listItem.remove();
      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].task === taskNameElement.innerText) {
            tasks.splice(i, 1);
        }
      } 
    });

    changeTask.addEventListener('click', function (e) {
      e.stopPropagation();
      let currentTask = newTask;
      changeText = prompt("Измените задачу: ", currentTask);  
      if (changeText == null){     
        changeText = currentTask;
      }      
      else if (changeText == ''){
        alert("Задача не может быть пуста! Будут вписаны последние сохранённые данные.")
        changeText = currentTask;
      } 
      taskNameElement.innerText = changeText;       
      newTask = changeText;

      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].task == currentTask) {
          tasks[i].task = changeText;
        }
      }  
    });

    listItem.addEventListener('click', function () {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      listItem.classList.toggle('completed');
    });

    document.getElementById('todo-list').appendChild(listItem);
    document.getElementById('new-task').value = '';
  }
}

document.getElementById('add-button').onclick = addTask;

document.getElementById('new-task').addEventListener("keydown", (e) => {
  if (e.key == 'Enter'){
    addTask();
  }      
});