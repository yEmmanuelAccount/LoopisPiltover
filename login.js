function logar(){
    // variáveis
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    // verifica o login e a senha
    if(login == "adm@gmail.com" && senha == "adm"){
        alert('Login efetuado com sucesso!');
        location.href = "todo.html"; 
    }
    else{
        alert('Algo está errado. Tente novamente.');
    }
}