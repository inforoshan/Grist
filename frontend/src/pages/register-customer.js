import React from "react";
import {withRouter} from "react-router-dom";

import AuthService from "../services/auth-service";

import M from "materialize-css";
import "../assert/css/register.css";
import swal from "sweetalert";

class RegisterCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.regiser = this.regiser.bind(this);
        this.state = {
            customerType: "1",
            customername: "",
            address: "",
            contact: 0,
            location: "",
            backaccountnumber: "",
            backname: "",
            backbranch: "",
            userName: "",
            password: "",
            email: "",
            catagory:""
        };
    }

    componentDidMount() {
        this.state = {
            customerType: "1",
            customername: "",
            address: "",
            contact: "",
            location: "",
            backaccountnumber: "",
            backname: "",
            backbranch: "",
            userName: "",
            password: "",
            email: "",
            catagory: ""
        };

        document.addEventListener("DOMContentLoaded", function () {
            var elems = document.querySelectorAll("select");
            M.FormSelect.init(elems, {});
        });
    }

    regiser(event) {
        event.preventDefault();

        if (this.state.customerType != 0 &&
            this.state.customername != "" &&
            this.state.address != "" &&
            this.state.contact != "" &&
            this.state.userName != "" &&
            this.state.password != "") {

          AuthService.register(
              this.state.customerType,
              this.state.customername,
              this.state.address,
              this.state.contact,
              this.state.location,
              this.state.backaccountnumber,
              this.state.backname,
              this.state.backbranch,
              this.state.userName,
              this.state.password,
              this.state.email,
              this.state.catagory
          ).then(data => {
            swal({
              title: "User Successfully Registered ",
              text: "Successfully Registered " + this.state.customername,
              icon: "success"

            }).then((success) => {
              this.props.history.push('/');
            });

            console.log("Sing up ", data);
          });

        }
        else {
          swal({
            title: "Please fill the required fields",
            text: "Please try again",
            icon: "error"
          }).then((fail) => {
            window.location.reload();
          });
        }
    }

    render() {
        return (
            <div class="register-container">
                <div class="row full-hight">
                    <form class="col s12 full-hight">
                        <div class="col s3"></div>
                        <div class="col s6 full-hight">
                            <div class="row mid-col-1">
                                <div class="col s2"></div>
                                <div class="col s8 registration-main">
                                    <div class="input-field logo">
                                        <h1 class="register-heading">Grist</h1>
                                    </div>
                                    <div class="input-field category-bropdown">
                                        <select
                                            ref="dropdown"
                                            id="user_category"
                                            class="left-margin register-input"
                                            onChange={(e) =>
                                                this.setState({customerType: e.target.value})
                                            }
                                            value={this.state.customerType}
                                        >
                                            <option value="1">Hotel</option>
                                            <option value="2">Supplier</option>
                                        </select>
                                        <label for="user_category">User Category</label>
                                    </div>
                                    <div className="input-field category-bropdown">
                                        <select
                                            ref="dropdown"
                                            id="user_category"
                                            className="left-margin register-input"
                                            onChange={(e) =>
                                                this.setState({catagory: e.target.value})
                                            }
                                            value={this.state.catagory}
                                        >
                                            <option value="Vagitable">Vagitable</option>
                                            <option value="Fruits">Fruits</option>
                                        </select>
                                        <label htmlFor="user_category">Category</label>
                                    </div>
                                    <div class="input-field">
                                        <input
                                            id="customer_name"
                                            type="text"
                                            class="validate register-input"
                                            onChange={(e) =>
                                                this.setState({customername: e.target.value})
                                            }
                                            value={this.state.customername}
                                            required={true}
                                        />
                                        <label for="customer_name">Customer Name</label>
                                    </div>
                                    <div class="input-field">
                                        <input
                                            id="address"
                                            type="text"
                                            class="validate register-input"
                                            onChange={(e) =>
                                                this.setState({address: e.target.value})
                                            }
                                            value={this.state.address}
                                            required={true}
                                        />
                                        <label for="address">Address</label>
                                    </div>
                                    <div class="input-field">
                                        <input
                                            id="contact"
                                            type="number"
                                            class="validate register-input"
                                            onChange={(e) =>{
                                                if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
                                                this.setState({contact: e.target.value});
                                            }

                                            }
                                            maxLength={10}
                                            value={this.state.contact}
                                            required={true}
                                        />
                                        <label for="contact">Contact</label>
                                    </div>
                                    <div class="input-field">
                                        <input
                                            id="user_name"
                                            type="text"
                                            class="validate register-input"
                                            onChange={(e) =>
                                                this.setState({userName: e.target.value})
                                            }
                                            value={this.state.userName}
                                            required={true}
                                        />
                                        <label for="user_name">User Name</label>
                                    </div>
                                    <div class="input-field">
                                        <input
                                            id="password"
                                            type="password"
                                            class="validate register-input"
                                            onChange={(e) =>
                                                this.setState({password: e.target.value})
                                            }
                                            value={this.state.password}
                                            required={true}
                                        />
                                        <label for="password">Password</label>
                                    </div>
                                    <div class="input-field">
                                        <input
                                            id="email"
                                            type="email"
                                            class="validate register-input"
                                            onChange={(e) => this.setState({email: e.target.value})}
                                            value={this.state.email}
                                        />
                                        <label for="email">Email</label>
                                    </div>
                                    <div class="input-field">
                                        <div class="row s12">
                                            <div class="col s12">
                                                <button
                                                    class="btn btn-register waves-effect waves-light regiter-button"
                                                    onClick={(event) => this.regiser(event)}
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
                        </div>
                        <div class="col s3"></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterCustomer);
