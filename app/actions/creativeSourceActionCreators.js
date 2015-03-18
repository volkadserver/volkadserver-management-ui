var marty = require('marty')
var creativeConstants = require('../constants/creativeConstants.js');

var creativeSourceActionCreators = marty.createActionCreators({
  receiveCreatives: creativeConstants.RECEIVE_CREATIVES(function(creatives) {
    this.dispatch(creatives);
  }),

  receiveCreatives: creativeConstants.RECEIVE_CREATIVES(function(creatives) {
    this.dispatch(creatives);
  })
});

module.exports = creativeSourceActionCreators;
