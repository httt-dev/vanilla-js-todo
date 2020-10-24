//todo object
// todoItem = {
//     text : '',
//     completed : false
// }

function TodoItem(_text,_completed){
    this.text = _text;
    this.completed = _completed;
}

//seectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event listeners 
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
//Functions

function addTodo(event){
    event.preventDefault();
    if(todoInput.value=="" || todoInput.value==undefined){
        return;
    }
    //console.log("Hi")
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI 
    const newTodo = document.createElement("li");
    newTodo.innerText =todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add  to localstoregae
    saveLocalTodos(todoInput.value , false);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML ='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML ='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //add to list element
    todoList.appendChild(todoDiv);
    //clear
    todoInput.value="";

}

function deleteCheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend' , function(){
            todo.remove();
        });
    }

    //check mark 
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        let isCompleted=false;
        if(todo.classList.contains("completed")){
            isCompleted = true
        }
        updateLocalTodoStatus(todo,isCompleted)
    }

}
function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(e.target.value);
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
  }

  function saveLocalTodos(todo , completed){
      //check 
      let todos ;
      if(localStorage.getItem('todos')===null){
          todos =[];
      }else{
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      const todoItem = new TodoItem(todo, completed);
      todos.push(todoItem);
      localStorage.setItem('todos', JSON.stringify(todos));

  }

  function getTodos(){
    let todos ;
    if(localStorage.getItem('todos')===null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo)=>{
        //Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if(todo.completed){
            todoDiv.classList.add("completed");
        }
        //create LI 
        const newTodo = document.createElement("li");
        newTodo.innerText =todo.text;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML ='<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML ='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //add to list element
        todoList.appendChild(todoDiv);
    })
  }

  function removeLocalTodos(todo){
      //check 
      let todos ;
      if(localStorage.getItem('todos')===null){
          todos =[];
      }else{
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      //remove item
      const todoText = todo.children[0].innerText; //text
      newTodos = todos.filter(function(item){
          return item.text != todoText;
      });
      //todos.splice(todos.indexOf(todoText),1);
      localStorage.setItem('todos' , JSON.stringify(newTodos));
  }

  function updateLocalTodoStatus(todo , status){
      //check 
      let todos ;
      if(localStorage.getItem('todos')===null){
          todos =[];
      }else{
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      //remove item
      const todoText = todo.children[0].innerText; //text
      todos.forEach((item)=>{
          if(item.text===todoText){
              item.completed = status;
          }
      })

      //todos.splice(todos.indexOf(todoText),1);
      localStorage.setItem('todos' , JSON.stringify(todos));
  }
