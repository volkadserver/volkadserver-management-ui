var React = require('react');
var marty = require('marty');
var Router = require('react-router');

var orderStore = require('../stores/orderStore');

var orderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState: function() {
    return {
      order: orderStore.getOrder(this.getParams().id)
    };
  }
});

module.exports = React.createClass({
  mixins: [orderStateMixin, Router.State],

  render: function() {
    return <div className="row">
      Edit an order
    </div>
  }

});
