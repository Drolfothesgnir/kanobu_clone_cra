import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './ProfileEditor.module.css';
import withUser from '../../hoc/withUser';
import Head from './Head/Head';
import Body from './Body/Body';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const ProfileEditor = (props) => {
  return (
    <>
      <div className={classes.ProfileEditor}>
        <button onClick={props.close}>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
        <Head user={props.user}/>
        <Body user={props.user}/>
      </div>
      <Backdrop show backdropClicked={props.close}/>
    </>
  );
};

export default withUser(ProfileEditor);