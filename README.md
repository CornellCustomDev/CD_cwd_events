[![Latest Stable Version](https://img.shields.io/packagist/v/cubear/cwd_events.svg?style=flat-square)](https://packagist.org/packages/cubear/cwd_events)

# CWD Events Embed Block
Drupal 8 module to embed a block of events from CU Calendar (Localist).

Essentially, the module renders the following code, based on settings in the Drupal block configuration:

```HTML
  <section>
      <h2>Block Name</h2>
      <a class="cwd_events_readmore" href="/events">Read More</a><!-- optional read more configured in block-->
      <div id='events-listing' class='events-listing' ></div>
        <script>
            //more settings options available see ./etc/js/app.js
            var settings = {
              'target': 'events-listing',
              'depts':@depts,
              'entries':@entries,
              'format':'@format',
              'group':@group,
              'singleday':@singleday,
              'keyword':'@keyword',
              'addCal': true,
              'heading':''
            };
            if (CWD_LocalList){
              CWD_LocalList.run( settings );
            }else{
              console.warn('ERROR: can not find events build');
            }
         </script>
  </section>
```
