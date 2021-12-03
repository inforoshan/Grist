import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import '../../assert/css/home.css';
import AuthService from "../../services/auth-service";

class SupplierHome extends Component {

    constructor(props) {
        super(props);
        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Supplier') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            role:user.role
        }
    }

    manageRawMaterial(e) {
        this.props.history.push("/addRawMaterial");
    }

    viewOrder(){
        this.props.history.push("/view-order-main");
    }

    feedback(){
        this.props.history.push("/view-feedback");
    }

    reports(){
        this.props.history.push("/view-reports");
    }

    user(){
        this.props.history.push("/user-management");
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className={'row'}>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={(e) => this.manageRawMaterial(e)}>
                            <div className={'row center'}>
                                <i className="material-icons">add_box</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    Manage Raw Materials
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewOrder()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    View Orders
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.feedback()}>
                            <div className={'row center'}>
                                <i className="material-icons">feedback</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    Feedback & Rating
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.reports()}>
                            <div className={'row center'}>
                                <i className="material-icons">insert_chart</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    Reports
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col s3' } hidden={this.state.role !== "Admin"}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.user()} hidden={AuthService.getCurrentUser().roleName === "user" }>
                            <div className={'row center'}>
                                <i className="material-icons">group</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    User Management
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>

                    </div>
                    <div className={'col s3'}>

                    </div>
                    <div className={'col s3'}>

                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default withRouter(SupplierHome);
