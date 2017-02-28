var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var gpio = require("rpi-gpio");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000, function () {

  var leds = {
      blue: 8,
      yellow: 10,
      red: 16
  }

  var ledService = require("./services/ledService.js");
  var service = new ledService(gpio, leds);
  app.routes = new routes(app, service);

  service.setup(function() {
        console.log("Listening on port %s...", server.address().port);
  });

});
