import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import Standard from './components/standard';
import Compact from './components/compact';
import ModernStandard from './components/modern_standard';
import ModernCompact from './components/modern_compact';
import Archive from './components/archive';
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
            days: props.days,
            page: props.page,
            loading: true,
        };
        props.win.localList = this;
        this.formatOptions = [
            'standard',
            'compact',
            'modern_compact',
            'modern_standard',
            'inline_compact',
            'archive'
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
        const {format, heading, filterby_filters} = this.props;
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
                    filterby= {filterby_filters}
                />
                break;
            case 'compact':
                component = <Compact
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby_filters}
                />
                break;
            case 'modern_standard':
                component = <ModernStandard
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby_filters}
                />
                break;
            case 'modern_compact':
                component = <ModernCompact
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby_filters}
                />
                break;
            case 'inline_compact':
                component = <InlineCompact
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby_filters}
                />
                break;
            case 'archive':
                component = <Archive
                    key = {page}
                    heading= {heading}
                    events= {events}
                    filterby= {filterby_filters}
                />
                break;
            default:
                break;
        }
        return component;

    }

    getEvents(page){
        setTimeout(function() {
            const {page} = this.state;
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
            days,
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
            days,
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
        const {pagination} = this.props
        const {llPage} = this.state
        const {total} = llPage
        if (pagination === 'true'){
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
    win: PropTypes.object.isRequired,
    depts: PropTypes.string.isRequired,
    entries: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    heading: PropTypes.string,
    // // filterby: PropTypes.string.isRequired,
    calendarurl: PropTypes.string.isRequired,
    apikey: PropTypes.string.isRequired,
    // addcal: PropTypes.string.isRequired,
    // // pref_excerpt_length: PropTypes.string,
    pagination: PropTypes.string,
    filterby_filters: PropTypes.string,

    days: PropTypes.string,
    page: PropTypes.number,
};


Localist.defaultProps = {
    page : 1,
    days : '365',
    heading: '',
    filterby_filters: 'type',
    pagination: 'true',
};

export default Localist;
