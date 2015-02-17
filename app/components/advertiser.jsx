/** @jsx React.DOM */

var React = require('react');
var marty = require('marty');
var orderStore = require('../stores/orderStore');
var advertiserStore = require('../stores/advertiserStore');
var routerState = require('react-router').State;
var Link = require('react-router').Link;
var _ = require('lodash');

var orderStateMixin = marty.createStateMixin({
  listenTo: advertiserStore,
  getState: function() {
    return advertiserStore.getAdvertiser(this.getParams().advertiserId)
  }
});

module.exports = React.createClass({
  mixins: [ routerState, orderStateMixin ],
  
  render: function() {

    return this.state.when({
      pending: function() { return <div className="row">Pending</div> },
      failed: function(err) { return <div className="row">{err}</div> },
      done: function(advertiser) {
        return <div className="row">
          <div className="page-header">
            <h1>
              {advertiser.name + ' '}
              <small>
                Advertiser
              </small>
            </h1>
          </div>
        </div>
      }
    });
  }
});
