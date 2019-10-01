/** test modern standard component */
var expect = require('chai').expect;
require('./test');

describe('Standard component', function() {
    const eventsCount = 4;
    const targetEnabled = window.document.querySelector('div#standard_enabled');
    const targetDisabled = window.document.querySelector('div#standard_disabled');
    var check = function(done){
        setTimeout(() => {
            done();
        }, 200);
    }
    before((done) => {
        check(done);
    });

    it('should have class standard', function() {
        const res = targetEnabled
            .querySelector('section')
            .classList
            .contains('standard');
        expect(res).to.be.true;
    });

    // Test data will always return 4 events
    it('should load test data with 4 events.', () => {
        const events = targetEnabled.querySelectorAll('div.events')
        expect(events).to.have.length(eventsCount);
    });

    // Daysahead, Departments, groups, and keywords can not be tested with static data

    describe("enabled data-config", function(){
        it('should display have filters.', () => {
            const res = targetEnabled.querySelector('div.events-filters-wrap');
            expect(res).to.exist;
        });

        it('should have a description.', () => {
            const res = targetEnabled.querySelector('div.summary p').textContent;
            expect(res).to.have.length(260);
        });

        it('should have images.', () => {
            const res = targetEnabled.querySelectorAll('img');
            expect(res).to.have.length(eventsCount);
        });

        it('should display pagination.', () => {
            const res = targetEnabled.querySelectorAll('nav.pager ul.pager_items');
            expect(res).to.have.length(1);
        });

        it('should have add calander links.', () => {
            const res = targetEnabled.querySelectorAll('.event-subscribe');
            expect(res).to.have.length(eventsCount);
        });

        it('should have a wrapper class', () => {
            const res = targetEnabled.querySelector('div.wrapper-test')
            expect(res).to.exist;
        });

        it('should have a list class', () => {
            const res = targetEnabled.querySelector('div.list-test')
            expect(res).to.exist;
        });

        it('should have a item class', () => {
            const res = targetEnabled.querySelector('div.item-test')
            expect(res).to.exist;
        });

    })

    describe('disabled dat-config', function(){
        it('should not have filters.', () => {
            const res = targetDisabled.querySelector('div.events-filters-wrap');
            expect(res).to.not.exist;
        });

        it('should not have a description.', () => {
            const res = targetDisabled.querySelector('div.summary p').textContent;
            expect(res).to.be.empty;
        });

        it('should not have images.', () => {
            const res = targetDisabled.querySelector('img');
            expect(res).to.be.null;
        });

        it('should not have add to calendar links.', () => {
            const res = targetDisabled.querySelector('.event-subscribe');
            expect(res).to.be.null;
        });

        it('should not display pagination.', () => {
            const res = targetDisabled.querySelector('nav.pager');
            expect(res).to.be.null;
        });

        it('should not have a wrapper class', () => {
            const res = targetDisabled.querySelector('div.wrapper-test')
            expect(res).to.not.exist;
        });

        it('should not have a list class', () => {
            const res = targetDisabled.querySelector('div.list-test')
            expect(res).to.not.exist;
        });

        it('should not have a item class', () => {
            const res = targetDisabled.querySelector('div.item-test')
            expect(res).to.not.exist;
        });

    });

});


