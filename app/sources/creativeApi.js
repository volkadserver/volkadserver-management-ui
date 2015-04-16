import marty from "marty";
import creativeSourceActionCreators from "../actions/creativeSourceActionCreators";

var creativeApi = marty.createStateSource({
  type: 'http',
  baseUrl: 'http://localhost:3000/api',
  
  getAllCreatives() {
    return this.get('/Creatives').then(function(res) {
      creativeSourceActionCreators.receiveCreatives(res.body);
      return res.body;
    });
  },

  getCreative(id) {
    return this.get('/Creatives/' + id).then(function(res) {
      creativeSourceActionCreators.receiveCreatives([res.body]);
    });
  },

  createCreative(creative, flightId) {
    creative.flightId = flightId;
    return this.post({ url: '/Creatives', body: creative, contentType: 'application/json' })
      .then(function(res) {
        creativeSourceActionCreators.receiveCreatives([res.body]);
        return res;
      });
  }

});


export default creativeApi;
