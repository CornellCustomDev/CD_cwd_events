/** Set up */
var expect = require('chai').expect;
require('./test');

describe('test exposed LL', function(){
    var LL = window.Localist
    var data = {
        apikey: "",
        calendarurl: "http://localhost:8080/test/testData.json",
        daysahead: "365",
        depts: "0",
        entries: "3",
        filterby: "group",
        format: "modern_standard",
        group: "0",
        heading: "Events block",
        hideaddcal: "false",
        hidedescription: "false",
        hideimages: "false",
        hidepagination: "true",
        itemclass: "",
        keyword: "",
        listclass: "",
        target: "test",
        truncatedescription: "126",
        wrapperclass: "",
    }
    LL(data);
    var check = function(done){
        setTimeout(() => {
            done();
        }, 500);
    }
    before((done) => {
        check(done);
    });

    describe('Localist', function(){
        it('should not be undefined', () => {
            expect(LL).to.exist;
        });

        it('should update the document', function(){
            const events = window.document.querySelectorAll('div#test div.events')
            expect(events).to.have.length(4);
        })
    });

})
