import React from "react";
import Router from "react-router";
import AdvertiserActionCreators from "../actions/advertiserActionCreators";
import CreateButton from "./createButton.jsx";

class CreateAdvertiser extends React.Component {
  constructor() {
    super();

    this.state = { advertiserName: '' }
  }

  onSaveSuccess() {
    if(typeof this.props.onSaveSuccess === 'function')
      this.props.onSaveSuccess(this.state);
    this.setState({ status: 'success' });
  }

  submitAdvertiser() {
    this.setState({ status: 'pending' });
    AdvertiserActionCreators.createAdvertiser(this.state)
      .then(() => this.onSaveSuccess());
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
            <h3 className="col-sm-offset-2 col-sm-6">Add new advertiser</h3>
          </div>
          <div className="form-group">
            <label form="newAdvertiserBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newAdvertiserName" 
                placeholder="New Advertiser Name" 
                value={this.state.advertiserName} 
                onChange={this.onChange.bind(this, 'advertiserName')} />
            </div>
            <p className="col-sm-4">
              This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
            </p>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <CreateButton 
                  onSubmit={this.submitAdvertiser.bind(this)} 
                  status={this.state.status} />
              </div>
            </div>
          </div>
        </form>
      </div>
  }
}

export default CreateAdvertiser;
