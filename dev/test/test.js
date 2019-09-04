import buildEvent from '../js/helpers/buildEvent';
import localList from '../js/localList';
import localistConnector from '../js/services/localistApiConnector';
import paginationTemplate from '../js/templates/paginationTemplate'
var expect = require('chai').expect;
var should = require('chai').should();
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

var data;
var requester = chai.request('http://localhost:8080');
var innerHtmlString;
var outerString;

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

describe('cd events application unit tests', function(){
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
                // console.log(ll);
                llprops.format="compact";
                ll = localList(llprops);
                ll.props.should.have.own.property('innerTemplate')
            });

            it('should return a valid inner html string', function() {
                llprops.format="compact";
                ll = localList(llprops);
                const be = buildEvent(data.events[0].event, beargs);
                innerHtmlString = ll.props.innerTemplate(be);
                expect(innerHtmlString).to.be.a('string');
            });

            it('should also have a outerTemplate function.', function() {
                llprops.format="compact";
                ll = localList(llprops);
                ll.props.should.have.own.property('outerTemplate')
            });

            it('should return a valid outer html string', function() {
                llprops.format="compact";
                ll = localList(llprops);
                outerString = ll.props.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                outerString.should.include('<h2>this is a test</h2>');
            });

            it('should also contain the inner html sub-string', function() {
                llprops.format="compact";
                ll = localList(llprops);
                const be = buildEvent(data.events[0].event, beargs);
                innerHtmlString = ll.props.innerTemplate(be);
                outerString = ll.props.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                outerString.should.include('<h4 class="meta date"><span class="fulldate">Aug 21</span></h4>');
            });
            describe('#addcal', function(){
                it('should also have a addcal html if addcal is set to true.', function() {
                    outerString.should.include('add to calendar');
                });

                it('should also not have a addcal html if addcal is set to false.', function() {
                    beargs.addcal = 'false';
                    const be = buildEvent(data.events[0].event, beargs);
                    innerHtmlString = ll.props.innerTemplate(be);
                    outerString = ll.props.outerTemplate(innerHtmlString, {'heading':'this is a test'})
                    outerString.should.not.include('add to calendar');
                });
            })

        });

        describe('Templates', function() {
            describe('paginator', function(){
                var page = {size:3, current:1, total:4}
                var paginator = paginationTemplate(page)
                var html = paginator.render();
                expect(html).to.contain('<nav class="pager">');
            })
        });

});
