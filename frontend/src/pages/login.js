import React from "react";
import { withRouter } from "react-router-dom";

import AuthService from "../services/auth-service";

import "../assert/css/login.css";
import logo from "../assert/images/logo/logo.png";
import swal from "sweetalert";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      username: "",
      password: "",
      message: "",
    };

    AuthService.logout();
  }

  componentDidMount() {
    this.state = {
      username: "",
      password: "",
      message: "",
    };
  }

  submit(event) {
    event.preventDefault();

    AuthService.login(this.state.username, this.state.password).then(
      (response) => {

        if(response.customerType === 'Hotel')
        {
          this.props.history.push('/hotel');
        }
        else
        {
          this.props.history.push('/supplier');
        }

        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
        });

        swal({
          title: "Please enter valid credentials",
          text: "Please try again with valid user name and password",
          icon: "error"
        }).then((fail) => {
          this.props.history.push('/');
        });

      }
    );
  }

  register(event) {
    event.preventDefault();
    this.props.history.push("/register");
    window.location.reload();
  }

  render() {
    return (
      <div class="login-container">
        <div class="row full-hight">
          <form class="col s12 full-hight">
            <div class="col s3"></div>
            <div class="col s6 full-hight">
              <div class="row common-col"></div>
              <div class="row mid-col">
                <div class="col s2"></div>
                <div class="col s8">
                  <div class="input-field logo">
                    <img src={logo} class="login-logo-img" />
                  </div>
                  <div class="input-field">
                    <i class="material-icons prefix icon-login">account_circle</i>
                    <input required={true}
                      id="user_name"
                      type="text"
                      className="validate login-input"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                      value={this.state.username}
                    />
                    <label for="user_name" class="login-lable">User Name</label>
                  </div>
                  <div class="input-field">
                    <i class="material-icons prefix icon-login">lock</i>
                    <input required={true}
                      id="password"
                      type="password"
                      className="validate login-input"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      value={this.state.password}
                    />
                    <label for="password"  class="login-lable">Password</label>
                  </div>
                  <div class="input-field">
                    <div class="row s12">
                      <div class="col s6">
                        <button
                          class="btn btn-login waves-effect waves-light login-ui-buttons"
                          onClick={this.submit}
                        >
                          Login
                          <i class="material-icons right">send</i>
                        </button>
                      </div>
                      <div class="col s6">
                        <button
                          class="btn btn-register waves-effect waves-light login-ui-buttons"
                          onClick={this.register}
                        >
                          Register
                          <i class="material-icons right">create</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s2"></div>
              </div>
              <div class="row bottom-col"></div>
            </div>
            <div class="col s3"></div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
