import React, { Fragment } from "react";
import Joi from "joi-browser";
import { withRouter } from "react-router-dom";
import Form from "./Form";
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
  doSubmit = () => {
    this.props.history.push("/movies");
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
