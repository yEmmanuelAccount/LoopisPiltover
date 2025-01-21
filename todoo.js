const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEdit = document.querySelector("#cancel-edit");

const saveTodo = (text) => {
    const todo =document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h1");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneButton = document.createElement("button")
    doneButton.classList.add("finish-todo")
    doneButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneButton)

    const editButton = document.createElement("button")
    editButton.classList.add("edit-todo")
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editButton)

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-todo")
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteButton)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

};

todoForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue)
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("delete-todo")){
        parentEl.remove();
}
});