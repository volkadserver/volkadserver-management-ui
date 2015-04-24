import React from "react/addons";
import _ from "lodash";
import OrderForm from "./orderForm.jsx";
import OrderActionCreators from "../actions/orderActionCreators";
import CreateFlight from "./createFlight.jsx";

class CreateOrder extends React.Component {
  constructor() {
    super();

    this.state = { status: 'waiting', order: {} };
  }

  handleSubmit() {
    OrderActionCreators.createOrder(
      this.state.order,
      {
        pending: () => this.setState({ status: 'pending' }),
        error: () => this.setState({ status: 'error' }),
        success: (order) => this.setState({ order: order, status: 'success' })
      }
    );
  }

  handleChange(order) {
    order = React.addons.update(this.state.order, { $merge: order });
    this.setState({ order });
  }

  addFlight() {
    this.setState({ showFlightForm: true });
  }

  onSaveFlight(flight) { 
    this.setState({ showFlightForm: false }) 
  }

  render() {
    let flightForm, addFlights;

    if(this.state.status == 'success') {
      addFlights = (
        <button type="button" className="btn btn-info" onClick={this.addFlight.bind(this)}>
          <span className="glyphicon glyphicon-plus"></span> Flights
        </button>
      );
    }

    if(this.state.showFlightForm) {
      flightForm = <CreateFlight 
        onSaveSuccess={this.onSaveFlight.bind(this)} 
        orderId={this.state.order.id} />
    }

    return <div className="row">
      <OrderForm order={this.state.order} 
        buttonGroup={[ addFlights ]} 
        onChange={this.handleChange.bind(this)} 
        onSubmit={this.handleSubmit.bind(this)} />
        {flightForm}
      </div>
  }
}

export default CreateOrder;
