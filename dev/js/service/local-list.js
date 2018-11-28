import request from './request';


export let findAll = (
        {depts=0, entries=3, format='standard', group=0, singleday=false, keyword=false, api='2.1'}
    ) => {    
    /* More Params */
    // calculate date ranges (including archive options)
    const pref_archive_range = 6; 
    var pref_days = 365; // range of days to retrieve (overridden by "singleday" requests)
    const pref_distinct = true; // controls the "distinct" filter for the events query ('true' only returns one instance of a repeating event)
    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    const supports_direction = true;
    var past_year = today_year;
    var past_month = today_month - pref_archive_range; // past x months (legacy API 2.0)
    if (past_month < 0) {
        past_month += 12;
        past_year -= 1;
    }

    //helper function
    const addLeadingZero = (num) => {
        if (num.toString().length == 1) {
            num = '0'+num;
        }
        return num;
    }

    var start_results = today.getFullYear() + '-' + addLeadingZero(parseInt(today.getMonth()+1)) + '-' + addLeadingZero(today.getDate());
    var end_results = parseInt(today.getFullYear()+1) + '-' + addLeadingZero(parseInt(today.getMonth()+1)) + '-' + addLeadingZero(today.getDate()); // 'end_results' is only used for archive mode in legacy API 2.0
    if (format == 'archive') {
        end_results = start_results;
        if (supports_direction) {
            start_results = (today.getFullYear()-1) + '-' + addLeadingZero(parseInt(today.getMonth()+1)) + '-' + addLeadingZero(today.getDate());
        }
        else { // legacy API 2.0
            start_results = past_year + '-' + addLeadingZero(parseInt(past_month+1)) + '-' + addLeadingZero(today.getDate());
        }
    }
                
    // single day option
    if (singleday) {
        start_results = singleday;
        pref_days = 1;
    }   
     
    let query = {
        api_key: 'KLhy2GtuSAGirYGY',
        days: pref_days,
        distinct: pref_distinct,
        pp: entries,
        start: start_results,        
    };
    
    if (depts && depts != 0) {
        query.type = depts;
    }
    if (group != 0) {
        query.group_id = group;
    }
    if (keyword && keyword != '') {
        query.keyword = keyword;
    }
    if (format == 'archive' && !supports_direction) {
        query.end = end_results; // legacy API 2.0
    } else {
        query.days = pref_days;
    }
    if (format == 'archive' && supports_direction) {
        query.direction = 'desc';
    }    
    //Get helper function
    const formatParams = (params) => {
        return "?" + Object
              .keys(params)
              .map(function(key){
                return key+"="+encodeURIComponent(params[key])
              })
              .join("&")
      } 
    var url = '//events.cornell.edu/api/'+api+'/events'+formatParams(query);   
   // return request({url:"testData.json"})
   return request({
            url: url,
            method: "GET",
			dataType: 'jsonp',
			crossDomain: true,
			data: query,            
        }).then(retData => retData = JSON.parse(retData))

}



