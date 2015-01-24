var EventEmitter = require('events').EventEmitter;
var util = require('util');
var swagger = require('swagger-client');

var Client = function Client() {
  this.initializing = false;
  this.ready = false;
}

util.inherits(Client, EventEmitter);

Client.prototype.initialize = function() {
  this.initializing = true;
  this.swaggerClient = new swagger.SwaggerApi({ 
    url: 'http://localhost:8081/explorer/resources',
    success: (function(swaggerClient) {
      this.ready = true;
      this.initializing = false;
      setTimeout((function() {
        this.emit('ready');
      }).bind(this), 2000);

      for (var attrname in this.swaggerClient.apis)
        this[attrname] = this.swaggerClient.apis[attrname]
    }).bind(this)
  });

  return this;
}

exports = module.exports = new Client();
