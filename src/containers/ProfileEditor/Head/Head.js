import React, { Component } from 'react';

import { storage, auth } from '../../../firebase';
import avatar from '../../../assets/images/avatar_.jpg';
import classes from './Head.module.css';

const Cropper = React.lazy(() => import('./Cropper/Cropper'));

const initState = {
  file:null,
  cropper:false,
  error:null
}

class Head extends Component {

  state = initState;

  cancelHandler = (error = null) => this.setState({...initState, error})

  fileChangeHandler = e => {
    this.setState({file:e.target.files[0], cropper:true})
  }

  fileResetHandler = e => e.target.value = null;

  changePhotoURLHandler = file => {
    const {data:user, onUserDataChanged} = this.props.user;
    storage.ref(`images/avatars/${user.id}/avatar`)
      .put(file, {contentType:file.type})
      .then(snap => snap.ref.getDownloadURL())
      .then(url => {
        return auth.currentUser.updateProfile({photoURL:url})
          .then(() => onUserDataChanged({...user, image:url}))
          .then(() => this.cancelHandler())
      })
      .catch(error => this.cancelHandler(error))
  }

  render() {
    const {data:user} = this.props.user;
    const {file, cropper} = this.state;
    return (
      <div className={classes.Head}>
        <div>
          <div className={classes.Container}>
            <label htmlFor='file'>
                <img src={user.image || avatar} alt={user.displayName}/>
            </label>
          </div>
          <label htmlFor='file'>Change avatar</label>
        </div>
      <input 
        onClick={this.fileResetHandler}
        accept='.jpg, .png, .gif'
        onChange={this.fileChangeHandler}
        id='file'
        type='file'/>
        {cropper && (
          <React.Suspense fallback={null}>
            <Cropper 
              save={(file)=>this.changePhotoURLHandler(file)}
              cancel={this.cancelHandler}
              file={file}/>
          </React.Suspense>
        )}
      </div>
    );
  }
}

export default Head;