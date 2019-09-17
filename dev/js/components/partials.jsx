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
    const {thumbnail, photoUrl, title, photoCrop} = props;
    const photo = photoUrl.replace('/huge/', `/${photoCrop}/`);
    if (thumbnail === 'true') {
        return (
            <img
                alt={title}
                height='150'
                src={photo}
                loading='lazy'
            ></img>
        );
    } else{
        return '';
    }
}

EventImg.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    photoCrop:PropTypes.oneOf(['huge', 'big', 'big_square']),
};
EventImg.defaultProps = {
    thumbnail: null,
    photoCrop: 'big',
}

const EventThumbnail = props => {
    const {thumbnail, photoUrl, title, photoCrop} = props;
    if (thumbnail === 'true') {
        return (
            <div className='group-image'>
                <EventImg
                    thumbnail={thumbnail}
                    photoUrl={photoUrl}
                    title={title}
                    photoCrop={photoCrop}
                />
            </div>

        );
    } else{
        return '';
    }
}

EventThumbnail.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    photoCrop:PropTypes.oneOf(['huge', 'big', 'big_square']),
};
EventThumbnail.defaultProps = {
    thumbnail: null,
    photoCrop: 'big',
}

const EventDescription = props =>{
    const {description, title} = props;
    return (
        <p className='description'>
            {description}
            <a
                className='read-more more'
                href={event.localist_url}
                rel='noreferrer noopener'
                target='_blank'
            > read more
                <span className='visually-hidden'> about {title}
                </span>
            </a>
        </p>
    )
}

EventDescription.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

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

EventThumbnail.defaultProps = {
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
