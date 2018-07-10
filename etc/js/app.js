import * as service from "./service/local-list";
import { BuildEvent } from "./buildEvent";
import {standardInner, standardWrapper} from "./templates/standard"
import { compactInner, compactWrapper} from "./templates/compact";
import { calendarInner, calendarWrapper} from "./templates/calendar";
import { modernCompactInner, modernCompactWrapper} from "./templates/modernCompact";
import { moderStandardInner, modernStandardWrapper} from "./templates/modernStandard";

//expose the localList via run function
module.exports = {
    run: function (args) {
        let LL = new LocalList(args);
        /*
         add custom templates here:
         localList.innerTemplate = (data)=>`<p>${data.event.title}</p>`;
         build the outer wrapper at a minimum this must contain innerHtml
         localList.outerTemplate = (innerHTML, args)=>`<h2>${args.heading}</h2>${innerHTML}`;
         */
        LL.renderEvents();
    }
}

/*LoacalList typical usage

const settings = { 'format':'standard', 'entries':20, 'heading':'My Local List',  'addCal': true};
let localList = new LocalList( settings ).renderEvents();
or with custom template 
let localList = new LocalList()
//define inner template list of events
localList.innerTemplate = (data)=>`<p>${data.event.title}</p>`;
//build the outer wrapper at a minimum this must contain innerHtml
localList.outerTemplate = (innerHTML, args)=>`<h2>${args.heading}</h2>${innerHTML}`;
localList.renderEvents();

or with calendar

const settings = { target:'events-listing', depts:0, entries:10, format:'calendar', group:0, singleday:false, keyword:'Small Farms Program'};
let localList = new LocalList( settings ).renderEvents();
*/
class LocalList{
    // define the following arguments
    constructor({
            depts=0, 
            entries=10, 
            format='standard', 
            group=0,
            target = "events-listing", //the id of the HTML target element
            title = "Events List", //the section title of the wrapper
            heading = 'Events', //the h3 displayed heading
            api = '2.1', // Localist API version (e.g., '2' for the latest 2.x, '2.1' for the specific point release) 
            pref_excerpt_length = 250, // use 0 for no truncation, using truncation will force descriptions to plaintext
            pref_excerpt_length_compact = 125, // excerpt length can be made shorter for 'compact' mode
            pref_allow_rich = true, // setting to false will force plaintext descriptions (only affects api 2.1 or later)
            pref_readmore = 'read more', // label for "read more" links at the end of truncated excerpts 
            pref_eventdetails = 'event details', // label for "event details" toggle buttons
            pref_category = 'group', // the event "type" label can be replaced with other localist values to act as custom categorization (currently supports: 'type','dept','group')
            pref_category_filters = true,
            pref_date_headers = true,
            singleday=false, 
            keyword=false,
            addCal = false //add to google/outlook/ical options
        }) {
        //console.log(arguments);
        // local variables arguments 
        //used in filters
        this.pref_category = pref_category;
        this.pref_category_filters = pref_category_filters;

        this.target = target;
        this.format = format;

        //standard wrapper variables 
        this.wrapperArgs = {};
        this.wrapperArgs.title = title; 
        this.wrapperArgs.heading = heading;
        this.wrapperArgs.filters = {};

        //required by service findall to request localist data
        this.requestArgs = {};
        this.requestArgs.depts=depts;
        this.requestArgs.entries=entries;
        this.requestArgs.format=format; 
        this.requestArgs.group=group;   
        this.requestArgs.singleday=singleday;
        this.requestArgs.keyword=keyword;     
        this.requestArgs.api = api;
        this.requestArgs.pref_allow_rich = pref_allow_rich;
                
        // build event variables required for inner HTML logic 
        this.BE_args = {};
        this.BE_args.supports_rich = false;
        this.BE_args.supports_direction = false;
        this.BE_args.pref_date_headers = pref_date_headers;
        this.BE_args.pref_excerpt_length = pref_excerpt_length;
        this.BE_args.pref_excerpt_length_compact = pref_excerpt_length_compact;   
        this.BE_args.pref_readmore = pref_readmore;    
        this.BE_args.pref_eventdetails = pref_eventdetails;   //is this used?
        this.BE_args.addCal = addCal;
        if (parseFloat(api) >= 2.1) {
            this.BE_args.supports_rich = true; // rich text descriptions (HTML) were added in API 2.1
            this.BE_args.supports_direction = true; // "direction" (asc/desc) was added in API 2.1
        }   
    }

    renderEvents(){
        //add the loading throbber
        this.addThrobber( this.target );
        //test  to see if custom templates are defined
        if ( !('innerTemplate' in this) && !('outerTemplate' in this)){
            //if not set format of template
            this.innerTemplate = standardInner;
            this.outerTemplate = standardWrapper;
            switch(this.format) {
                case 'standard':
                    this.innerTemplate = standardInner;
                    this.outerTemplate = standardWrapper;
                    break;
                case 'compact':
                    this.innerTemplate = compactInner;
                    this.outerTemplate = compactWrapper;
                    break;
                case 'inline_compact':
                    this.innerTemplate = calendarInner;
                    this.outerTemplate = calendarWrapper;
                    break; 
                case 'modern_compact':
                    this.BE_args.pref_excerpt_length = 125;
                    this.innerTemplate = modernCompactInner;
                    this.outerTemplate = modernCompactWrapper;
                    break;  
                case 'modern_standard':
                    this.innerTemplate = moderStandardInner;
                    this.outerTemplate = modernStandardWrapper;
                    break;                                                            
                default:
                    //console.warn("Warning: no format was defined using fallback standard");
            }     
        }else{
            console.log('using custom templates');
        }
        //fetch localist events and build the event nodes
        this.getAndBuildList( );
    }

    /* 
        inserts throbber after target elem
        this is deleted on localList render
     */
    addThrobber( target ){
        const loadingNode = '<div id="loader" class="fadeOut"><span class="fa fa-spin fa-cog"></span></div>';
        document.getElementById(target).insertAdjacentHTML('afterbegin', loadingNode);
        this.c_loader = setTimeout(function(){ 
                document.getElementById('loader').classList.remove('fadeOut'); 
            }, 200); // skip loading animation if under 0.5s
    }

    /* get the events */
    getAndBuildList( ){
        service.findAll( this.requestArgs  )
            .then(eventsObj => {
                this.buildEventsList( eventsObj );
            })
            .catch(error => console.log(error));
    }

    buildEventsList( myObj ){
        let inner = '';
        //loop through each event () => required to give access to 'this'
        myObj.events.forEach( (event) => {
            //built event provides common functions to format the data
            let builtEvent = new BuildEvent(event.event, this.BE_args);
           //console.log( builtEvent );
            //build the filters array does not support multiple filter entries [0]only
            if (this.pref_category_filters) {
                if (this.pref_category == 'type' && builtEvent.type != 0) {
                    this.wrapperArgs.filters[event.filters.event_types[0].name]={
                        'id':event.filters.event_types[0].id,
                        'name': event.filters.event_types[0].name,
                        'pref_category':pref_category
                    };
                }
                else if (this.pref_category == 'dept' && builtEvent.department != 0) {
                    this.wrapperArgs.filters[event.filters.departments[0].name]= {
                        'id':event.filters.departments[0].id,
                        'name':event.filters.departments[0].name,
                        'pref_category':pref_category
                    };
                }
                else if (this.pref_category == 'group' && builtEvent.group_name != '') {   
                    this.wrapperArgs.filters[builtEvent.group_name]= {
                        'id':builtEvent.group_id,
                        'name':builtEvent.group_name,
                        'pref_category':this.pref_category
                    };               
                }
            }

            inner += this.innerTemplate( builtEvent );

        });

        let html = this.outerTemplate(inner, this.wrapperArgs);
      
        //remove loading animation timer
        clearTimeout(this.c_loader);
        //the loader is replaced by html
        //document.getElementById('loader').classList.remove('fadeIn'); 
        document.getElementById(this.target).innerHTML = html;
    }
}