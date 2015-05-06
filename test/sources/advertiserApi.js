import chai from 'chai';
import AdvertiserApi from '../../app/sources/advertiserApi.js';
import chaiPromises from 'chai-as-promised';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';

chai.should();
//chai.config.truncateThreshold = 0;
chai.use(chaiProperties);
chai.use(chaiThings);
chai.use(chaiPromises);

describe('Advertising HTTP Source', () => {

  let advertiser = { advertiserName: 'what a great advertiser name' };

  it("should return an array when creating an advertiser",
    (done) => AdvertiserApi.createAdvertiser(advertiser).should.eventually
      .be.instanceOf(Array)
      .and.have.length(1)
      .and.notify(done));

  it("should create a new advertiser with an ID", 
    (done) => AdvertiserApi.createAdvertiser(advertiser).should.eventually
      .include.a.thing.with.property('id')
      .and.notify(done));

  it("should create a new advertiser with the correct advertiser name", 
    (done) => AdvertiserApi.createAdvertiser(advertiser).should.eventually
      .include.a.thing.with.property('advertiserName', advertiser.advertiserName)
      .and.notify(done) )

  it("should retreive a list of advertisers", 
    (done) => AdvertiserApi.getAllAdvertisers().should.eventually
      .all.have.property('id')
      .and.notify(done));


  it("should retreive an individual advertiser by id", 
    (done) => AdvertiserApi.getAdvertiser(1).should.eventually
      .have.property('id', 1)
      .and.notify(done));

});
