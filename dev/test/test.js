/** Set up */
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
chai.use(require('chai-http'));

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var requester = chai.request('http://localhost:8080');

let jsdomHtml =  /* html */ `
<div id="modern_standard_enabled"
    class="events-listing cwd-events-style"
    data-target="modern_standard_enabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
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
    data-wrapperclass="wrapper-test"
    data-listclass="list-test"
    data-itemclass="item-test"
    data-heading="Events block"
>
</div>

<div id="modern_standard_disabled"
    class="events-listing cwd-events-style"
    data-target="modern_standard_disabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="modern_standard"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="true"
    data-truncatedescription="150"
    data-hideimages="true"
    data-hideaddcal="true"
    data-hidepagination="true"
    data-filterby="none"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>
<div id="modern_compact_enabled"
    class="events-listing cwd-events-style"
    data-target="modern_compact_enabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="modern_compact"
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
    data-wrapperclass="wrapper-test"
    data-listclass="list-test"
    data-itemclass="item-test"
    data-heading="Events block"
>
</div>

<div id="modern_compact_disabled"
    class="events-listing cwd-events-style"
    data-target="modern_compact_disabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="modern_compact"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="true"
    data-truncatedescription="150"
    data-hideimages="true"
    data-hideaddcal="true"
    data-hidepagination="true"
    data-filterby="none"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>

<div id="standard_enabled"
    class="events-listing cwd-events-style"
    data-target="standard_enabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="standard"
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
    data-wrapperclass="wrapper-test"
    data-listclass="list-test"
    data-itemclass="item-test"
    data-heading="Events block"
>
</div>

<div id="standard_disabled"
    class="events-listing cwd-events-style"
    data-target="standard_disabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="standard"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="true"
    data-truncatedescription="150"
    data-hideimages="true"
    data-hideaddcal="true"
    data-hidepagination="true"
    data-filterby="none"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>

<div id="compact_enabled"
    class="events-listing cwd-events-style"
    data-target="compact_enabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="compact"
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
    data-wrapperclass="wrapper-test"
    data-listclass="list-test"
    data-itemclass="item-test"
    data-heading="Events block"
>
</div>

<div id="compact_disabled"
    class="events-listing cwd-events-style"
    data-target="compact_disabled"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="compact"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="true"
    data-truncatedescription="150"
    data-hideimages="true"
    data-hideaddcal="true"
    data-hidepagination="true"
    data-filterby="none"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>

<div id="inline_compact"
    class="events-listing cwd-events-style"
    data-target="inline_compact"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="inline_compact"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="true"
    data-truncatedescription="150"
    data-hideimages="true"
    data-hideaddcal="true"
    data-hidepagination="true"
    data-filterby="none"
    data-wrapperclass=""
    data-listclass=""
    data-itemclass=""
    data-heading="Events block"
>
</div>

<div id="classic"
    class="events-listing cwd-events-style"
    data-target="classic"
    data-calendarurl="http://localhost:8080/test/testData.json"
    data-apikey=""
    data-format="classic"
    data-entries="4"
    data-daysahead="365"
    data-depts="0"
    data-group="0"
    data-keyword=""
    data-hidedescription="true"
    data-truncatedescription="150"
    data-hideimages="true"
    data-hideaddcal="true"
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
    url: "http://localhost:8080",
    runScripts: 'dangerously',
}

var { window } = new JSDOM( jsdomHtml, jsDomConfig );
Object.keys(window).forEach((key) => {
    if (!(key in global)) {
    global[key] = window[key];
    }
});

// global.document.querySelector('body').innerHTML = jsdomHtml;
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
