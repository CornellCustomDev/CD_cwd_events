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
const { document } = (new JSDOM(`...`)).window;

var beargs = {
    addcal: 'true',
    pref_excerpt_length: '150',
    filterby: 'group',
}
var data;
const llprops = {
    format:'modern_standard',
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

describe('eventHandler', function() {
    it('should have a target parent.', function(){
        expect(ll.parent).to.exist;
    })

    it('should have a event handler named handleclick.', function(){
        var eventHandler = ll.eventListeners();
        expect(eventHandler).to.exist;
    })
});


