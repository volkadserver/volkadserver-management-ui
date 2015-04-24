import React from "react";
import _ from "lodash";
import {Link} from "react-router";
import Marty from "marty";
import OrderStore from "../stores/orderStore.js";

class IndexItem extends React.Component {
  render() {
    return <tr>
        <td>{this.props.id}</td>
        <td><strong>Active</strong></td>
        <td><Link to="order" params={this.props}>{this.props.orderName}</Link></td>
        <td>
          <span className="glyphicon glyphicon-edit pull-right"></span>
        </td>
      </tr>  
  }
}

class OrderIndex extends React.Component {
  render() {
    var indexItems =  _.map(this.props.orders, function(order, i) {
          if(typeof order.id !== 'undefined')
            return <IndexItem {...order} key={i} />;
        });

    return <div className="row">
        <table className="table table-hover table-condensed">
          <thead>
            <th>Remaining Flights</th>
            <th>Status</th>
            <th>Name</th>
            <th></th>
          </thead>
          <tbody>
            {indexItems}
          </tbody>
        </table>
      </div>
  }
}

export default Marty.createContainer(OrderIndex, {
  listenTo: OrderStore,

  fetch: {
    orders() {
      return OrderStore.for(this).getOrders();
    }
  },
  failed(err) {
    return <div>{err}</div>
  },
  pending() {
    return this.done({ orders: {} });
  }
});
