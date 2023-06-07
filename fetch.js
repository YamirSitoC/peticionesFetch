'use strict';

// Fetch(ajax) y peticiones o servicios/rest full(api rest)
// https://jsonplaceholder.typicode.com/users

var divUsuarios = document.querySelector("#usuarios");
var divJaneth = document.querySelector("#Janet");
var divProfesor = document.querySelector("#profesor");
// var usuarios = [];
//fetch('https://reqres.in/api/users')


    getUsuarios()
    .then(data => data.json())
    
    /*.then(function (data){
        return data.json()
    })*/

    .then(users => {
        //usuarios = users.data;
        //console.log(usuarios);
        /*Fetch accede a datos remotos
        despues lo formatea los datos de tipo JSON*/

        listadoUsuarios(users.data);

        //return getJanet();
        return getInfo();
        //.then(): es una promesa que se utiliza para gestionar tareas asincronicas
    })
    .then(data =>{
        //console.log(data);
        divProfesor.innerHTML = data;
        return getJanet();
    })
    .then(data => data.json())
    .then(user => {
        mostrarJanet(user.data);
        //return getInfo();
    })
    .catch(eror =>{
        //console.log(eror);
        alert('Error en las peticiones');
    });

    /*
    Las promesas se utilizan leer archivosl, enviar cosas por posts
    o recibir/enviar cosas por ajax
    */

function getUsuarios(){
    return fetch('https://reqres.in/api/users');
}

function getJanet(){
    return fetch('https://reqres.in/api/users/2');
}

function listadoUsuarios(usuarios){
    usuarios.map((user, i)=>{
        let nombre = document.createElement('h1');
        nombre.innerHTML = i + ' . ' + user.first_name + " " + user.last_name;

        divUsuarios.appendChild(nombre);
        document.querySelector("#loading").style.display = 'none';
    });
}

function getInfo(){
    var profesor = {
        nombre: 'Yamir',
        apellido: 'Castro',
        url: 'https://yamirsito.es'
    };

    return new Promise((resolve, reject)=>{
        var profesor_string = "";
        setTimeout(function(){
            profesor_string = JSON.stringify(profesor);
            if(typeof profesor_string != 'string' || profesor_string != '') 
            return reject('Error');
        }), 3000;

        /*setTimeout(function(){
            return resolve(profesor_string);
        }, 300);*/

    });
}

function mostrarJanet(user){

    console.log(user)

    let nombre = document.createElement('h4');
    let avatar = document.createElement('img');

    nombre.innerHTML = user.first_name + " " + user.last_name;
    avatar.src = user.avatar;
    avatar.width = '100px';
    //avatar.height = 'auto';

    divJaneth.appendChild(nombre);
    divJaneth.appendChild(avatar);
    document.querySelector("#Janet .loading").style.display = 'none';
}
   