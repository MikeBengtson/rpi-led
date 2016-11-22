var async = require("async");

var ledService = function(gpio, leds) {
  this.gpio=gpio;
  this.leds=leds;
}

ledService.prototype = {
  constructor: ledService,

  setup: function(callback) {

    function setupPin(task, callback) {
      task.service.gpio.setup(task.pin, task.service.gpio.DIR_OUT, callback)
    }

    var queue = new async.queue(setupPin, 5);

    for (led in this.leds) {
      queue.push({pin: this.leds[led], service: this}, function (err) {
        if (err)
          console.log(err);
      });
    }

    queue.drain = callback;
  },

  setState: function(name, state, callback) {
    this.gpio.write(this.leds[name], state, callback);
  },

  getState: function(name, state, callback) {
    this.gpio.read(this.leds[name], callback);
  }
}

module.exports = ledService;