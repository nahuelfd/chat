let socket = io()
let user = ''
let chatBox = document.getElementById('chatbox')

Swal.fire({
    title: 'identification',
    input: 'text',
    text: 'Set username for the bianca chat',
    inputValidator: value => {
        return !value.trim() && 'please, write a username!'
    },
    allowsOutsideClick: false
}).then( result => {
    user = result.value
    document.getElementById('username').innerHTML = user
    socket = io()
})

chatBox.addEventListener('keyup', event => {
    if(event.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user,
                message: chatBox.value = ''
            })
        }
    }

})

//recibir mensajes
socket.on('logs', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''

    data.reverse().forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });

    divLog.innerHTML = messages
})