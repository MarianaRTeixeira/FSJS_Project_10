import React , { useEffect }from "react";
import { Redirect } from "react-router";
// eslint-disable-next-line 
export default ({ context }) => {
    useEffect(() =>  context.actions.signOut());
    return (
      <Redirect to="/" />
    );
}

/**
 * UserSignOut :
 *  The component signs out the authenticated user and redirects the user to the default route 
 *  (i.e. the list of courses).
 * */