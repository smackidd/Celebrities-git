const chatForm = document.getElementById('chat-form');
const chat = document.querySelector('.chat');
const socket = io();

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //scroll to bottom for each msg
    chat.scrollTop = chat.scrollHeight;
}); 

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    // emitting message to the server
    socket.emit('chatMessage', msg);

    //clear inputs
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"><strong>${message.username}</strong><span> ${message.time} </span></p>
    <p class="msgText">
        ${message.text}
    </p>`;
    document.querySelector('.chat').appendChild(div);
}