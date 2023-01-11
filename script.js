//selectors
const toDoInput = document.querySelector(".toDoInput");
const submit = document.querySelector(".submit");
const ul = document.querySelector(".myList");
const filterOption = document.querySelector(".dropdown");

//listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
submit.addEventListener("click", addTodo);
ul.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    //Makes sure website doesn't refresh when clicking submit
    event.preventDefault();

    //Adding items to the list
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newLi = document.createElement("li");
    newLi.innerText = toDoInput.value;
    newLi.classList.add("todo-item");
    todoDiv.appendChild(newLi);

    //Adding to the local storage
    saveLocalTodos(toDoInput.value);

    //Adding the check/complete button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    checkButton.classList.add("complete-btn");
    todoDiv.appendChild(checkButton);

    //Adding the delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></li>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);

    //Appending todoDiv to ul
    ul.appendChild(todoDiv);

    //resetting the value of the input to blank after it's submitted
    toDoInput.value = "";
}

function deleteCheck(e) {

    const item = e.target;
    //making the delete function work
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
    //making the complete function work
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//filtering the list into all, completed, and incomplete
function filterTodo(e) {
    //grabbing todo's
    const todos = ul.childNodes;
    //loops todos
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                //checks if its completed and if so, shows them.
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
                //checks if its incomplete and if so, shows them.
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//saves the list to local storage
function saveLocalTodos(todo) {
    //checks if there's things in there already,
    // if not it creates an empty array.
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//getting the todo's saved in local storage
//and looping through them.
function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newLi = document.createElement("li");
        newLi.innerText = todo;
        newLi.classList.add("todo-item");
        todoDiv.appendChild(newLi);

        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        checkButton.classList.add("complete-btn");
        todoDiv.appendChild(checkButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></li>';
        deleteButton.classList.add("trash-btn");
        todoDiv.appendChild(deleteButton);

        ul.appendChild(todoDiv);
    });
}

//removes the todos from the local storage
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //checking the array and choosing which you want to remove.
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
