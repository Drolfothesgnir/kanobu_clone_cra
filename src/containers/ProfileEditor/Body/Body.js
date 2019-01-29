import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Providers from '../../../components/UI/auth/AuthProviders/AuthProviders';
import firebase, { auth } from '../../../firebase.js';
import classes from './Body.module.css';
import Input from '../../../components/UI/FormElement/FormElement';

class Body extends Component {

  initData = {
    displayName:this.props.user.data.displayName,
    email:this.props.user.data.email,
    password:''
  }

  timeOut = null;

  state = {
    formData:this.initData,
    formValid:false,
    currentPassword:'',
    success:false,
    error:null
  }

  inputChangeHandler = e => {
    const {formData} = this.state;
    const newFormData= {...formData};
    newFormData[e.target.name] = e.target.value;
    this.setState({
      formData:newFormData, 
      formValid:this.refs.form.checkValidity()
    });
  }

  submitHandler = async e => {
    e.preventDefault();
    const {formData, currentPassword} = this.state;
    const {displayName:_displayName, email:_email, password} = formData;
    const dNameNeedUpdate = _displayName !== this.initData.displayName;
    const emailNeedUpdate = _email !== this.initData.email;
    const pwordNeedUpdate = formData.password.trim();
      const updateDisplayName = new Promise((res, rej) => {
        if(dNameNeedUpdate){
          auth.currentUser.updateProfile({displayName:_displayName})
            .then(() => res(_displayName))
        } else res(null);
      });
      const reAuth = email => new Promise((res, rej) => {
        const credential = firebase.auth.EmailAuthProvider.credential(
          email,
          currentPassword
        );
        console.log(credential);
        auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
          .then(data => res(data))
          .catch(error => rej(error))
      });
      return updateDisplayName.then(name => {
        console.log(name)
        if(emailNeedUpdate){
         return reAuth(auth.currentUser.email)
            .then(() => auth.currentUser.updateEmail(_email))
            .then(() => {
              if(emailNeedUpdate && pwordNeedUpdate){
                console.log('both')
                return auth.currentUser.reload()
                .then(() => ([name, auth.currentUser.email]))
              }else return [name, auth.currentUser.email];
            })
        }else return [name, null];
      }).then(([name, email]) => {
        console.log(name)
        if(pwordNeedUpdate){
          if(!email) email = auth.currentUser.email;
          return reAuth(email)
          .then(() => auth.currentUser.updatePassword(password))
          .then(() => ([name, email]))
        }else return [name, email]
      }).then(([name, email]) => {
        if(emailNeedUpdate || dNameNeedUpdate){
          this.props.user.onUserDataChanged({
            ...this.props.user.data,
            displayName:name ? name : auth.currentUser.displayName,
            email:email ? email : auth.currentUser.email
          });
          this.initData = {
            ...this.initData,
            displayName:name ? name : auth.currentUser.displayName,
            email:email ? email : auth.currentUser.email
          };
          console.log(this.initData);
        }
        return this.activatePopup()
      })
      .catch(error => {
        this.setState({formData:this.initData});
        this.activatePopup(error)
      })
  }

  activatePopup = (error = null) => {
    console.log(error);
    const timeOut = setTimeout(this.clearPopupHandler, 7000);
    this.setState(state => 
      ({
        error, 
        success:error ? false : true,
        currentPassword:'',
        formData:{
          ...state.formData,
          password:''
        }
      }),
      () => this.timeOut = timeOut
    );
  }

  clearPopupHandler = () => this.setState(
    {success:false, error:null},
    () => clearTimeout(this.timeOut)
  )

  render() {
    const {formData:fd, formValid, currentPassword, success, error} = this.state;
    const formData = {
      displayName:{
        type:'input',
        config:{
          type:'text',
          placeholder:'Display name',
          minLength:6,
          maxLength:25
        },
        validationMessage:'Enter correct display name. Max length 25 characters.'
      },
      email:{
        type:'input',
        config:{
            type:'email',
            placeholder:'Email',
            maxLength:45,
            pattern:'[^" "]+'
        },
        validationMessage:'Enter correct email. Max length 45 characters.'
      },
      password:{
        type:'input',
        config:{ 
            type:'password',
            placeholder:'Password',
            pattern:'^([a-zA-Z0-9@*#]{8,15})$'
        },
        validationMessage:'Password must contain at least 8 characters , at least 1 number and both lowercase and uppercase letters.'
      }
    };
    const inputs = Object.keys(formData).map(input => {
      return (
        <label key={input} className={classes.Field}>
          <div>
            <Input 
                name={input}
                type={formData[input].type}
                change={this.inputChangeHandler}
                config={formData[input].config}
                value={this.state.formData[input]}/>
            <p>{formData[input].validationMessage}</p>
          </div>
        </label>
      )
    });
    const credential = (
      <label>
        <div>
          <Input 
            config={{
              type:'password',
              maxLength:15,
              placeholder:'Current password'
            }}
            change={e=>this.setState({currentPassword:e.target.value})}
            value={currentPassword}
            type='input'/>
        </div>
         <span>You need to confirm your current password to save this changes</span>
      </label>
    );
    const dataDiff = Object.keys(fd)
      .some(item => fd[item] !== this.initData[item]);

    const needReAuth = fd.email !== this.initData.email || fd.password.trim();
      
    return (
      <div className={classes.Body}>
        <h2>Profile editing</h2>
        <p className={[
              classes.Popup, 
              success ? classes.Success : error ? classes.Error : null
              ].join(' ')}>
              {error ? error.message : 'Saved successfully'}
              <button onClick={this.clearPopupHandler}>
                &times;
              </button>
            </p>
        <form
          onSubmit={this.submitHandler}
          ref='form'
          noValidate>
          <div className={classes.Inputs}>
            {inputs}
            <p>
              Согласен с <Link to='/about' target='_blank'>правилами пользования</Link> сервисами Kanobu Network 
              и принимаю условия <Link to='/about' target='_blank'>соглашения на обработку персональных данных</Link>
            </p>
          </div>
          <div className={classes.Providers}>
              <p>Quick sign in with:</p>
              <Providers
                fail={error => this.activatePopup(error)}/>
          </div>
          <div className={classes.Submitting}>
            {(needReAuth && formValid) && credential}
            <button 
              className={classes.Submit}
              disabled={
                !(needReAuth ? 
                  currentPassword.trim() && formValid && dataDiff :
                  formValid && dataDiff)
                }>
              Save
            </button>
            <button 
              onClick={() => auth.signOut()}
              type='button'>
              Log out
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Body;