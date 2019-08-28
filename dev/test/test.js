import buildEvent from '../js/helpers/buildEvent';
import localList from '../js/localList';
import localistConnector from '../js/services/localistApiConnector';
import {CheckDate, add_calendar } from '../js/helpers/template-helpers';
import eventFilters from '../js/helpers/eventFilters';
const assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var request = require('request');
var chai = require('chai');
chai.use(require('chai-http'));


var data;
var requester = chai.request('http://localhost:8080');
var innerHtmlString;
var outerString;

var ll =localList({
    format:'compact',
    target:'standard',
    depts: "",
    entries: "4",
    group: "",
    keyword: "",
    heading: "",
    addcal: "true",
    calendarurl: 'http://localhost:8080/test/testData.json',
    apikey: '',
    filterby: 'group',

});
//maybe use https://github.com/ctimmerm/axios-mock-adapter
describe('cd events application unit tests', () => {
        const beargs = {
            addcal: 'true',
            pref_excerpt_length: '150',
            filterby: 'group',
        }

        describe('Server status', function(){
            it('should return 200', function() {
                requester.get('/')
                    .end(function(err, res) {
                        res.should.have.status(200);
                    });
            });
        });

        var check = function(done){
            const requestArgs = {
                entries: '4',
                calendarurl: 'http://localhost:8080/test/testData.json'
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

        describe('js/services/localist-api-connector.js #fetchAll', function(){
            it('should return an array of four events. {events: [{event: Objects}...]}.', () => {
                const dataLen = data.events.length;
                dataLen.should.equal(4);
            });
        });

        // Eventually BE should be removed and it all done in views/templates.
        describe('js/helpers/buildEvent #buildEvent()', () => {
            it('should return an object with properties.', function(){

                const be = buildEvent(data.events[0].event, beargs);
                // Test for some varaibles
                be.should.have.property('day');
                be.should.have.property('monthHeader');
                be.should.have.property('event_time_end');
                be.should.have.property('department');
                be.should.have.property('type');
                be.should.have.property('group_name');
                be.should.have.property('group_id');
                be.should.have.property('event_types');
                be.should.have.property('description').with.lengthOf(151);
                expect
            });
        });

        // Eventually BE should be removed and it all done in views/templates.
        describe('js/locaList.js localList()', function() {

            it('should have a innerTemplate function.', function() {
                ll.should.have.own.property('innerTemplate')
            });

            it('should return a valid inner html string', function() {
                const be = buildEvent(data.events[0].event, beargs);
                innerHtmlString = ll.innerTemplate(be);
                expect(innerHtmlString).to.be.a('string');
                // innerHtmlString.should.be.a.string;//include('<h4 class="meta date"><span class="fulldate">Aug 21</span></h4>');
                // innerHtmlString.should.include('Threats to pollinator health are intense and varied, from habitat loss and climate change to diseases and pesticides. A summer exhibit in the  Mann Ga…')
            });

            it('should also have a outerTemplate function.', function() {
                ll.should.have.own.property('outerTemplate')
            });

            it('should return a valid outer html string', function() {
                outerString = ll.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                outerString.should.include('<h2>this is a test</h2>');
            });

            it('should also contain the inner html sub-string', function() {
                const be = buildEvent(data.events[0].event, beargs);
                innerHtmlString = ll.innerTemplate(be);
                outerString = ll.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                outerString.should.include('<h4 class="meta date"><span class="fulldate">Aug 21</span></h4>');
            });
            describe('#addcal', function(){
                it('should also have a addcal html if addcal is set to true.', function() {
                    outerString.should.include('add to calendar');
                });

                it('should also not have a addcal html if addcal is set to false.', function() {
                    beargs.addcal = 'false';
                    const be = buildEvent(data.events[0].event, beargs);
                    innerHtmlString = ll.innerTemplate(be);
                    outerString = ll.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                    outerString.should.not.include('add to calendar');
                });
            })

        });

        describe('js/helpers/templatehelpers.js', function() {

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

});
