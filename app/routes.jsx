/** @jsx React.DOM */

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var App = require('./components/app.jsx'),
    reporting = require('./components/reporting.jsx'),
    inventory = require('./components/inventory.jsx'),
    trafficking = require('./components/trafficking.jsx'),

    orderIndex = require('./components/orderIndex.jsx'),
    advertiserIndex = require('./components/advertiserIndex.jsx'),

    createOrder = require('./components/createOrder.jsx'),
    createFlight = require('./components/createFlight.jsx'),
    createAdvertiser = require('./components/createAdvertiser.jsx'),

    order = require('./components/order.jsx'),
    flight = require('./components/flight.jsx'),
    advertiser = require('./components/advertiser.jsx'),
    
    editOrder = require('./components/editOrder.jsx');

module.exports = (
  <Route handler={App}>
    <Route name="trafficking" handler={trafficking}>
      <DefaultRoute handler={orderIndex} />
      <Route name="order-index" path="orders" handler={orderIndex} />
      <Route name="create-order" path="orders/create" handler={createOrder} />
      <Route name="create-advertiser" 
        path="advertisers/create" handler={createAdvertiser} />
      <Route name="order" path="orders/:id" handler={order} />
      <Route name="advertiser" 
        path="advertisers/:advertiserId" handler={advertiser} />
      <Route name="flight" path="orders/:orderID/flights/:id" handler={flight} />
      <Route name="create-flight" 
        path="orders/:id/create" handler={createFlight} />
      <Route name="advertiser-index" 
        path="advertisers" handler={advertiserIndex} />

      <Route name="editOrder" path="orders/:id/edit" handler={editOrder} />
    </Route>
    <Route name="reporting" handler={reporting} />
    <Route name="inventory" handler={inventory} />
  </Route>
);
