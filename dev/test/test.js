import buildEvent from '../js/helpers/buildEvent';
import localList from '../js/localList';
import localistConnector from '../js/services/localistApiConnector';
const assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var request = require('request');
var chai = require('chai');
chai.use(require('chai-http'));

//maybe use https://github.com/ctimmerm/axios-mock-adapter
describe('cd events application unit tests', () => {
        var data;
        var requester = chai.request('http://localhost:8080');
        var innerHtmlString;
        var outerString;

        const ll =localList({
            format:'compact',
            target:'standard',
            depts: "",
            entries: "4",
            group: "",
            keyword: "",
            heading: "",
            url: 'http://localhost:8080/test/testData.json'
        });

        const beargs = {
            addcal: 'false',
            pref_excerpt_length: '150',
            pref_category: 'group',
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
                url: 'http://localhost:8080/test/testData.json'
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

        describe('localist-api-connector', function(){
            it('should return an array of four events. {events: [{event: Objects}...]}.', () => {
                const dataLen = data.events.length;
                dataLen.should.equal(4);
            });
        });

        // Eventually BE should be removed and it all done in views/templates.
        describe('#buildEvent()', () => {
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
        describe('#locaList()', function() {
            it('it should have a innerTemplate function.', function() {
                ll.should.have.own.property('innerTemplate')
            });

            it('it should return a valid inner html string', function() {
                const be = buildEvent(data.events[0].event, beargs);
                innerHtmlString = ll.innerTemplate(be);
                innerHtmlString.should.include('<h4 class="meta date"><span class="fulldate">Aug 21</span></h4>');
                innerHtmlString.should.include('Threats to pollinator health are intense and varied, from habitat loss and climate change to diseases and pesticides. A summer exhibit in the  Mann Ga…')
            });
            it('it should also have a outerTemplate function.', function() {
                ll.should.have.own.property('outerTemplate')
            });


            it('it should return a valid outer html string', function() {
                outerString = ll.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                outerString.should.include('<h2>this is a test</h2>');
            });

            it('it should also contain the inner html sub-string', function() {
                const be = buildEvent(data.events[0].event, beargs);
                innerHtmlString = ll.innerTemplate(be);
                outerString = ll.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                outerString.should.include('<h4 class="meta date"><span class="fulldate">Aug 21</span></h4>');
            });
        });
});
