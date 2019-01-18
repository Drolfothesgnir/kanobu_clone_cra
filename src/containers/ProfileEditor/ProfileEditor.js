import React, { Component } from 'react';
import { auth } from '../../firebase.js';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import avatar from '../../assets/images/avatar.jpg';
import classes from '../AuthModal/AuthModal.module.css';

class ProfileEditor extends Component {

  state = {
    file:null
  }

  // submitHandler = () => {
  //   // const {email, password, displayName, fullName} = this.state;

  //   const update = (val) => new Promise((res, rej) => {
  //     switch(val){
  //       case 'displayName':
  //         return auth.currentUser.updateProfile({displayName:val})
  //           .then(() => res(null))
  //           .catch(err => rej(err))

  //       case 'email':
  //         return auth.currentUser.updateEmail(val)
  //           .then(() => res(null))
  //           .catch(err => rej(err))
        
  //       case 'password':
  //         return auth.currentUser.updatePassword(val)
  //         .then(() => res(null))
  //         .catch(err => rej(err))
          
  //       default: res(null)
  //     }
  //   })
  // }

  fileChangeHandler = e => {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = () => this.setState({file:fr.result});
  }

  render() {
    const {user, close} = this.props, {file} = this.state;
    return (
      <>
        <div className={classes.AuthModal}>
          <div className={classes.Head}>
            <label htmlFor='file'>
              <img src={user.image || avatar} alt={user.name}/>
            </label>
            <label htmlFor='file'>
              Choose image
            </label>
            <input 
              onChange={this.fileChangeHandler}
              id='file'
              accept='.png,.gif,.jpg'
              type='file'/>
            
          </div>
        </div>
        <Backdrop show backdropClicked={close}/>
      </>
    );
  }
}

export default ProfileEditor;