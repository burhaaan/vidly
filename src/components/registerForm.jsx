import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import * as userService from '../services/userService';
import { loginWithJwt } from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
      name: '',
    },
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label('Email'),
    name: Joi.string().required().label('Name'),
    password: Joi.string().required().min(5).label('Password'),
  };

  doSubmit = async () => {
    //call the server
    try {
      const response = await userService.register(this.state.data);
      loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}

          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
