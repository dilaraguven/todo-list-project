const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterItem = document.getElementById("status-filter");
clearButton = document.getElementById("clear");

function addTodo(e) {
  e.preventDefault();

  const newItem = todoInput.value;

  if (newItem === "") {
    alert("Please enter a task");
    return;
  }

  //create list item
  const li = document.createElement("li");
  li.className = "uncomplated";
  const checkButton = createCheckButton("check-item btn-link");
  li.appendChild(checkButton);
  const p = createText(newItem);
  li.appendChild(p);
  const deleteButton = createDeleteButton("remove-item btn-link");
  li.appendChild(deleteButton);
  todoList.appendChild(li);
  todoInput.value = "";
}

function createText(newItem) {
  const p = document.createElement("p");
  p.innerHTML = newItem;
  p.style.display = "inline";
  return p;
}

function createCheckButton(classes) {
  const checkbutton = document.createElement("button");
  const icon = createIcon("fa-solid fa-check");
  checkbutton.appendChild(icon);
  checkbutton.className = classes;
  return checkbutton;
}

function createDeleteButton(classes) {
  const deleteButton = document.createElement("button");
  const icon = createIcon("fa-solid fa-xmark");
  deleteButton.appendChild(icon);
  deleteButton.className = classes;
  return deleteButton;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function checkAndRemoveItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  } else if (e.target.parentElement.classList.contains("check-item")) {
    const checkButton = e.target.parentElement;
    const checkIcon = e.target;
    const textElement = checkButton.nextElementSibling;
    const listItem = checkButton.parentElement;

    if (checkIcon.style.color === "white") {
      checkIcon.style.color = "";
      checkButton.style.borderColor = "#353535";
      checkButton.style.backgroundColor = "";
      textElement.style.textDecoration = "";
      listItem.className = "uncompleted";
    } else {
      checkIcon.style.color = "white";
      checkButton.style.backgroundColor = "green";
      checkButton.style.borderColor = "green";
      textElement.style.textDecoration = "line-through";
      listItem.className = "completed";
    }
  }
}

function filterTodo(e) {
  const todos = todoList.children;

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    switch (e.target.value) {
      case "all":
        todo.style.display = "block";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  }
}

function clearAllItems(){

  while(todoList.firstChild ){
   todoList.removeChild(todoList.firstChild);
  }
}

//Event Listeners
todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", checkAndRemoveItem);
filterItem.addEventListener("change", filterTodo);
clearButton.addEventListener("click",clearAllItems);
