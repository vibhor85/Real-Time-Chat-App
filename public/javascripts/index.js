const socket = io(`http://localhost:3000/`);
const msg_area = document.querySelector("#msg_area");

const name = prompt("Enter your name");
if (name != null) {
  appendMessage(`Welcome ${name}`);
  socket.emit("New User Joined", name);
}
socket.on("user joined", (user) => {
  console.log(`${user} Joined`);
  appendMessage(`${user} Joined`);
});

const send = document.querySelector("#form");

send.addEventListener("click", (event) => {
  event.preventDefault();
  const msg = document.querySelector("#msg");
  if (msg.value) {
    console.log(`ME:${msg.value}`);
    appendMessage(`ME:${msg.value}`);
    socket.emit("message", msg.value);
    send.reset();
  }
});

socket.on("new message", (username, msg) => {
  console.log(`${username}:${msg}`);
  appendMessage(`${username}:${msg}`);
});

socket.on("disconnect", () => {
  socket.emit("user-disconnected", user);
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  msg_area.append(messageElement);
}
