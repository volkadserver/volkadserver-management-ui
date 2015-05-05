import chai from 'chai';
import AdvertiserApi from '../app/sources/advertiserApi.js';
import sinon from 'sinon';
import chaiPromises from 'chai-as-promised';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';

chai.should();
chai.config.truncateThreshold = 0;
chai.use(chaiProperties);
chai.use(chaiThings);
chai.use(chaiPromises);

describe('Advertising HTTP Source', () => {

  let createAdvertiser, 
      getAllAdvertisers,
      getAdvertiser,
      advertiser = { advertiserName: 'what a great advertiser name' },
      serverAdvertiser = Object.assign({ id: 1 }, advertiser);


  //let server = sinon.fakeServer.create();

  beforeEach(() => {
    //this.server.respondWith('GET', '/api/Advertisers/1', JSON.stringify([serverAdvertiser]));
    //this.server.respondWith('POST', '/api/Advertisers', JSON.stringify(serverAdvertiser));

    createAdvertiser = AdvertiserApi.createAdvertiser(advertiser);
    getAdvertiser = AdvertiserApi.getAdvertiser(1);
    getAllAdvertisers = AdvertiserApi.getAllAdvertisers();
  });

  it("should create a new advertiser with an ID", 
     (done) => createAdvertiser.should.eventually.include.a.thing.with.property('id').and.notify(done)
  );

  it("should create a new advertiser with the correct advertiser name", 
    (done) => createAdvertiser.should.eventually.include.a.thing
      .with.property('advertiserName', createAdvertiser.advertiserName).and.notify(done) )

  it("should retreive a list of advertisers", 
     (done) => getAllAdvertisers.should.eventually.all.have.property('id').and.notify(done)
  );


  it("should retreive an individual advertiser by id", 
    (done) => getAdvertiser.should.eventually.have.property('id', 1).and.notify(done));

});
