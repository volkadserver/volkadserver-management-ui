import React from "react";
import Marty from "marty";
import AdvertiserStore from "../stores/advertiserStore";
import {Link} from "react-router";

class Advertiser extends React.Component {
  render() {
    return <div className="row">
      <div className="page-header">
        <h1>
          {this.props.advertiser.advertiserName + ' '}
          <small>
            Advertiser
          </small>
        </h1>
      </div>
    </div>
  }
}

export default Marty.createContainer(Advertiser, {
  listenTo: AdvertiserStore,
  fetch: {
    advertiser() {
      return AdvertiserStore.for(this).getAdvertiser(this.props.advertiserId);
    }
  },
  failed(err) {
    return <div>{err}</div>
  },
  pending() {
    return this.done({
      advertiser: {}
    });
  }
});
