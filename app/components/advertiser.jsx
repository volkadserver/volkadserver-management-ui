import React from "react";
import marty from "marty";
import orderStore from "../stores/orderStore";
import advertiserStore from "../stores/advertiserStore";
import {Link} from "react-router";
import _ from "lodash";

var orderStateMixin = marty.createStateMixin({
  listenTo: advertiserStore,
  getState() {
    return advertiserStore.getAdvertiser(this.props.advertiserId)
  }
});

export default React.createClass({
  mixins: [ orderStateMixin ],
  
  render: function() {

    return this.state.when({
      pending: function() { return <div className="row">Pending</div> },
      failed: function(err) { return <div className="row">{err}</div> },
      done: function(advertiser) {
        return <div className="row">
          <div className="page-header">
            <h1>
              {advertiser.advertiserName + ' '}
              <small>
                Advertiser
              </small>
            </h1>
          </div>
        </div>
      }
    });
  }
});
