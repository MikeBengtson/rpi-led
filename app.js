var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var routes = require("./routes/routes.js")(app);
 
var server = app.listen(3000, function () {

  app.gpio = require('rpi-gpio');

  app.gpio.setup(8, app.gpio.DIR_OUT, function() {
    app.gpio.setup(10, app.gpio.DIR_OUT, function() {
      app.gpio.setup(16, app.gpio.DIR_OUT, function() {

        console.log("Listening on port %s...", server.address().port);

      });
    });
  });
});
