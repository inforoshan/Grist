import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import AuthService from "../../services/auth-service";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

class OrderMainView extends Component {

    constructor(props) {
        super(props);
        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Supplier') {
            this.props.history.push("/");
            window.location.reload();
        }
    }

    viewLatestOrders(){
        this.props.history.push("/view-orders");
    }

    viewAcceptedOrders(){
        this.props.history.push("/view-orders-accepted");
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className={'row'}>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewLatestOrders()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    View Latest Orders
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewAcceptedOrders()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    View Accepted orders
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

export default withRouter(OrderMainView);
