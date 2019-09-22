
var assert = chai.assert;
var should = chai.should;

describe('cd events browser tests app', function(){
    var data;
    var elem;
    var $elem;
    var dl;
    var ll;

    describe('Drupal created object', function(){
        it('should have class events-listing', function() {
            $elem = $('.drupal-events-listing')
            elem = $elem.get(0)
            assert.equal(typeof elem, 'object');
        });

        it('should have 12 data attributes', function() {
            dl = Object.assign({}, elem.dataset);
            var keys = Object.keys(dl)
            assert.equal(keys.length, 12);
            console.log(keys)
            // assert.deepEqual(keys, [
            //     "target",
            //     "depts",
            //     "entries",
            //     "format",
            //     "group",
            //     "keyword",
            //     "heading",
            //     "calendarurl",
            //     "apikey",
            //     "filterby",
            //     "addcal"
            // ])
        });

        describe('CWD events app', function(){
            it('should expose localist to window', function() {
                assert.exists(localList);
            });

            it('should be a function', function() {
                var lltype = typeof localList;
                assert.equal(lltype, 'function');
            });
            describe('#Component', function(){
                it('should fetch 1 events', function(done) {
                    this.timeout(5000);
                    // use the test data.
                    dl.calendarurl = "./test/testData.json"
                    ll = localList(dl);
                    console.log(ll);
                    ll.requestArgs.calendarurl ="./test/testData.json";
                    // console.log(ll.requestArgs);
                    ll.findAll(ll.requestArgs).then(function(res) {
                        // console.log(res);
                        assert.equal(res.data.events.length, 4);
                        data = res.data;
                        ll.setState({events:res.data.events});
                        ll.render();
                        done();
                    })
                });

                it('should match localist app data', function() {
                    assert.deepEqual(data.events, ll.events);
                });

                it('should match localist app innerHtml', function() {
                    var inner = $('.events-list').html();
                    $inner = $(inner)
                    var builtInner = ll.buildInnerHtml();
                    $bI = $(builtInner);
                    // console.log(builtInner);
                    assert.deepEqual($bI, $inner);
                });
            })
        })
    })
});
