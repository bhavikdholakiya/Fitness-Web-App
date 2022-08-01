function send() {
  const socket = io();
  const message = document.getElementById("chatInput").value;
  socket.emit("message", { message, id });
  document.getElementById("chatInput").value = "";
}

function load() {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);

        })
}
