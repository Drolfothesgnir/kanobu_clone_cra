import React from 'react';

import classes from './Spinner.module.css';

const Spinner = () => {

    const {
        skCube,
        skCube1,
        skCube2,
        skCube3,
        skCube4
    } = classes;

    return (
        <div className={classes.skFoldingCube}>
            <div className={[skCube1 , skCube].join(' ')}></div>
            <div className={[skCube2 , skCube].join(' ')}></div>
            <div className={[skCube4 , skCube].join(' ')}></div>
            <div className={[skCube3 , skCube].join(' ')}></div>
        </div>
    );
};

export default Spinner;