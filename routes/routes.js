var ledService = require("../services/ledService.js");

var appRouter = function(app, service) {
  this.service = service;

  app.get("/status", function(req, res) {
      res.send("up");
  }); 

  app.get("/led", function(req, res) {
    if(req.query.name)
    {
      service.getState(req.query.name, req.query.state, function(err, value) {
	      if (!err) {
	        res.send(value ? "on" : "off")
          } else {
              res.send("ERROR (led: " + req.query.name + ", state: " + req.query.state + "): " + err)
          }
      });
    } else
    {
      res.send("ERROR: no name");
    }
  });

  app.put("/led", function(req, res) {
    if(req.query.name && req.query.state)
    {
      service.setState(req.query.name, req.query.state == "on" ? true : false, function(err) {
        if (!err) {
          service.getState(req.query.name, req.query.state, function(err, value) {
            if (!err)
              res.send(value ? "on" : "off")
            else
              res.send("ERROR (led: " + req.query.name + ", state: " + req.query.state + "): " + err)
          });
        } else
          res.send("ERROR (led: " + req.query.name + ", state: " + req.query.state + "): " + err)
      });
    } else
    {
      res.send("ERROE: no led name and/or state query param");
    }
  });

}
 
module.exports = appRouter;
