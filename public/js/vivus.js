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
