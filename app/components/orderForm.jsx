import React from "react";
import {Link} from "react-router";
import Autocomplete from "./autocomplete.jsx";
import advertiserStore from "../stores/advertiserStore";
import CreateButton from "./createButton.jsx";
import CreateAdvertiser from "./createAdvertiser.jsx";

export default React.createClass({

  getInitialState: function() {
    return {
      order: this.props.order
    }
  },

  getDefaultProps: function() {
    return {
      mode: 'create',
      order: {
        orderName: '',
        advertiserID: undefined
      },
      onSubmit: function() {
      }
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var shouldRender = nextProps.order != nextState.order || nextState != this.state;
    return shouldRender;
  },

  handleChange: function(val, e) {
    var change = {};
    change[val] = e.target ? e.target.value : e.id; // e might be value already
    this.props.onChange(change);
  },

  addAdvertiser: function() {
    this.setState({ showAdvertiserForm: true});
  },

  onSelectAdvertiser: function(advertiser) {
    this.setState({ advertiser: advertiser });

    console.log(this.state);
  },

  onSaveAdvertiser: function(advertiser) {
    this.setState({ advertiser: advertiser, showAdvertiserForm: false });
    this.refs.advertiserAutocomplete.setOption(advertiser);
  },

  render: function() { 
    var buttonClass, buttonGlyph,
        buttonSuffix, advertiserForm, goToOrder;

    if(this.state.status == 'success') {
      goToOrder = <Link to="order" 
        params={{ id: this.state.id }} 
        className="btn btn-link">
          Go to Order
        </Link>;
    }

    if(this.state.showAdvertiserForm) 
      advertiserForm = <CreateAdvertiser onSaveSuccess={this.onSaveAdvertiser} />

    return <form className="form-horizontal col-sm-12">
      <div className="row">
        <h3 className="col-sm-offset-2 col-sm-6">Add new order</h3>
      </div>
      <fieldset disabled={this.state.status == 'success' ? true : false} >
        <div className="form-group">
          <label form="newOrderBasics" className="control-label col-sm-2">Name</label>
          <div className="col-sm-6">
            <input type="text" 
              className="form-control" id="newOrderName" 
              placeholder="New Order Name" 
              value={this.props.order.orderName} onChange={this.handleChange.bind(this, 'orderName')} />
          </div>
          <p className="col-sm-4">
            This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
          </p>
        </div>
        <div className="form-group">
          <label form="newOrderAdvertiser" className="control-label col-sm-2">Advertiser</label>
          <div className="col-sm-6">
            <div className="input-group">
              <Autocomplete 
                ref="advertiserAutocomplete" 
                value={this.props.order.advertiser}
                valueLabel="advertiserName"
                onSelect={this.handleChange.bind(this, 'advertiser')}
                options={advertiserStore.state.advertisers} />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.addAdvertiser}>Add Advertiser</button>
              </span>
            </div>
          </div>
          <p className="col-sm-4">
            All flights in this order are associated with a single buyer.
          </p>
        </div>
        {advertiserForm}
      </fieldset>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-6">
          <div className="btn-group">
            <CreateButton 
              onSubmit={this.props.onSubmit} 
              status={this.state.status} />
            { this.props.buttonGroup }
          </div>
          {goToOrder}
        </div>
      </div>
    </form>
  }
});
