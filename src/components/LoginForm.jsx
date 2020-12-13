import React, { Fragment } from "react";
import Joi from "joi-browser";
import { withRouter } from "react-router-dom";
import Form from "./Form";
import auth from '../services/authService';
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = async() => {
    try {      
      const {data} = this.state; 
      await auth.login(data.username,data.password);
      window.location='/'
    } catch (ex) {
      if(ex.response&&ex.response.status===400){
        const errors={...this.state.errors};
        errors.username=ex.response.data;
        this.setState({errors})
      }
    }
  };

  render() {
    return (
      <Fragment>
        <h1> Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </Fragment>
    );
  }
}

export default withRouter(LoginForm);
