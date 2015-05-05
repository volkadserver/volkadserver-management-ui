import Marty from "marty";
import CreativeSourceActionCreators from "../actions/creativeSourceActionCreators";

class CreativeApi extends Marty.HttpStateSource {
  constructor() {
    super();

    this.baseUrl = 'http://localhost:3000/api'
  }

  getAllCreatives() {
    return this.get('/Creatives')
      .then((res) => CreativeSourceActionCreators(res.body));
  }

  getCreative(id) {
    return this.get('/Creatives/' + id)
      .then((res) => CreativeSourceActionCreators(res.body));
  }

  createCreative(creative, flightId) {
    creative.flightId = flightId;
    return this
      .post({ url: '/Creatives', body: creative, contentType: 'application/json' })
      .then((res) => CreativeSourceActionCreators.receiveCreatives([res.body]));
  }
}


export default Marty.register(CreativeApi);
