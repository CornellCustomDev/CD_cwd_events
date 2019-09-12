import React from 'react';
import PropTypes from 'prop-types';

const RenderTitle = props => {
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

RenderTitle.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

const RenderDate = props => {
    const {date} = props;
    return(
        <h4 className='meta date'>
            <span className='fulldate'>
                {date}
            </span>
        </h4>
    );
}

RenderDate.propTypes = {
    date: PropTypes.string.isRequired,
};

const RenderLocation = props => {
    const {locationName} = props;
    if (locationName){
        return <h4 className='meta location'>{locationName}</h4>
    }else{
        return '';
    }
}
RenderLocation.propTypes = {
    locationName: PropTypes.string,
};
RenderLocation.defaultProps = {
    RenderLocation: null,
}

const RenderThumbnail = props => {
    const {thumbnail, photoUrl, title, photoCrop} = props;
    const photo = photoUrl.replace('huge', photoCrop);
    if (thumbnail === 'true') {
        return (
            <div className='group-image'>
                <img
                    alt={title}
                    height='150'
                    src={photo}
                ></img>
            </div>

        );
    } else{
        return '';
    }
}

RenderThumbnail.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    photoCrop:PropTypes.oneOf(['huge', 'big', 'big_square']),
};
RenderThumbnail.defaultProps = {
    thumbnail: null,
    photoCrop: 'big',
}

const RenderDescription = props =>{
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

RenderDescription.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export {
    RenderTitle,
    RenderDate,
    RenderLocation,
    RenderThumbnail,
    RenderDescription
};
