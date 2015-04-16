import React from "react";
import {Route} from "react-router";
import {DefaultRoute} from "react-router";
import App from "./components/app.jsx";
import reporting from "./components/reporting.jsx";
import inventory from "./components/inventory.jsx";
import trafficking from "./components/trafficking.jsx";
import orderIndex from "./components/orderIndex.jsx";
import advertiserIndex from "./components/advertiserIndex.jsx";
import createOrder from "./components/createOrder.jsx";
import createFlight from "./components/createFlight.jsx";
import createAdvertiser from "./components/createAdvertiser.jsx";
import order from "./components/order.jsx";
import flight from "./components/flight.jsx";
import advertiser from "./components/advertiser.jsx";
import editOrder from "./components/editOrder.jsx";

export default <Route handler={App}>
  <Route name="trafficking" handler={trafficking}>
    <DefaultRoute handler={orderIndex} />
    <Route name="order-index" path="orders" handler={orderIndex} />
    <Route name="create-order" path="orders/create" handler={createOrder} />
    <Route name="create-advertiser" 
      path="advertisers/create" handler={createAdvertiser} />
    <Route name="order" path="orders/:id" handler={order} />
    <Route name="advertiser" 
      path="advertisers/:advertiserId" handler={advertiser} />
    <Route name="flight" path="orders/:orderId/flights/:id" handler={flight} />
    <Route name="create-flight" 
      path="orders/:id/create" handler={createFlight} />
    <Route name="advertiser-index" 
      path="advertisers" handler={advertiserIndex} />

    <Route name="editOrder" path="orders/:id/edit" handler={editOrder} />
  </Route>
  <Route name="reporting" handler={reporting} />
  <Route name="inventory" handler={inventory} />
</Route>;
