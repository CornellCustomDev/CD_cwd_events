import React from 'react';
import PropTypes from 'prop-types';

const EventTitle = props => {
    const {title, url} = props;
    return (
        <h3>
            <a
                rel='noreferrer noopener'
                target='_blank'
                href={url}
            >
                {title}
            </a>
        </h3>
    )
}

EventTitle.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

const EventDate = props => {
    const {date} = props;
    return(
        <h4 className='meta date'>
            <span className='fulldate'>
                {date}
            </span>
        </h4>
    );
}

EventDate.propTypes = {
    date: PropTypes.string.isRequired,
};

const EventLocation = props => {
    const {locationName} = props;
    if (locationName){
        return <h4 className='meta location'>{locationName}</h4>
    }else{
        return '';
    }
}
EventLocation.propTypes = {
    locationName: PropTypes.string,
};
EventLocation.defaultProps = {
    EventLocation: null,
}

const EventImg = props => {
    const {hideimages, photoUrl, title, photoCrop} = props;
    const photo = photoUrl.replace('/huge/', `/${photoCrop}/`);
    if (hideimages === 'true') {
        return '';
    }
    return (
        <img
            alt={title}
            height='150'
            src={photo}
            loading='lazy'
        ></img>
    );

}

EventImg.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hideimages: PropTypes.string,
    photoCrop:PropTypes.oneOf(['huge', 'big', 'big_square']),
};
EventImg.defaultProps = {
    hideimages: null,
    photoCrop: 'big',
}

const EventThumbnail = props => {
    const {hideimages, photoUrl, title, photoCrop} = props;
    if (hideimages === 'true') {
        return '';
    }
    return (
        <div className='group-image'>
            <EventImg
                hideimages={hideimages}
                photoUrl={photoUrl}
                title={title}
                photoCrop={photoCrop}
            />
        </div>

    );
}

EventThumbnail.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hideimages: PropTypes.string,
    photoCrop:PropTypes.oneOf(['huge', 'big', 'big_square']),
};
EventThumbnail.defaultProps = {
    hideimages: null,
    photoCrop: 'big',
}

const EventDescription = props =>{
    const {description, title, url, hidedescription} = props;

    const descriptionLink = <a
        className='read-more more'
        href={url}
        rel='noreferrer noopener'
        target='_blank'
    > read more
        <span className='visually-hidden'> about {title}
        </span>
    </a>

    return (
        <div className = 'summary'>
            <p className='description'>
                {
                    hidedescription === 'true'
                        ? ''
                        : description
                }
                {
                    hidedescription === 'true'
                        ? ''
                        : descriptionLink
                }
            </p>
        </div>
    )
}

EventDescription.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    hidedescription: PropTypes.string,
};

EventDescription.defaultProps = {
    hidedescription: 'false',
}

const EventTypes = props => {
    const {eventTypes} = props;
    if (eventTypes) {
        return (
            <h4 className="meta type">
                <span className="fa"></span>
                {eventTypes.map(event_type => {
                    return event_type.name
                }).join(', ')}
            </h4>
        )
    }
    else{
        return '';
    }
}
EventTypes.propTypes = {
    eventTypes: PropTypes.array,
};

EventTypes.defaultProps = {
    eventTypes: null,
}


export {
    EventTitle,
    EventDate,
    EventLocation,
    EventThumbnail,
    EventDescription,
    EventTypes,
    EventImg,
};
