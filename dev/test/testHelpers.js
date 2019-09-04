import buildEvent from '../js/helpers/buildEvent';
import localList from '../js/localList';
import localistConnector from '../js/services/localistApiConnector';
import {CheckDate, add_calendar } from '../js/helpers/template-helpers';
import {eventFilters} from '../js/helpers/eventFilters';
var expect = require('chai').expect;
var chai = require('chai');

chai.use(require('chai-http'));
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { window } = new JSDOM(/* html */`
    <!DOCTYPE html>
        <div id='target'>
        </div>
    `);

var beargs = {
    addcal: 'true',
    pref_excerpt_length: '150',
    filterby: 'group',
}
var data;
const llprops = {
    format:'compact',
    target:'target',
    depts: "",
    entries: "4",
    group: "",
    keyword: "",
    heading: "",
    addcal: "true",
    calendarurl: 'http://localhost:8080/test/testData.json',
    apikey: '',
    filterby: 'group',
    pagination: 'false',
    page: '1',
    win: window
}

var ll =localList(llprops);
var data;

describe('js/helpers/templatehelpers.js', function() {
    var check = function(done){
        const requestArgs = {
            entries: '4',
            calendarurl: 'http://localhost:8080/test/testData.json',
            depts: '0',
            format: 'standard',
            group: '0',
            keyword: '',
            apikey: '',
            page: '1',
            days: '365',
        };
        const connection = localistConnector(requestArgs);
        connection
            .then(response => {
                data = response.data;
                done();
            })
            .catch(e => {
                done(new Error(e.message));
            });
    };

    before((done) => {
        check(done);
    });

    describe('CheckDate()', function() {
        const cd = new CheckDate();
        it('should return html string if a day is not stored.', function(){
            const be = buildEvent(data.events[0].event, beargs);
            const day = cd.day(be);
            const month = cd.month(be);
            expect(day).to.not.be.empty;
            expect(month).to.not.be.empty;
        })

        it('it should return html empty string if a day is not stored.', function(){
            const be = buildEvent(data.events[0].event, beargs);
            const day = cd.day(be);
            const month = cd.month(be);
            expect(day).to.be.empty;
            expect(month).to.be.empty;
        })

        });

        describe('eventFilters()', function(){

        const ef = eventFilters(ll.wrapperArgs.filters, undefined);
        it('should be empty because they requrie a valid window: must be tested in browser.', function(){
            expect(ef).to.be.empty;
        })
    })

    describe('add_calendar()', function(){
        it('should return valid html string.', function(){
            const ac = add_calendar(data.events[0].event);
            expect(ac).to.contain("Google");
            expect(ac).to.contain("iCal");
            expect(ac).to.contain("Outlook");
        })
    })
});


