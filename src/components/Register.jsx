import React, { Fragment } from "react";
import Joi from "joi-browser";
import { withRouter } from "react-router-dom";
import Form from "./Form";
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name:""
    },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    this.props.history.push("/movies");
  };

  render() {
    return (
      <Fragment>
        <h1> Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderButton("Register")}
        </form>
      </Fragment>
    );
  }
}

export default withRouter(RegisterForm);
