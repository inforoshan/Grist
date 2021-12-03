import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import AuthService from "../../services/auth-service";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

class ViewHotelMainReport extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }

    }

    viewPurchaseReport() {
        this.props.history.push("/view-purchase-report");
    }

    viewMonthlyUsage() {
        this.props.history.push("/view-monthly-usage-report");
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className={'row'}>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewPurchaseReport()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    View Purchase Report
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'col s3'}>
                        <div className="card-panel teal home-page-custom" onClick={() => this.viewMonthlyUsage()}>
                            <div className={'row center'}>
                                <i className="material-icons">view_comfy</i>
                            </div>
                            <div className={'row center'}>
                                <span className="white-text">
                                    View Monthly RawMaterials Usage
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

export default withRouter(ViewHotelMainReport)
