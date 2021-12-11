import React, { Component, Fragment } from 'react';
import Form from './Form';

class UpdateCourse extends Component{
    constructor(){
    super();
    this.state={
        id:'',
        title:'',
        description:'',
        estimatedTime:'',
        materialsNeeded:'',
        userId:null,
        errors:[]
        }
    };
//check if the component output has been rendered to the DOM
    componentDidMount() {
        const { context } = this.props;
        const id = this.props.match.params.id;
        const authUser = context.authenticatedUser;
        const authUserId = authUser.id;
        
        context.data.getCourse(id) 
            .then((data)=>{
                if(data){
                    if(data.userId === authUserId){
                        this.setState ({
                            id: data.id,
                            title: data.title,
                            description: data.description,
                            estimatedTime:data.estimatedTime,
                            materialsNeeded:data.materialsNeeded,
                            userId:data.userId,
                        })
                    } else {
                        // if the user is not the creator the forbidden page will render
                        this.props.history.push('/forbidden')
                    }
                } else {
                    this.props.history.push('/notfound')
                }
            })
            .catch(error => {
                console.log(error);
                  this.props.history.push('/error');
            })
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

    //cancel --> return to the detail page
    cancel = () => {
        this.props.history.push(`/courses/${this.state.id}`)
    }

    //submit
    submit = () => {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password; 
    
        const {
            id,
            title, 
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;
    
        const updatedCourse = {
            id,
            title,
            description, 
            estimatedTime,
            materialsNeeded,
            userId: authUser.id
        }
//updateCourse method --> Data.js
        context.data.updateCourse(updatedCourse, emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    this.setState({
                        errors: errors
                    });
                } else {
                    this.props.history.push(`/courses/${updatedCourse.id}`);
                }
            })
            .catch(err => {
                console.log(`There has been an error: ${err}`)
                this.props.history.push('/error');
            });  
    }

    render(){
        const {
            title,
            description,
            materialsNeeded,
            estimatedTime,
            errors
        } = this.state;

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return(
            <div className='wrap'>
                <h2>Update Course </h2>
                <Form 
                cancel = {this.cancel}
                submit = {this.submit}
                errors = {errors}
                submitButtonText = 'Update Course'
                elements={() => (
                    <div className='main--flex'>
                        <Fragment>
                            <div>
                                <label htmlFor='title'>{title}</label>
                                <input id='title' name='title' type='text' value={title} onChange={this.change}/>
                                <p>By {authUser.firstName} {authUser.lastName}</p>
                                <label htmlFor='description'>Description</label>
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
                            </Fragment>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default UpdateCourse;

/**
 * UpdateCourse :
 *  The component renders a form allowing a user to update one of their existing courses, 
 *  an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route, 
 *  and a "Cancel" button that returns the user to the "Course Detail" screen.
 */