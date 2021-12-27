new Vivus(
  "car",
  {
    start: "autostart",
    type: "delayed",
    duration: 300,
    animTimingFunction: Vivus.EASE,
  },
  function (car) {
    setTimeout(function () {
      car.reset().play();
    }, 3000);
  }
);

var logo = new Vivus(
  "text",
  {
    start: "autostart",
    type: "delayed",
    duration: 300,
    animTimingFunction: Vivus.EASE,
  },
  function (logo) {
    var fill = document.getElementsByClassName("cls-1");
    for (let i = 0; i < fill.length; i++) {
      fill[i].style.fill = "#ffd05b";
    }
    setTimeout(function () {
      for (let i = 0; i < fill.length; i++) {
        fill[i].style.fill = "none";
      }
      logo.reset().play();
    }, 5000);
  }
);
