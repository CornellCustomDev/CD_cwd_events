
import localList from '../js/localList';
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

describe('Components', function() {
    describe('standard', function(){
        describe('template', function(){
            it('should return valid html string.', function(){
                llprops.format="standard";
                var llStandard = localList(llprops);
                const html = llStandard.render();
                expect(html).to.contain('class="standard"');
            })
        });
    });
    describe('inline_compact', function(){
        describe('template', function(){
            it('should return valid html string.', function(){
                llprops.format="inline_compact";
                var llIC = localList(llprops);
                const html = llIC.render();
                expect(html).to.contain("events-listing-inline inline no-thumbnails");
            })
        });
    });

    describe('modern_compact', function(){
        describe('template', function(){
            it('should return valid html string.', function(){
                llprops.format="modern_compact";
                var llMC = localList(llprops);
                const html = llMC.render();
                expect(html).to.contain('class="secondary modern"');
            })
        });
    });

    describe('modern_standard', function(){
        describe('template', function(){
            it('should return valid html string.', function(){
                llprops.format="modern_standard";
                var llMS = localList(llprops);
                const html = llMS.render();
                expect(html).to.contain('class="modern"');
            })
        });
    });

    describe('archive', function(){
        describe('template', function(){
            it('should return valid html string.', function(){
                llprops.format="archive";
                var llA = localList(llprops);
                const html = llA.render();
                expect(html).to.contain("archive-events");
            })
        });
    });

})

