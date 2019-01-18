import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Editor.module.css';
import avatar from '../../../assets/images/avatar.jpg';

const Editor = (props) => {

    const {
        user,
        value,
        file,
        change,
        removeFile,
        send,
        chooseFile
    } = props;

    return (
        <div className={classes.Editor}>
                <div className={classes.Head}>
                    <div>
                        <img src={user.image || avatar} alt={user.displayName}/>
                        <b>{user.displayName}</b>
                    </div>
                </div>
                <div className={classes.Body}>
                    <form onSubmit={send}>
                        <textarea 
                            autoFocus
                            onChange={change}
                            value={value}
                            maxLength='300' />
                        <div className={[classes.Footer, classes.reply].join(' ')}>
                            <button>
                                Send
                            </button>
                            <div className={classes.FileInput}>
                                <span>{300 - value.length}</span>
                                {
                                    file ? 
                                    <button 
                                        className={classes.RemoveFile}
                                        onClick={removeFile}
                                        style={{backgroundImage:`url(${file})`}}
                                        type='button'>
                                        <span>&times;</span>
                                    </button> :
                                    <label htmlFor='file'>
                                        <FontAwesomeIcon icon={faCamera}/>
                                        <input 
                                            onChange={chooseFile}
                                            id='file'
                                            accept='.png,.gif,.jpg'
                                            type='file'/>
                                    </label>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default React.memo(Editor);