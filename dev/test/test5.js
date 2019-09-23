/** test modern standard component */
var expect = require('chai').expect;
require('./test');

describe('Classic component', function() {
    const eventsCount = 4;
    const targetEnabled = window.document.querySelector('div#classic');
    var check = function(done){
        setTimeout(() => {
            done();
        }, 200);
    }
    before((done) => {
        check(done);
    });

    it('should have class compact', function() {
        const res = targetEnabled.querySelector('div.col-sm-12')
        expect(res).to.exist;
    });

    // Test data will always return 4 events
    it('should load test data with 4 events.', () => {
        const events = targetEnabled.querySelectorAll('div.row')
        expect(events).to.have.length(eventsCount);
    });

});


