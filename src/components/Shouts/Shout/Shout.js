import React from 'react';
import { Link } from 'react-router-dom';
import { faCommentAlt , faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import avatar from '../../../assets/images/avatar.jpg';
import classes from '../Editor/Editor.module.css';

const Shout = React.memo((props) => {

    const {
        message, 
        isMine, 
        reply, 
        fullOverview, 
        isAuth, 
        remove
    } = props;

    let time = 'Just now';
    const past = Date.now() - message.createdAt;
    const sOrNull = (d) => d.charAt(d.length - 1) !== '1' ? 's' : '';
    if(past >= 60000) {
        const d = (Math.floor(past / 60000)).toString();
        time = `${d} minute${sOrNull(d)} ago`;
    };
    if(past >= 60000 * 60) {
        const d = (Math.floor(past / (60000 * 60))).toString();
        time = `${d} hour${sOrNull(d)} ago`;
    };
    if(new Date(message.createdAt).getDate() !== new Date().getDate()){
        const d = 
            (new Date().getDate() - new Date(message.createdAt).getDate())
            .toString();
        time = `${d} day${sOrNull(d)} ago`;
    };
    if(new Date(message.createdAt).getMonth() !== new Date().getMonth()){
        const d = 
            (new Date().getMonth() - new Date(message.createdAt).getMonth())
            .toString();
        time = `${d} month${sOrNull(d)} ago`;
    };
    if(new Date(message.createdAt).getFullYear() !== new Date().getFullYear()){
        const d = 
            (new Date().getFullYear() - new Date(message.createdAt).getFullYear())
            .toString();
        time = `${d} year${sOrNull(d)} ago`;
    };
    
    return (
        <div className={classes.Editor}>
            <div className={classes.Head}>
                <div>
                    <img src={message.user.file || avatar} alt={message.user.displayName}/>
                    <b>{message.user.displayName}</b>
                </div>
                <span>{time}</span>
            </div>
            <div className={classes.Body}>
                {isMine && (
                    <button 
                        className={classes.RemoveButton}
                        onClick={()=>remove(message.id)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        Remove
                    </button>
                )}
                <pre>{message.message}</pre>
                {message.url && <img 
                    onClick={() => fullOverview(message.url)}
                    src={message.url} alt={message.id}/>}
                <div className={[classes.Footer, isAuth && classes.reply].join(' ')}>
                    {isAuth && (
                        <button onClick={() =>reply(message.id)}>
                            Reply
                        </button>
                    )}
                    <Link to={`/shouts?${message.id}`}>
                        <span>{message.repliesLength}</span>
                        <FontAwesomeIcon icon={faCommentAlt}/>
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default Shout