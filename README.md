# CWD Events
CWD Events Module

```HTML
  <section>
      <h2>Block Name</h2>
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
              'heading':''};
            if (CWD_LocalList){
              CWD_LocalList.run( settings );
            }else{
              console.warn('ERROR: can not find events buid');
            }
         </script>
  </section>
```
