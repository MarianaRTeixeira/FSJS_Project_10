import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  constructor(){
     super();
     this.state = {
       course: {},
     }
  }
//check if the component output has been rendered to the DOM
  componentDidMount() {
      const { context } = this.props;
      const id = this.props.match.params.id;
      //calls the method getCourse(id) from Data.js
        context.data.getCourse(id)
          .then((courseData)=> {
            if(courseData) {
                this.setState({
                course: courseData,
                })
            } else {
                this.props.history.push('/notfound')
            }
          })
          .catch(error => {
          console.log(error);
              this.props.history.push('/error');
          })
  }

//delete function : if the user is authenticated and is the owner of the course he can deleted;
  delete = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const id = this.props.match.params.id;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password; 

 //use the function 
      context.data.deleteCourse(id, emailAddress, password)
          .then(dataErrors => {
              if (dataErrors.length) {
                  console.log(`${dataErrors}`);
              } else {
                  this.props.history.push('/');
                  console.log('Deleted with success')
              }
          })
          .catch(err => {
              console.log(err);
              this.props.history.push('/error')
          });
  }

render() {
    const id = this.props.match.params.id;
    const {
        User,
        title,
        description,
        materialsNeeded,
        estimatedTime,
        userId
    } = this.state.course;
    
    const { context } = this.props;
    const authUser = context.authenticatedUser;
//if the user is not autheticated and not the creator of the course, the data is fecth at the API db
    let firstName, lastName ;
    if (User) {
        firstName = User.firstName;
        lastName = User.lastName;
    }
      return (
        <main>
          <div className='actions--bar'>
              {
                (() => {
                  if (authUser) {
                    if (authUser.id === userId) {
                      return (
                        <Fragment>
                          <Link className='button' to={`/courses/${id}/update`}>Update Course</Link>
                          <Link className='button' to='#' onClick={this.delete}>Delete Course</Link>
                          <Link className='button button-secondary' to='/'>Return to List</Link>
                        </Fragment>
                      )
                    } else {
                      return (
                        <Fragment>

                          <Link className='button button-secondary' to='/'>Return to List</Link>
                        </Fragment>
                      )
                    }
                  }
                  else {
                    return (
                      <Fragment>
                        <Link className='button button-secondary' to='/'>Return to List</Link>
                      </Fragment>
                    )
                  }
                })()
              }
          </div>
          <div className='wrap'>
            <h2>Course Detail</h2>
            
              <div className='main--flex'>
                <div>
                  <h3 className='course--detail--title'>Course</h3>
                  <h4 className='course--name'>{title}</h4>
                  <p>By {`${firstName}`} {`${lastName}`}</p>
                  {/*  Use react markdown to list the description */}
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
                <div>
                  <h3 className='course--detail--title'>Estimated Time</h3>
                  <p>{estimatedTime}</p>
                  <h3 className='course--detail--title'>Materials Needed</h3>
                  <ul className='course--detail--list'>
                    <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                  </ul>
                </div>
              </div>
            </div>
        </main>
      );
    };
}

export default CourseDetail;

/** 
 * CourseDetail:
 *  The component retrieves the detail for a course from the REST API, renders the course details,
 *  an "Update Course" button for navigating to the "Update Course" screen, 
 *  and a "Delete Course" button that when clicked sends a DELETE request to the REST API to delete a course.
 */