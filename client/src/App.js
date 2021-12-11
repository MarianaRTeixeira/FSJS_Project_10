import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import  withContext  from './Context'

import './styles/reset.css'
import './styles/global.css'

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

import Authenticaded from './components/Authenticaded';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse);

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

const AuthenticadedWithContext = withContext(Authenticaded);



const App = () =>{


return(
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path='/' component={CoursesWithContext} />
        <Route exact path="/" render={() => <Redirect to="/courses" />} />
        <PrivateRoute path='/authenticaded' component={AuthenticadedWithContext} />
        <Route  path='/signIn' component={UserSignInWithContext} />
        <Route  path='/signup' component={UserSignUpWithContext} />
        <Route  path='/signout' component={UserSignOutWithContext} />
       
        <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />

        <Route  exact path="/courses/:id" component={CourseDetailWithContext} />
        
        <Route exact path='/forbidden' component={Forbidden} />
        <Route exact path='/error' component={UnhandledError} />
        <Route component={NotFound} />
      
      </Switch>
  </div>
</Router>
)
}

export default App;
