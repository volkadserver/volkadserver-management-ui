import React from "react";
import Router from "react-router";
import OrderActionCreators from "../actions/orderActionCreators";
import CreateButton from "./createButton.jsx";

class CreateFlight extends React.Component {
  constructor() {
    super();

    this.state = { flightName: '' };
  }

  onSaveSuccess(flight) {
    if(typeof this.props.onSaveSuccess === 'function')
      this.props.onSaveSuccess(flight);
  }

  submitFlight() {
    OrderActionCreators.createFlight(
      this.state,
      this.props.orderId || this.props.id,
      {
        pending: () => this.setState({ status: 'pending' }),
        error: (err) => this.setState({ status: 'error' }),
        success: (flight) => {
          this.setState({ status: 'success', saved: true });
          this.onSaveSuccess(flight);
        }
      }
    );
  }

  onChange(val, e) {
    let change = {};
    change[val] = e.target.value;
    this.setState(change);
  }

  render() {
    return <div className="row">
        <form className="form-horizontal col-sm-12">
          <div className="row">
            <h3 className="col-sm-offset-2 col-sm-6">Add new flight</h3>
          </div>
          <div className="form-group">
            <label form="newFlightBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newFlightName" 
                placeholder="New Flight Name" 
                value={this.state.flightName} 
                onChange={this.onChange.bind(this, 'flightName')} />
            </div>
            <p className="col-sm-4">
              This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
            </p>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Start</label>
            <div className="col-sm-3">
              <input type="date"
                className="form-control"
                value={this.state.startDate} 
                onChange={this.onChange.bind(this, 'startDate')} />
            </div>
            <div className="col-sm-3">
              <input type="time"
                className="form-control"
                value={this.state.startTime} 
                onChange={this.onChange.bind(this, 'startTime')} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">End</label>
            <div className="col-sm-3">
              <input type="date"
                className="form-control"
                value={this.state.endDate} 
                onChange={this.onChange.bind(this, 'endDate')} />
            </div>
            <div className="col-sm-3">
              <input type="time"
                className="form-control"
                value={this.state.endTime} 
                onChange={this.onChange.bind(this, 'endTime')} />
            </div>
          </div>
          <div className="form-group">
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <CreateButton 
                  onSubmit={this.submitFlight.bind(this)} 
                  status={this.state.status} />
              </div>
            </div>
          </div>
        </form>
      </div>
  }
}

export default CreateFlight;
