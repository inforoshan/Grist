import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import AuthService from "../../services/auth-service";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

class ViewReports extends Component {

    constructor(props) {
        super(props);
        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Supplier') {
            this.props.history.push("/");
            window.location.reload();
        }
    }

    viewIncome(){
        this.props.history.push("/income-report");
    }

    viewSales(){
        this.props.history.push("/view-item-sales-report");
    }

    viewTop()
    {
        this.props.history.push("/view-top-buyer");
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className={'row'}>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewIncome()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    Income report
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewSales()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    Item sales report
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewTop()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    TopBuyers
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>

                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default withRouter(ViewReports);
