function addToList(event) {
    let input = document.getElementById("toDo").value;
    let ul = document.getElementById("myList");

    let newLi = document.createElement("li");
    newLi.textContent = input;
    ul.append(newLi);
};

let button=document.getElementById("submit");

button.addEventListener("click", addToList);
