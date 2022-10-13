const btnAddTodo = document.querySelector("#add-todo");
const btnDelDone = document.querySelector("#del-done");
let todos = []; //todos ausm local storage ziehen || wenn nichts da = leeres array
if (JSON.parse(localStorage.getItem("todos")) !== null) {
  todos = JSON.parse(localStorage.getItem("todos"));
} else {
  todos = [];
}

//let todos = JSON.parse(localStorage.getItem("todos") || [] -> macht if schleife unnöttig

let filterDoneisActive = false;
let filterOpenisActive = false;

render();
btnAddTodo.addEventListener("click", addTodo);

document.getElementById("done").addEventListener("change", () => {
  filterDoneisActive = true;
  filterOpenisActive = false;
  render();
});

document.getElementById("open").addEventListener("change", () => {
  filterOpenisActive = true;
  filterDoneisActive = false;
  render();
});

document.getElementById("all").addEventListener("change", () => {
  filterOpenisActive = false;
  filterDoneisActive = false;
  render();
});

function addTodo() {
  const todoDescription = document.querySelector("#todo-description");
  if (todoDescription.value < 3) {
    return;
  }

  todos.push({
    description: todoDescription.value,
    done: false,
  });

  render();
  //neues todo in array pushen => local storage ändern
  localStorage.setItem("todos", JSON.stringify(todos));
  todoDescription.value = "";

  todoDescription.focus();
}

function render() {
  const list = document.querySelector("#todos-output");
  list.innerHTML = "";

  let todoList = [];

  if (filterDoneisActive) {
    todoList = filterDones();
  } else if (filterOpenisActive) {
    todoList = filterOpens();
  } else {
    todoList = todos;
  }

  todoList.forEach((todo, index) => {
    const listEl = document.createElement("li");
    const checkboxEl = document.createElement("input");
    const labelEl = document.createElement("label");

    checkboxEl.setAttribute("type", "checkbox");
    checkboxEl.value = todo.description;
    checkboxEl.checked = todo.done;
    checkboxEl.setAttribute("id", "id-" + index);
    labelEl.innerText = todo.description;
    labelEl.setAttribute("for", "id-" + index);

    listEl.append(checkboxEl);
    listEl.append(labelEl);
    list.append(listEl);

    checkboxEl.addEventListener("change", () => onCheckboxChange(index));
  });
}

function onCheckboxChange(currentIndex) {
  todos[currentIndex].done = !todos[currentIndex].done;
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function filterDones() {
  return todos.filter((todo) => todo.done === true);
}

function filterOpens() {
  return todos.filter((todo) => todo.done === false);
}

btnDelDone.addEventListener("click", delToDo);

function delToDo() {
  let newList = [];
  todos.filter((todo) => {
    if (todo.done === false) {
      newList.push(todo);
    }
    todos = newList;
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
  });
}
