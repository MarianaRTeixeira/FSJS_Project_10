export default class Data {
  /** *** **
   ** API **
   ** *** **/
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const apiBaseUrl = 'http://localhost:5000/api'
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  /** ***** ********* **
   ** Users Functions **
   ** ***** ********* **/

  //Get an user
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //Create a new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  /** ******* ********* **
   ** Courses functions **
   ** ******* ********* **/

  //Get all the available courses
  async getCourses() {
    const response = await this.api('/courses', 'GET', null);

    if (response.status === 200) {
      return response.json().then(data => data)
    } else if (response.status === 400) {
      return null
    } else {
      throw new Error();
    }
  }
  //get a specific course
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);

    if (response.status === 200) {
      return response.json().then(data => data)
    } else if (response.status === 400) {
      return new Error('Not found')
    } else {
      throw new Error();
    }
  }
  //Create a course 
  async createCourse(course, emailAddress, password)  {
    const res = await this.api('/courses', 'POST', course, true, { emailAddress, password });
    if (res.status === 201) {
      return [];
    }
    else if (res.status === 400) {
      return res.json().then(data => {
        return data.errors;
      });

    } else {
      throw new Error();
    }
  }
  //Edit a course
  async updateCourse(course, emailAddress, password) {
    const res = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
    if (res.status === 204) {
      return []

    } else if (res.status === 400) {
      return res.json().then(
        data => {
          return data
        });
    } else {
      throw new Error();
    }
  }
  //Delete COurse
  async deleteCourse(id, emailAddress, password) {
    const res = await this.api(`/courses/${id}`, 'DELETE', null , true, { emailAddress, password });
    if (res.status === 204) {
      return []

    } else if (res.status === 400) {
      return res.json().then(
        data => {
          return data
        });
    } else {
      throw new Error();
    }
  }

}