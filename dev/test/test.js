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
    data-hideimages="true"
    data-hideaddcal="0"
    data-hidepagination="true"
    data-filterby="none"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>
<div id='test'></div>
`

let jsDomConfig =
{
    url: "http://localhost:8080"
}

var { window } = new JSDOM( jsdomHtml, jsDomConfig );
Object.keys(window).forEach((key) => {
    if (!(key in global)) {
    global[key] = window[key];
    }
});

global.document.querySelector('body').innerHTML = jsdomHtml;
require('../dist/cwd_events');

describe ('Test set up', function(){
    describe('Server status', function(){
        it('should return 200', function() {
            requester.get('/')
                .end(function(err, res) {
                    res.should.have.status(200);
                });
        });
    });
})
