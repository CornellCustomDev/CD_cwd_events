import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import Standard from './components/standard';
import Compact from './components/compact';
import ModernStandard from './components/modern_standard';
import ModernCompact from './components/modern_compact';
import Classic from './components/classic';
import ClassicCompact from './components/classic_compact';
import InlineCompact from './components/inline_compact';
import localistApiConnector from './services/localistApiConnector'


/**
 * Localist Component
 */
class Localist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            llPage: {},
            depts: props.depts,
            entries: props.entries,
            format: props.format,
            group: props.group,
            keyword: props.keyword,
            daysahead: props.daysahead,
            page: props.page,
            loading: true,
        };
        this.formatOptions = [
            'standard',
            'compact',
            'modern_compact',
            'modern_standard',
            'inline_compact',
            'classic'
        ];
        this.curPage = 1;
        this.handlePageClick = this.handlePageClick.bind(this)

    }

    componentDidMount(){
        const {page} = this.props
        this.getEvents(page);
    }

    getComponentFromFormat(){
        let component;
        const {events, page, loading} = this.state;
        const {
            format,
            heading,
            filterby,
            wrapperclass,
            listclass,
            itemclass,
            hidedescription,
            truncatedescription,
            hideimages,
            hideaddcal,
        } = this.props;
        if (loading){
            return (
                <div className="loader p-4">
                    <span className="fa fa-spin fa-cog"></span>
                </div>
            )
        }
        switch (format) {
            case 'standard':
                component = <Standard
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby}
                    wrapperclass = {wrapperclass}
                    listclass = {listclass}
                    itemclass = {itemclass}
                    hidedescription = {hidedescription}
                    truncatedescription = {truncatedescription}
                    hideimages = {hideimages}
                    hideaddcal = {hideaddcal}
                />
                break;
            case 'compact':
                component = <Compact
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby}
                    wrapperclass = {wrapperclass}
                    listclass = {listclass}
                    itemclass = {itemclass}
                    hidedescription = {hidedescription}
                    truncatedescription = {truncatedescription}
                    hideimages = {hideimages}
                    hideaddcal = {hideaddcal}
                />
                break;
            case 'modern_standard':
                component = <ModernStandard
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby}
                    wrapperclass = {wrapperclass}
                    listclass = {listclass}
                    itemclass = {itemclass}
                    hidedescription = {hidedescription}
                    truncatedescription = {truncatedescription}
                    hideimages = {hideimages}
                    hideaddcal = {hideaddcal}
                />
                break;
            case 'modern_compact':
                component = <ModernCompact
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby}
                    wrapperclass = {wrapperclass}
                    listclass = {listclass}
                    itemclass = {itemclass}
                    hidedescription = {hidedescription}
                    truncatedescription = {truncatedescription}
                    hideimages = {hideimages}
                    hideaddcal = {hideaddcal}
                />
                break;
            case 'inline_compact':
                component = <InlineCompact
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby}
                    wrapperclass = {wrapperclass}
                    listclass = {listclass}
                    itemclass = {itemclass}
                    hidedescription = {hidedescription}
                    truncatedescription = {truncatedescription}
                    hideimages = {hideimages}
                    hideaddcal = {hideaddcal}
                />
                break;
            case 'classic':
                component = <Classic
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby}
                    wrapperclass = {wrapperclass}
                    listclass = {listclass}
                    itemclass = {itemclass}
                    hidedescription = {hidedescription}
                    truncatedescription = {truncatedescription}
                    hideimages = {hideimages}
                    hideaddcal = {hideaddcal}
                />
                break;
            case 'classic_compact':
                component = <ClassicCompact
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby}
                    wrapperclass = {wrapperclass}
                    listclass = {listclass}
                    itemclass = {itemclass}
                    hidedescription = {hidedescription}
                    truncatedescription = {truncatedescription}
                    hideimages = {hideimages}
                    hideaddcal = {hideaddcal}
                />
                break;
            default:
                break;
        }
        return component;

    }

    getEvents(page){
        setTimeout(function() {
            if (this.curPage !== page){
                this.setState({loading: true})
            }
        }.bind(this), 400)

        const {
            depts,
            entries,
            format,
            group,
            keyword,
            daysahead,
        } = this.state
        const {
            apikey,
            calendarurl,
        }= this.props
        localistApiConnector(
            depts,
            entries,
            format,
            group,
            keyword,
            daysahead,
            apikey,
            calendarurl,
            page,
        )
            .then(response => {
                if (typeof response.data.events !== 'undefined') {
                    console.warn(response.data.page.current, response.data);
                    this.setState({
                        events: response.data.events,
                        llPage: response.data.page,
                        loading: false,
                        page: page,
                    });
                    this.curPage = response.data.page.current
                } else {
                    console.warn('localist returned invalid data');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    handlePageClick(data){
        const newPage = data.selected + 1;
        this.getEvents(newPage);
    }

    renderPagination(){
        const {hidepagination} = this.props
        const {llPage} = this.state
        const {total} = llPage
        if (!total || hidepagination === 'true'){
            return '';
        }

        return (
            <nav className="pager">
                <ReactPaginate
                    previousLabel="previous"
                    nextLabel="next"
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={total}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName="pager_items"
                    subContainerClassName="pager__item"
                    activeClassName="is-active"
                />
            </nav>
        )
    }

    renderHeading(){
        const {heading} = this.props;
        const renderHeading = heading ? <h2>{heading}</h2> : ''
        return renderHeading;
    }


    render() {
        return (
            <div>
                { this.renderHeading() }
                { this.getComponentFromFormat() }
                { this.renderPagination() }
            </div>
        );
    }
}

Localist.propTypes = {
    heading: PropTypes.string,
    calendarurl: PropTypes.string.isRequired,
    apikey: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    entries: PropTypes.string.isRequired,
    daysahead: PropTypes.string,
    depts: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    hidedescription: PropTypes.string.isRequired,
    truncatedescription: PropTypes.string.isRequired,
    hideimages: PropTypes.string.isRequired,
    hideaddcal: PropTypes.string.isRequired,
    hidepagination: PropTypes.string,
    filterby: PropTypes.string,
    wrapperclass: PropTypes.string,
    listclass: PropTypes.string,
    itemclass: PropTypes.string,
    page: PropTypes.number,
};


Localist.defaultProps = {

    daysahead : '365',
    heading: '',
    filterby: 'group',
    pagination: 'true',
    wrapperclass: '',
    listclass: '',
    itemclass: '',
    page : 1,
};

export default Localist;
