import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };
  }

  state = {
    authenticatedUser: null,
  };

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        cancel: this.cancel,
        submit: this.submit,
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
  
    //user authentication method
    signIn = async( emailAddress, password )=>{
      const user = await this.data.getUser(emailAddress, password);
      const userPassword = password;
      if (user !== null) {
        this.setState(() => {
          user.password = userPassword;
          return {
            authenticatedUser: user,
          };
        });
        const cookieOptions = {
          expires: 1 // 1 day
        };
        Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
      }
      return user;
    }
    
  //user sing out 
  signOut = () => {
    //This removes the name and username properties from state – the user is no longer authenticated and cannot view the private components.
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }


}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
