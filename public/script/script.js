function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

$(function () {
  const uhoh = new Sound("./sound-effects/icq-message.wav");
  const socket = io();

  $("#send").on("click", function () {
    socket.emit("chat message", $("#m").val());
    $("#m").val("");
    return false;
  });

  $(document).on('keydown', function (event) {
    if (event.keyCode === 13) {
      socket.emit("chat message", $("#m").val());
      $("#m").val("");
      return false;
    }
  })



  socket.on("chat message", function (msg) {
    $("#messages").append($("<li>").text(msg));
    uhoh.play();
  });
});


$(() => {
  $(document).on('keydown', function (event) {
    if (event.keyCode === 13) {

    }
  })
})