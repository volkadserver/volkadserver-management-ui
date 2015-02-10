var marty = require('marty')
var advertiserConstants = require('../constants/advertiserConstants.js');

var advertiserSourceActionCreators = marty.createActionCreators({
  receiveAdvertisers: advertiserConstants.RECEIVE_ADVERTISERS(function(advertisers) {
    this.dispatch(advertisers);
  })
});

module.exports = advertiserSourceActionCreators;
