import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import AuthService from "../../services/auth-service";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

class ViewHotelOrderMain extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }

    }

    viewOrders() {
        this.props.history.push("/view-hotel-orders");
    }

    viewRejectOrders() {
        this.props.history.push("/view-rejected-orders");
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className={'row'}>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewOrders()}>
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
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewRejectOrders()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    View Reject orders
                                </span>
                            </div>
                        </div>
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

export default withRouter(ViewHotelOrderMain)
