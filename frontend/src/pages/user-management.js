import React from "react";
import {withRouter} from "react-router-dom";

import Navbar from '../components/navbar';

import AuthService from '../services/auth-service';

import M from "materialize-css";
import "../assert/css/rowmaterial.css";
import UserService from "../services/user-service";

class UserManagement extends React.Component {

    constructor(props) {
        super(props);

        document.addEventListener("DOMContentLoaded", function () {
            var elems = document.querySelectorAll("select");
            M.FormSelect.init(elems, {});
        });

        this.message = '';
        const user = AuthService.getCurrentUser();

        if (!user || user.role !== 'Admin') {
            if(user.customerType !== 'Supplier')
            {
                this.props.history.push("/supplier");
                window.location.reload();
            }
            else
            {
                this.props.history.push("/hotel");
                window.location.reload();
            }
        }

        this.state = {
            userId: 0,
            customerId: AuthService.getCurrentUser().customerId,
            userName: "",
            password: "",
            email: "",
            role:2,
            userData:[]
        };

    }

    componentDidMount() {
        UserService.getUserDataByCustomerId(this.state.customerId).then(response => {
            this.setState({
                userId: 0,
                userData: response.data
            });
        });
    }

    register(event) {

        event.preventDefault();

        if(this.state.userName !== "" && this.state.password !== "" && this.state.email !== "")
        {
            if (this.state.userId === 0) {
                console.log("Resgister", this.state);
                UserService.register(this.state);
                this.componentDidMount();
                window.location.reload();
            }
            else
            {
                console.log("Update", this.state);
                UserService.update(this.state).then((response) => {
                    alert(response.data.toString())
                });

                this.componentDidMount();
                window.location.reload();
            }

        }
        else
        {
            alert("Please fill the required field !!!");
        }

    }

    editUsers(id) {

        UserService.getUserDataById(id).then(response => {

            this.state = {
                userId: response.data.userId,
                userName: response.data.userName,
                password: response.data.password,
                email: response.data.email,
                role:response.data.role
            };
        });
    }

    delete(id) {
        UserService.delete(id).then((response) => {
            this.componentDidMount();
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div class="valign-wrapper row middle-box">
                    <div class="col s4 card hoverable l3">
                        <form>
                            <div class="card-content">
                                <span class="card-title"></span>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <select
                                            ref="dropdown"
                                            id="unit_type"
                                            onChange={(e) =>
                                                this.setState({role: e.target.value})}
                                            value={this.state.role}
                                        >
                                            <option value={2}>Admin</option>
                                            <option value={3}>User</option>
                                        </select>
                                        <label for="unit_type" className={'required'}>Role</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <label for="material_name" className={'required'}>User Name</label>
                                        <input
                                            type="text"
                                            class="validate"
                                            name="materialname"
                                            onChange={(e) => this.setState({userName: e.target.value})}
                                            value={this.state.userName}
                                        />
                                    </div>
                                    <div class="input-field col s12">
                                        <label for="unit_price" className={'raw-material-edit required'}>Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="validate register-input password-user"
                                            onChange={(e) =>
                                                this.setState({password: e.target.value})
                                            }
                                            value={this.state.password}
                                            required={true}
                                        />
                                    </div>
                                    <div class="input-field col s12">
                                        <label for="email" className={'raw-material-edit required'}>Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="validate register-input password-user"
                                            onChange={(e) => this.setState({email: e.target.value})}
                                            value={this.state.email}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div class="card-action">
                                <button
                                    class="btn btn-register waves-effect waves-light raw-material-ui-buttons"
                                    onClick={(event, id) => this.register(event)}
                                >
                                    Add User
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                            <div>
                                <lable>{this.message}</lable>
                            </div>
                        </form>
                    </div>
                    <div class="col s8 table-user">
                        <table class="bordered highlight">
                            <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Created Date</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.userData.map(userData =>
                                    <tr key={userData.userId}>
                                        <td>{userData.userName}</td>
                                        <td>{userData.role ===2 ? "Admin" : "User"}</td>
                                        <td>{userData.email}</td>
                                        <td>
                                            <button
                                                className="btn waves-effect" title="Edit"
                                                onClick={(event => this.editUsers(userData.userId))}><i
                                                className="material-icons">edit</i>
                                            </button>
                                            <button
                                                className="btn waves-effect delete-button-raw" title="Delete"
                                                onClick={(event => this.delete(userData.userId))}><i
                                                className="material-icons">delete</i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UserManagement)