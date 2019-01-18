import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './FullImage.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const FullImage = (props) => {
    return (
        <>
            <div className={classes.FullImage}>
                <img src={props.src} alt={props.src}/>
            </div>
            <button
                className={classes.Close}
                onClick={props.close}>
                <FontAwesomeIcon icon={faTimes}/>
            </button>
            <Backdrop
                backdropClicked={props.close}
                show/>
        </>
    );
};

export default FullImage;