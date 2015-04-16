import React from "react";
import marty from "marty";
import Router from "react-router";
import orderStore from "../stores/orderStore";

var orderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState() {
    return {
      order: orderStore.getOrder(this.getParams().id)
    };
  }
});

export default React.createClass({
  mixins: [orderStateMixin, Router.State],

  render: function() {
    return <div className="row">
      Edit an order
    </div>
  }

});
