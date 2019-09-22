/** Set up */
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
chai.use(require('chai-http'));

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var requester = chai.request('http://localhost:8080');

let jsdomHtml =  `
<div id="enabled"
    class="events-listing cwd-events-style"
    data-target="enabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey="KLhy2GtuSAGirYGY"
    data-format="modern_standard"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="0"
    data-truncatedescription="150"
    data-hideimages="0"
    data-hideaddcal="0"
    data-hidepagination="0"
    data-filterby="group"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>

<div id="disabled"
    class="events-listing cwd-events-style"
    data-target="disabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey="KLhy2GtuSAGirYGY"
    data-format="modern_standard"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="true"
    data-truncatedescription="150"
    data-hideimages="0"
    data-hideaddcal="0"
    data-hidepagination="true"
    data-filterby="group"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>
`

let jsDomConfig =
{
    url: "http://localhost:8080"
}

describe('Test Server set up and enable disable', function(){
    var { window } = new JSDOM( jsdomHtml, jsDomConfig );
    Object.keys(window).forEach((key) => {
        if (!(key in global)) {
        global[key] = window[key];
        }
    });

    global.document.querySelector('body').innerHTML = jsdomHtml;
    var localist = require('../dist/cwd_events');
    describe('Server status', function(){
        it('should return 200', function() {
            requester.get('/')
                .end(function(err, res) {
                    res.should.have.status(200);
                });
        });
    });

    var check = function(done){
        setTimeout(() => {
            done();
        }, 200);
    }
    before((done) => {
        check(done);
    });
    describe('#fetchAll', function(){
        it('should return an array of four events. {events: [{event: Objects}...]}.', () => {
            const events = window.document.querySelectorAll('div#enabled div.events')
            expect(events).to.have.length(4);
        });
    });
    describe('#data-hidepagination:show', function(){
        it('should display pagination.', () => {
            const pager = window.document.querySelectorAll('div#enabled nav.pager ul.pager_items');
            expect(pager).to.have.length(1);
        });
    });

    describe('#data-hidedescription:show', function(){
        it('should have a description.', () => {
            const res = window.document.querySelector('div#enabled div.summary p').textContent;
            expect(res).to.have.length(161);
        });
    });

});

describe('Testing disabled.', function(){
    var check = function(done){
        setTimeout(() => {
            done();
        }, 200);
    }
    before((done) => {
        check(done);
    });
    describe('#fetchAll', function(){
        it('should return an array of four events. {events: [{event: Objects}...]}.', () => {
            const events = window.document.querySelectorAll('div#disabled div.events')
            expect(events).to.have.length(4);
        });
    });
    describe('#data-hidepagination:hide', function(){
        it('should display pagination.', () => {
            const pager = window.document.querySelectorAll('div#disabled nav.pager ul.pager_items');
            expect(pager).to.have.length(0);
        });
    });

    describe('#data-hidedescription:show', function(){
        it('should not have a description.', () => {
            const res = window.document.querySelector('div#disabled div.summary p').textContent;
            expect(res).to.be.empty;
        });
    });

});
