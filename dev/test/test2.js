/** test modern standard component */
var expect = require('chai').expect;
require('./test');

describe('Modern-Standard component', function(){
    var check = function(done){
        setTimeout(() => {
            done();
        }, 200);
    }
    before((done) => {
        check(done);
    });

    it('should have class events-modern-standard', () => {
        const res = window.document
            .querySelector('div#enabled section')
            .classList
            .contains('events-modern-standard');
        expect(res).to.be.true;
    });

    // Test data will always return 4 events
    it('should load test data with 4 events.', () => {
        const events = window.document.querySelectorAll('div#enabled div.events')
        expect(events).to.have.length(4);
    });

    // @todo test set class wrapper

    // @todo test set class events list

    // @todo test set event list item

    // Daysahead, Departments, groups, and keywords can not be tested with static data

    describe("enabled data-config", function(){
        it('should display have filters.', () => {
            const res = window.document.querySelector('div#enabled div.events-filters-wrap');
            expect(res).to.exist;
        });

        it('should have a description.', () => {
            const res = window.document.querySelector('div#enabled div.summary p').textContent;
            expect(res).to.have.length(161);
        });

        it('should have images.', () => {
            const res = window.document.querySelectorAll('div#enabled img');
            expect(res).to.have.length(4);
        });

        //@todo test add calendar

        it('should display pagination.', () => {
            const res = window.document.querySelectorAll('div#enabled nav.pager ul.pager_items');
            expect(res).to.have.length(1);
        });

    })

    describe('disabled dat-config', function(){
        it('should not have filters.', () => {
            const res = window.document.querySelector('div#disabled div.events-filters-wrap');
            expect(res).to.not.exist;
        });

        it('should not have a description.', () => {
            const res = window.document.querySelector('div#disabled div.summary p').textContent;
            expect(res).to.be.empty;
        });

        it('should not have images.', () => {
            const res = window.document.querySelector('div#disabled img');
            expect(res).to.be.null;
        });

        //@todo test add calendar

        it('should not display pagination.', () => {
            const res = window.document.querySelector('div#disabled nav.pager');
            expect(res).to.be.null;
        });

    });

});


