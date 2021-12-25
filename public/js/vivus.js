new Vivus(
  "canvas",
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
    type: "delayed",
    duration: 1000,
    animTimingFunction: Vivus.EASE,
    start: "autostart",
  },
  function (obj) {
    logo.reset().play();
  }
);
