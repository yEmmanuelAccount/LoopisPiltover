const tasksListas = document.getElementById('proceduralTasks'); 
const novoTextoTask = document.getElementById('newTaskInput');  
let tasks = [];  

function addNovaTask() {   
    const novaTaskObj = {name: novoTextoTask.value, status: false};   
    const atualIndex = tasks.push(novaTaskObj) - 1;   
    localStorage.setItem(`task-${atualIndex}`, JSON.stringify(novaTaskObj));   
    localStorage.setItem('lastIndex', atualIndex);
    criarTask(atualIndex, novaTaskObj.name, novaTaskObj.status); 
}  

function updateTask(index, taskName, status) {   
    tasks[index].name = taskName;
    tasks[index].status = status;   
    localStorage.setItem(`task-${index}`, JSON.stringify(tasks[index])); 
}  

function deleteTask(index) {   
    tasks[index] = undefined;   
    localStorage.removeItem(`task-${index}`); 
}  

function criarTask(index, taskName, status) {   
    const newTask = document.createElement('div');   
    newTask.id = `task-${index}`;   
    newTask.classList.add('task');

    const text = document.createElement('h2');   
    text.innerText = taskName;   
    text.classList.add('taskName'); 
    text.classList.toggle('finished', status);   
    newTask.appendChild(text);    

    const editContainer = document.createElement('div');   
    editContainer.classList.add('editPanel');   
    editContainer.style.display = 'none';   

    const editInput = document.createElement('input');   
    editInput.type = 'text';   
    editInput.placeholder = taskName;   
    editContainer.appendChild(editInput);  

    const editButton = document.createElement('button');  
    editButton.innerText = 'Editar';  

    editButton.onclick = () => {    
        editInput.placeholder = text.innerText;     
        editInput.value = '';     
        editContainer.style.display = 'flex';   
    }   

    newTask.appendChild(editButton);      
    
    const confirmEditButton = document.createElement('button');   
    confirmEditButton.innerText = 'Editar';  
    confirmEditButton.onclick = () => {     
        text.innerText = editInput.value;     
        updateTask(index, editInput.value, tasks[index].status);     
        editContainer.style.display = 'none';   
    }   
    
    editContainer.appendChild(confirmEditButton);   
    newTask.appendChild(editContainer);    
    const deleteButton = document.createElement('button');   
    deleteButton.innerText = 'delete';   
    deleteButton.onclick = () => {     
        deleteTask(index);    
        newTask.remove();   
    }   
    newTask.appendChild(deleteButton);    

    const checkButton = document.createElement('button');   
    checkButton.innerText = status ? 'desconcluir' : 'concluir';   
    checkButton.onclick = () => {     
        if (text.classList.contains('finished')) {       
            text.classList.remove('finished');       
            checkButton.innerText = 'concluir';       
            updateTask(index, tasks[index].name, false);     
        } 
        else {       
            text.classList.add('finished');       
            checkButton.innerText = 'desconcluir';      
            updateTask(index, tasks[index].name, true);     
        }  
    }   
    
    newTask.appendChild(checkButton);    
    tasksListas.appendChild(newTask); 
}  

// inicializar do localstorage 

const size = localStorage.getItem('lastIndex'); 
if (size !== undefined) {   
    for (let i = 0; i <= size; i++) {     
        const taskItem = localStorage.getItem(`task-${i}`);     
        if (!taskItem) 
            continue;     
        const obj = JSON.parse(taskItem);     
        tasks[i] = obj;     
        criarTask(i, obj.name, obj.status);   
    } 
}