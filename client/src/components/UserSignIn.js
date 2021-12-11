import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
  constructor() {
  super();
  this.state = {
    // emailAdress and password are requirements to create a user
    emailAddress: '',
    password: '',
    errors: [],
  }
}

//Change handler
change = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  this.setState(() => {
    return {
      [name]: value
    };
  });
}

//submit handler
submit = () => {
  const { context } = this.props;
  const { from } = this.props.location.state || { from: { pathname: '/' } };
  const { emailAddress, password } = this.state;
//call the signIn method from Data.js
  context.actions.signIn(emailAddress, password)
    .then((user) => {
      if (user === null) {
        this.setState(() => {
          return { errors: [ 'Sign-in was unsuccessful' ] };
        });
      } else {
        this.props.history.push(from.pathname);
      }
    })
    .catch((error) => {
      console.error(error);
      this.props.history.push('/error');
    });
}

//Cancel handler - return to the main page
cancel = () => {
  this.props.history.push('/');
}

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
     <main>
        <div className="form--centered">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <Fragment>
                <label htmlfor='emailAddress'>Email Address</label>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email" />
                <label htmlFor='password'>Password</label>
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
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
     </main>
    );
  }

}

export default UserSignIn;

/**
 * UserSignIn :
 *  The component renders a form allowing the user to sign in using their existing account information, 
 *  a "Sign In" button that when clicked signs in the user,
 *  and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
 */