import React, { Component } from 'react';

import Providers from '../../components/UI/auth/AuthProviders/AuthProviders';
import Spinner from '../../components/UI/Spinners/Main/Spinner';
import Input from '../../components/UI/FormElement/FormElement';
import classes from './AuthModal.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { auth } from '../../firebase';

class AuthModal extends Component {

  state = {
      login:true,
      formData:{
          email:{
              type:'input',
              value:'',
              config:{
                  type:'email',
                  placeholder:'Email',
                  required:true,
                  maxLength:45
              },
              validatonMessage:'Enter correct email. Max length 45 characters.'
          },
          password:{
              type:'input',
              value:'',
              config:{ 
                  type:'password',
                  placeholder:'Password',
                  required:true,
                  pattern:'^([a-zA-Z0-9@*#]{8,15})$',
                  maxLength:25
              },
              validatonMessage:'Password must contain at least 8 characters , at least 1 number and both lowercase and uppercase letters.'
          }
      },
      formValid:false,
      forgotten:false,
      loading:false,
      error:null
  }

  resetFormData = () => {
      const {formData} = this.state;
      const newData = {...formData};
      Object.keys(formData).forEach(item => {
          const input = {...formData[item]};
          input.value = '';
          newData[item] = input;
      });
      return newData;
  }

  inputChangeHandler = (e , type) => {
      const {formData} = this.state;
      const newFormData= {...formData};
      const input = {...formData[type]};
      input.value = e.target.value;
      newFormData[type] = input;
      this.setState({
          formData:newFormData,
          formValid:this.formEl.checkValidity(),
          error:null
      });
      
  }

  submitHandler = e => {
      e.preventDefault();
      const {formData , login , formValid} = this.state;
      this.setState({loading:true , error:null});
      const email = formData.email.value;
      const password = formData.password.value;
      if(login ){
         return auth.signInWithEmailAndPassword(email , password)
            .then(() => {
              this.setState({error:null , loading:false});
              this.props.close();
            }).catch(error => {
                this.setState({
                    error,
                    formData:this.resetFormData(),
                    loading:false
                });
            })
      }else if(!login && formValid){
          return auth.createUserWithEmailAndPassword(email , password)
            .then(() => {
                this.setState({error:null , loading:false});
                this.props.close();
            }).catch(error => {
                this.setState({
                    error,
                    formData:this.resetFormData(),
                    loading:false
                });
            })
      }
  }

  render() {
      const {formData , formValid , login , loading , error} = this.state;
      const inputs = Object.keys(formData).map(input => {
          return (
              <label key={input}>
                  <Input 
                      type={formData[input].type}
                      change={e => this.inputChangeHandler(e,input)}
                      config={formData[input].config}
                      value={formData[input].value}/>
                  {!login && <p>{formData[input].validatonMessage}</p>}
              </label>
              
          )
      });

      const form = loading ? <Spinner/> : 
      <form 
        onSubmit={this.submitHandler}
        className={!login ? classes.Reg : null}
        noValidate
        ref={form => this.formEl = form}>
        {error && (
            <p className={classes.Error}>{error.message}</p>
        )}
        {inputs}
        <div className={classes.FormSubmit}>
            {
                login && <button
                            className={classes.Forgotten}
                            type='button'
                            onClick={()=>this.setState({forgotten:true})}>
                            Forgot password?
                        </button>
            }
            <button
                className={login ? 
                    [classes.Button , classes.blue].join(' ') 
                        : 
                    [classes.Button , classes.red].join(' ')}
                disabled={(!login && !formValid) || 
                    (!formData.email.value || !formData.password.value)}>
                {login ? 'Login' : 'Registration'}
            </button>
        </div>
    </form>;

      return (
          <>
              <div className={classes.AuthModal}>
                  <div className={classes.Head}>
                      <h2>{login ? 'Login' : 'Registration'}</h2>
                      <button onClick={this.props.close}>
                          &times;
                      </button>
                  </div>
                  {form}
                  {
                    login && 
                    <>
                      <p><span>Sign in with</span></p>
                      <Providers
                        fail={error => this.setState({error})}
                        success={() => this.props.close()}/>
                    </>
                  }
                  <p>
                      <span>
                          {login ? 'Don\'t have an account?' : 'Have an account?'}
                      </span>
                  </p>
                  <button 
                      className={login ?
                         [classes.Button , classes.red].join(' ')
                          : 
                         [classes.Button , classes.blue].join(' ')}
                      onClick={
                      ()=>this.setState(prevState => ({
                        login:!prevState.login,
                        error:null
                      }))
                  }>
                      {login ? 'Sign up' : 'Log in'}
                  </button>
              </div>
              <Backdrop
                  backdropClicked={this.props.close}
                  show/>
          </>      
      );
  }
}

export default AuthModal;