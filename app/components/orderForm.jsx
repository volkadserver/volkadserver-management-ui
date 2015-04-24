import React from "react";
import Marty from "marty";
import {Link} from "react-router";
import Autocomplete from "./autocomplete.jsx";
import AdvertiserStore from "../stores/advertiserStore";
import CreateButton from "./createButton.jsx";
import CreateAdvertiser from "./createAdvertiser.jsx";

class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { order: props.order };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var shouldRender = nextProps != nextState || nextState != this.state;
    return shouldRender;
  }

  handleChange(val, e) {
    var change = { [val]: e.target ? e.target.value : e.id };
    this.props.onChange(change);
  }

  addAdvertiser() {
    this.setState({ showAdvertiserForm: true });
  }

  onSelectAdvertiser(advertiser) {
    this.setState({ advertiser });
  }

  onSaveAdvertiser(advertiser) {
    this.setState({ advertiser, showAdvertiserForm: false });
    this.refs.advertiserAutocomplete.setOption(advertiser);
  }

  render() {
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
      advertiserForm = <CreateAdvertiser onSaveSuccess={this.onSaveAdvertiser.bind(this)} />

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
                options={this.props.advertisers} />
              <span className="input-group-btn">
                <button 
                  className="btn btn-default" 
                  type="button" 
                  onClick={this.addAdvertiser.bind(this)}>
                    Add Advertiser
                  </button>
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
}

OrderForm.getDefaultProps = {
  mode: 'create',
  order: {
    orderName: '',
    advertiserID: undefined
  },
  onSubmit: function() {
  }
}

export default Marty.createContainer(OrderForm, {
  listenTo: AdvertiserStore,

  fetch: {
    advertisers() {
      return AdvertiserStore.for(this).getAdvertisers();
    }
  },

  failed(err) {
    return <div>{err}</div>
  },

  pending() {
    return this.done({ advertisers: [] });
  }
});
