import React , {Component, Fragment}from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return (
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <Link to="/">Courses</Link>
                    </h1>
                    <nav>
                        {authUser ? (
                            <Fragment>
                                <ul className="header--signedin">
                                    <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
                                    <li><Link to="/signout">Sign Out</Link></li>
                                </ul>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <ul className="header--signedout">
                                    <li><Link to="/signup">Sign Up</Link></li>
                                    <li><Link to="/signin">Sign In</Link></li>
                                </ul>
                            </Fragment>
                        )}
                    </nav>
                </div> 
            </header>
        )
    }
}

export default Header;
/**
 * Header:
 *  The component renders the top menu bar and buttons for signing in and signing up 
 *  (if there's not an authenticated user) or the user's name and a button for signing out 
 *  (if there's an authenticated user).
 */