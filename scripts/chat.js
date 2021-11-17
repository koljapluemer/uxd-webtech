// ------------------- //
// CONFIG STUFF, PLEASE PASTE:
// after this, you have conf.server, conf.id and conf.token
// use like this (ex.): `${conf.server}/chat/` instead of hard-coding the values 
let conf = {}
import('./config/config.js').then(module => {
    conf = module.val();
  });
// ------------------- //

chat = document.getElementById('chat-wrapper')
msgSend = document.getElementById('msg-send')
msgInput = document.getElementById('msg-input')

function sendMessage() {

    msg = msgInput.value
    msgInput.value = ''
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
            console.log("done...");
        }
    };
    xmlhttp.open("POST", `${conf.server}/chat/${conf.id}/message`, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    // Add token, e. g., from Tom
    xmlhttp.setRequestHeader('Authorization', `Bearer ${conf.token}`);
    // Create request data with message and receiver
    let data = {
        message: msg,
        to: "Jerry"
    };
    let jsonString = JSON.stringify(data); // Serialize as JSON
    xmlhttp.send(jsonString);
}

function loadChat() {
    console.log('loading chat...')
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);
            console.log(data);

            chat.innerHTML = ''

            previousName = ''
            for (message of data) {
                msg = document.createElement('p')
                msg.className = 'message'
                info = document.createElement('div')
                n = document.createElement('span')
                t = document.createElement('span')
                n.className = 'name'
                n.innerHTML = message.from
                t.className = 'time'
                t.innerHTML = new Date(message.time).toLocaleDateString("en-US")
                info.appendChild(n)
                info.appendChild(t)
                 // dont duplicate name when one of the members spam messages
                 if (message.from !== previousName) {
                     msg.appendChild(info)
                }
                c = document.createElement('content')
                c.className = 'content'
                c.innerHTML = message.msg
               
                msg.appendChild(c)

                chat.appendChild(msg)
                previousName = message.from
            }

            chat.scrollTo(0,chat.scrollHeight)
        }
    };
    xmlhttp.open("GET", `${conf.server}/chat/${conf.id}/message/Jerry`, true);
    // Add token, e. g., from Tom
    xmlhttp.setRequestHeader('Authorization', `Bearer ${conf.token}`);
    xmlhttp.send();
}


window.setInterval(function() {
    loadChat()
}, 5000);


msgSend.addEventListener(
    'click',
    sendMessage,
    false
  );