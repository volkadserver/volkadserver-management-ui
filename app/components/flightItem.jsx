import React from "react";
import {Link} from "react-router";

class FlightItem extends React.Component {
  render() {
    return <tr>
        <td>{this.props.id}</td>
        <td><strong>Active</strong></td>
        <td><Link to="flight" params={this.props}>{this.props.flightName}</Link></td>
        <td>
          <span className="glyphicon glyphicon-edit pull-right"></span>
        </td>
      </tr>
  }
}

export default FlightItem;
