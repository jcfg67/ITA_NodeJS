const messageContainer = document.getElementById('messages');
const userContainer = document.getElementById('userlist');
const messageForm = document.getElementById('send_container');
const messageInput = document.getElementById('message_input');
const roomsContainer = document.getElementById('roomsList');
const roomForm = document.getElementById('new_room');
const roomInput = document.getElementById('room_input');
const activeRoom = document.getElementById('active_room');
const roomName = document.getElementById('room_name');

const socket = io();
socket.emit('newUser', currentRoom, username);
activeRoom.innerText=currentRoom;
roomName.innerText=`${currentRoom} - [${username}]`;

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);     // To improve: Re-connections between client and server
    window.location = '/'
});

socket.on('userConnected', name => {
    appendMessage(`${name} connected`)
});

socket.on('chatMessage', data => {
    appendMessage(`${data}`)
});

socket.on('roomUsers', users => {
    outputUsers(users)
});

socket.on('chatRooms', rooms => {
    outputRooms(rooms)
});

socket.on('roomMessages', messages => {
    outputMessages(messages)
});

socket.on('roomCreated', newRoom => {
    const oldRoom = currentRoom;
    currentRoom = newRoom;
    activeRoom.innerText=currentRoom;
    roomName.innerText=`${currentRoom} - [${username}]`;
    socket.emit('changeRoom', currentRoom, username, oldRoom);
})

socket.on('userDisconnected', name => {
    appendMessage(`${name} disconnected`)
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('sentChatMessage', currentRoom, username, message);
    messageInput.value = ''
});

roomForm.addEventListener('submit', e => {
    e.preventDefault();
    const newRoom = roomInput.value;
    if (newRoom === currentRoom) {
        roomInput.value = '';
        return
    }
    socket.emit('newRoom', newRoom);
    roomInput.value = ''
});

document.getElementById('leave_button').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) window.location = '/'
});

const appendMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}

const outputUsers = users => {
    const roomUsers = users.filter(user => user.room == currentRoom);
    userContainer.innerHTML="";
    roomUsers.forEach((user) => {
        const userElement = document.createElement('div');
        userElement.innerText = user.name;
        userContainer.appendChild(userElement);
    });
}

const outputRooms = rooms => {
    roomsContainer.innerHTML="";
    rooms.forEach((room) => {
        const roomElement = document.createElement('div');
        roomElement.innerText = room.name;
        roomsContainer.appendChild(roomElement);
    });
}

const outputMessages = messages => {
    messageContainer.innerHTML="";
    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.innerText = message.content;
        messageContainer.appendChild(messageElement);
    });
}
