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

new Vivus(
  "text",
  {
    start: "autostart",
    type: "delayed",
    duration: 1000,
    animTimingFunction: Vivus.EASE,
  },
  function (logo) {
    setTimeout(function () {
      logo.reset().play();
    }, 3000);
  }
);
