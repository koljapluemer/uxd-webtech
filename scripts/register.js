// ------------------- //
// CONFIG STUFF, PLEASE PASTE:
// after this, you have conf.server, conf.id and conf.token
// use like this (ex.): `${conf.server}/chat/` instead of hard-coding the values
let conf = {}
import('./config/config.js').then(module => {
    conf = module.val();
});
// ------------------- //

let msg = document.getElementById('msg');
let input1 = document.getElementById('username');
let input2 = document.getElementById('password');
let input3 = document.getElementById('password-conf');

function checkIfNameExists(name) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `${conf.server}/chat/${conf.id}/user/${name}`, false);
    xmlhttp.send();
    if (xmlhttp.status === 404) {
        console.log('does not exist')
        return false
    } else {
        console.log('does exist')
        return true
    }
}

document.getElementById('checkSubmission').onsubmit = function (evt) {

    input1.style.border = "1px solid green";
    input2.style.border = "1px solid green";
    input3.style.border = "1px solid green";
    msg.innerHTML = ''

    isValid = true



    if (input1.value.length < 3) {
        msg.innerHTML += '»Name« bitte ausfüllen <br>'
        input1.style.border = "1px solid red";
        isValid = false
    }
    if (input2.value.length < 8) {
        msg.innerHTML += 'Passwort muss mind. 8 Zeichen haben <br>'
        input2.style.border = "1px solid red";
        isValid = false

    }
    if (input2.value != input3.value) {
        msg.innerHTML += 'Passworter stimmen nicht überein <br>'
        input3.style.border = "1px solid red";
        isValid = false

    }

    if (checkIfNameExists(input1.value)) {
        msg.innerHTML += 'Name existiert schon'
        input1.style.border = "1px solid red";
        isValid = false

    }

    if (isValid) {
        msg.innerHTML = 'Registrierung erfolgreich'
    } else {
        evt.preventDefault();
    }

}
