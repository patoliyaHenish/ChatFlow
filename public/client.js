const socket = io();

let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector(".message__area");

let namef;
do {
    namef = prompt("Please enter you name: ");
} while (!namef);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
});

function sendMessage(message) {
    let msg = {
        user: namef,
        message: message.trim()
    }

    // Append
    appendmessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    //Send to server
    socket.emit('message', msg)
}

function appendmessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markUp;

    messageArea.appendChild(mainDiv)
}

//receive message

socket.on('message', (message) => {
    appendmessage(message, 'incoming');
    scrollToBottom();   
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}