import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {
 constructor(){
   super();
   this.state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
    }
  }
 
//Change
 change = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  this.setState(() => {
    return {
      [name]: value
    };
  });
}
//Submit function
  submit = () => {
    const { context } = this.props;
    const { firstName, 
            lastName,
            emailAddress, 
            password
          } = this.state;
    // New user payload
    const user = {
        firstName, 
        lastName,
        emailAddress, 
        password
    };
    //call the createUser() method from Data.js
    context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
            this.setState({ errors })
        } else {
          //if the user alredy exists, redirects to the sign in
            context.actions.signIn(emailAddress, password)
            .then(()=> {
              this.props.history.push('/');
            })
        }
      })
      .catch( err => { 
        console.log(err);
        this.props.history.push('/error');
      });  
  } 
//Cancel function
  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
        <div className="form--centered">
          <h2>Sign Up</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <Fragment>
                <label htmlFor="firstName">First Name</label>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <label htmlFor="lastName">Last Name</label>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text"
                    value={emailAddress} 
                    onChange={this.change} 
                    placeholder="Email Adress" />
                <label htmlFor="password">Password</label>
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
    );
  }
}

export default UserSignUp;

/**
 * UserSignUp :
 *  The component renders a form allowing a user to sign up by creating a new account, 
 *  a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and 
 *  signs in the user, and a "Cancel" button that returns the user to the default route 
 *  (i.e. the list of courses).
 */