function logar(){
    // variáveis
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if(login == "adm" && senha == "adm"){
        alert('Login efetuado com sucesso!');
        location.href = "home.html"; 
    }
    else{
        alert('Algo está errado. Tente novamente.');
    }
}
