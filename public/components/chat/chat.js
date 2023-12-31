const socket = io();

socket.on('chatMessage', async function (text, details, user) {
  await appendChatMsg(user[0], text);
});

async function appendChatMsg(user, message) {
  const msgId = Math.floor(Math.random() * 1001);
  const messages = $('#chat-messages');
  const msgContainer = $('#chat-msg-container');
  msgContainer.append(`<p id="msg_${msgId}" class="chat-message">
      <strong>${user}</strong><br />
      <span>${message}</span>
    </p>`);

  const time = 1000 * 0;
  while (msgContainer.outerHeight() > messages.outerHeight()) {
    msgContainer.children(':first').fadeOut(time);
    await sleep(time);
    msgContainer.children(':first').remove();
  }

  $('#msg_' + msgId)
    .hide()
    .fadeIn(0);
}
