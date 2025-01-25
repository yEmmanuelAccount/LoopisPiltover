const tasksListas = document.getElementById('proceduralTasks'); 
const novoTextoTask = document.getElementById('newTaskInput');  
const editContainer = document.getElementById('editContainer'); 
const editInput = document.getElementById('editInput'); 
const confirmEditButton = document.getElementById('confirmEditButton'); 
let tasks = [];  

function addNovaTask() {   
    if (!novoTextoTask.value.trim()) { // Verifica se o input está vazio ou só tem espaços
        alert('Por favor, insira uma tarefa válida.');
        return;
    }
    const novaTaskObj = {name: novoTextoTask.value.substring(0, 100), status: false}; // Limita a 100 caracteres
    const atualIndex = tasks.push(novaTaskObj) - 1;   
    localStorage.setItem(`task-${atualIndex}`, JSON.stringify(novaTaskObj));   
    localStorage.setItem('lastIndex', atualIndex);
    criarTask(atualIndex, novaTaskObj.name, novaTaskObj.status); 
    novoTextoTask.value = ''; // Limpa o input após adicionar a tarefa
}  

// Permite adicionar tarefa pressionando Enter
novoTextoTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNovaTask();
    }
});

function updateTask(index, taskName, status) {   
    tasks[index].name = taskName.substring(0, 100); // Limita a 100 caracteres
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

    const editButton = document.createElement('button');  
    editButton.classList.add('edit-icon'); // Adicionado ícone de edição
    editButton.onclick = () => {    
        editInput.placeholder = text.innerText;     
        editInput.value = text.innerText;     
        editContainer.style.display = 'flex';   
        editInput.style.width = `${Math.max(text.offsetWidth, 300)}px`; // Tamanho inicial igual ao texto ou tamanho mínimo de 300px
        editContainer.style.top = '50%';
        editContainer.style.left = '50%';
        editContainer.style.transform = 'translate(-50%, -50%)';

        confirmEditButton.onclick = () => {     
            const trimmedValue = editInput.value.substring(0, 100); // Limita a 100 caracteres
            if (!trimmedValue.trim()) { // Verifica se o input está vazio ou só tem espaços
                alert('O campo de edição não pode estar vazio.');
                return;
            }
            text.innerText = trimmedValue;     
            updateTask(index, trimmedValue, tasks[index].status);     
            editContainer.style.display = 'none';   
        };
    };   

    newTask.appendChild(editButton);      

    const deleteButton = document.createElement('button');   
    deleteButton.classList.add('close-icon'); // Adicionado ícone de exclusão
    deleteButton.onclick = () => {     
        deleteTask(index);    
        newTask.remove();   
    };   
    newTask.appendChild(deleteButton);    

    const checkButton = document.createElement('button');   
    checkButton.classList.add('confirm-icon'); // Ícone único
    checkButton.onclick = () => {   
        text.classList.toggle('finished');
        updateTask(index, tasks[index].name, text.classList.contains('finished'));
    };   
    
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
