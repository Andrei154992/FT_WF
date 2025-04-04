const tasks = [];

function addTask() {
  let newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].text == newTask) {
        alert("Эта задача уже добавлена!")
        return;
      }
    }  
    tasks.push({ text: newTask, completed: false });
    const listItem = $('<li class="todo-item"></li>');
    const taskText = $('<span></span>').text(newTask).css("flex", "1 1 100%");  
    const taskDelete = $('<button></button>').text("❌").css("marginLeft", "3px");
    const taskChange = $('<button></button>').text("✏").css("paddingLeft", "8px").css("paddingRight", "8px");

    $(listItem).append(taskText);
    $(listItem).append(taskChange);
    $(listItem).append(taskDelete);

    $(taskDelete).on('click', function (e) {
      e.stopPropagation();
      $(listItem).remove();
      
      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].text === taskText.text()) {
          tasks.splice(i, 1);
        }
      }
    });

    $(taskChange).on('click', function (e) {
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
      $(taskText).text(changeText);       
      newTask = changeText;

      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].text == currentTask) {
          tasks[i].text = changeText;
        }
      }    
    });

    $(listItem).on('click', function () {
      const index = $(this).index();
      tasks[index].completed = !tasks[index].completed;
      $(this).toggleClass('completed');
    });

    $('#todo-list').append(listItem);
    $('#new-task').val('');
  }
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});
