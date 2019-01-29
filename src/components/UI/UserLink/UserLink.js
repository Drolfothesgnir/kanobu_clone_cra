import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignOutAlt,
    faEllipsisV,
    faUserEdit,
    faPen,
    faPenAlt,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import { auth } from '../../../firebase';

import { UIConsumer } from '../../../Context/UIContext';
import classes from './UserLink.module.css';

class UserLink extends React.Component {

  state={bodyHidden:true}

  render(){
    const {data:user} = this.props.user,
    {bodyHidden} = this.state;
    return (
        <UIConsumer>
            {({onEnable, onDisable}) => (
                <div className={classes.UserLink}>
                    <div className={classes.Head}>
                    <Link to={`/users/${user.id}`}>
                        <div>
                            <img src={user.image || avatar} alt={user.name}/>
                        </div>
                        <span>{user.name}</span>
                    </Link>
                    <button onClick={() => this.setState(state =>(
                        {bodyHidden:!state.bodyHidden}))}>
                        <FontAwesomeIcon 
                            icon={bodyHidden ? faEllipsisV : faTimes}/>
                    </button>
                    </div>
                    <div className={[classes.Body, bodyHidden && classes.hidden].join(' ')}>
                    <Link to={`/users/${user.id}`}>
                        <div>
                            <img src={user.image || avatar} alt={user.displayName}/>
                        </div>
                        <span>{user.displayName}</span>
                    </Link>
                    <div className={classes.Buttons}>
                        <button
                            onClick={()=>{
                                onDisable('sidenavActive')
                                onEnable('profileEditorActive')
                            }}>
                            Edit profile
                            <FontAwesomeIcon icon={faUserEdit}/>
                        </button>
                        <button
                            onClick={() => auth.signOut()}>
                            Log out
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                        </button>
                    </div>
                    Write:
                    <div className={classes.Links}>
                        <Link to={'/games/reviews/#write'}>
                            Game rewiew
                            <FontAwesomeIcon icon={faPen}/>
                        </Link>
                        <Link to={`/users/${user.id}/#write`}>
                            Post
                            <FontAwesomeIcon icon={faPenAlt}/>
                        </Link>
                    </div>
                    </div>
                </div>
            )}
        </UIConsumer>
    );
  }
}

export default UserLink;