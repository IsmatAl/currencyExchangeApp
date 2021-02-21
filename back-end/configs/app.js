const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

module.exports = function () {
  let server = express(),
    create,
    start;

  create = (config, db) => {
    let routes = require('../routes');
    // set the server
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    // adding middlewares
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
      extended: false
    }));

    //connect database
    mongoose.connect(
      db.database,
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    );

    // Seting up the routes
    routes.init(server);
  };


  start = () => {
    let hostname = server.get('hostname'),
      port = server.get('port');
    server.listen(port, function () {
      console.log('Express server listening on - http://' + hostname + ':' + port);
    });
  };
  return {
    create: create,
    start: start
  };
};