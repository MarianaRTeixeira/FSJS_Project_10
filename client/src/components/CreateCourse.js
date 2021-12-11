import React, { Component, Fragment } from 'react';
import Form from './Form';

class CreateCourse extends Component {
    constructor(){
    super();
    this.state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors : [],
        userId: null
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

//SUBMIT
submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password; 

    const {
        title, 
        description,
        estimatedTime,
        materialsNeeded
        } = this.state;

    const course = {
        title,
        description, 
        estimatedTime,
        materialsNeeded,
        userId: authUser.id
        }

    //to create the course, the user needs to be authenticaded
    context.data.createCourse(course, emailAddress, password)
        .then(errors => {
            if (errors.length) {
                this.setState({
                    errors
                });
            } else {
                this.props.history.push('/');
            }
        })
        .catch(err => {
            console.log(`There has been an error: ${err}`)
            this.props.history.push('/error');
        });  
    }

  
//CANCEL
    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {
            title,
            description,
            materialsNeeded,
            estimatedTime,
            errors
        } = this.state;

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <main>
            <div className='wrap'>
                <h2>Create Course</h2>
                <Form
                    cancel = {this.cancel}
                    submit = {this.submit}
                    errors = {errors}
                    submitButtonText = 'Create Course'
                    elements={() => (
                        <Fragment>
                            <div className='main--flex'>
                                <div>
                                    <label htmlFor='title'>Course Title</label>
                                    <input id='title' name='title' type='text' value={title} onChange={this.change}/>
                                    <p>By {authUser.firstName} {authUser.lastName}</p>
                                    <label htmlFor='description'>Course Description</label>
                                    <textarea id='description' name='description' value={description} onChange={this.change} />
                                </div>
                                
                                <div>
                                {/* Estimated Time */}
                                    <label htmlFor='estimatedTime'>Estimated Time</label>
                                    <input id='estimatedTime' name='estimatedTime' type='text' value={estimatedTime} onChange={this.change}/>
                                {/* Materials needeed */}
                                    <label htmlFor='materialsNeeded'>Materials Needed</label>
                                    <textarea id='materialsNeeded' name='materialsNeeded' value={materialsNeeded} onChange={this.change}></textarea>
                                </div>
                            </div>
                        </Fragment>
                    )}
                    />
            </div>     
                    
        </main>
        )
    
    }
}

export default CreateCourse;

/**
 * CreateCourse :
 *  The component renders a form allowing a user to create a new course, 
 *  a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route, 
 *  and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
 */