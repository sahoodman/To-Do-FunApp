//Selectors
const todoInput =document.querySelector(".todo-input");
const todoButton =document.querySelector(".todo-button");
const todoList =document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    //console.log("hello")
    //Prevent form from submitting
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADD TODO TO THE LOCAL STORAGE
    saveLocalTodos(todoInput.value); 

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append todo List
    todoList.appendChild(todoDiv);
    // var node = document.createElement("div");                 // Create a <li> node
    // var textnode = document.createTextNode("Water");         // Create a text node
    // node.appendChild(textnode);                              // Append the text to <li>
    // document.getElementById("myList").appendChild(node); 

    //Clear Todo Input Value
    todoInput.value = "";
}


function deleteCheck(e){
    //console.log(e.target);
    const item = e.target;

    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    //Check Mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;    
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //CHECK---Hey do I already have things  in there
    let todods;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.push(todo);
    localStorage.setItem("todo", JSON.stringify(todos));
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}