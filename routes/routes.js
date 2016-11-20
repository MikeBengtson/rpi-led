var appRouter = function(app) {
  app.get("/status", function(req, res) {
      res.send("up");
  }); 

  app.put("/led", function(req, res) {
    if(req.query.id && req.query.state) 
    { 
        app.gpio.write(req.query.id, req.query.state=="on", function(err) {
          if (!err) {
      			app.gpio.read(req.query.id, function(err, value) { 
							res.send(value ? "on" : "off")
      			});
          } else {
             res.send("ERROR (led: " + req.query.id + ", state: " + req.query.state + "): " + err)
          };
        });
    } else
    {
      res.send("error: no led and/or state query param");
    }
  }); 

  app.get("/led", function(req, res) {
    if(req.query.id)
    { 
      app.gpio.read(req.query.id, function(err, value) { 
	      res.send(value ? "on" : "off")
      });
    } else
    {
      res.send("error: no led and/or state query param");
    }
  }); 
}
 
module.exports = appRouter;
