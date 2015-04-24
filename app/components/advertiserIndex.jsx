import React from "react";
import _ from "lodash";
import {Link} from "react-router";
import Marty from "marty";
import AdvertiserStore from "../stores/advertiserStore.js";

class IndexItem extends React.Component {
  render() {
    return <tr>
        <td>
          <Link to="advertiser" params={{ advertiserId: this.props.id }}>
            {this.props.advertiserName}
          </Link>
        </td>
        <td>
          <span className="glyphicon glyphicon-edit pull-right"></span>
        </td>
      </tr>  
  }
}

class AdvertiserIndex extends React.Component {
  render() {
    var indexItems =  _.map(this.props.advertisers, function(advertiser, i) {
            return <IndexItem {...advertiser} key={i-1} />;
        });

    return <div className="row">
        <table className="table table-hover table-condensed">
          <thead>
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

export default Marty.createContainer(AdvertiserIndex, {
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
    return this.done({
      advertisers: {}
    });
  }

});
