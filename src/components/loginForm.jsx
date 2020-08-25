import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { login, getCurrentUser } from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };
  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      //call the server
      await login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}

          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
