import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import AuthService from "../../../services/auth-service";
import OrderService from "../../../services/order-service";
import CommonTools from "../../../services/common-tools";

import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

class IncomeReport extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Supplier') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            customerId: user.customerId,
            rawId: 0,
            orderData: [],
            totalPrice: 0.00,
            startDate: new Date().toLocaleDateString(),
            endDate: new Date().toLocaleDateString(),
        }
    }

    componentDidMount() {
    }

    findOrderData(startDate, endDate) {

        OrderService.getOrdersByDate(startDate, endDate, this.state.customerId, 'DELIVERED', 'Supplier').then(response => response.data).then(data => {

            this.setState({
                orderData: data
            });

            if (this.state.orderData !== undefined) {
                let totalPrice = 0.00;

                data.forEach(orders => {
                    totalPrice += orders.price
                });
                this.setState({totalPrice: totalPrice});
            }
        });
    }

    view(e) {
        e.preventDefault();
        console.log("Start date", this.state.startDate);
        console.log("End date", this.state.endDate);
        this.findOrderData(this.state.startDate, this.state.endDate);
    }

    fromDate(e)
    {

        let todayDate = new Date();
        let startDate = new Date(e.target.value);
        let endDate = new Date(this.state.endDate);

        if(todayDate < startDate)
        {
            alert("Sorry !! you can't select a future date");
            this.setState({startDate: ""});
        }
        else if(startDate > endDate)
        {
            alert("Sorry !! start date should come before end date");
            this.setState({startDate: ""});
        }
        else
        {
            this.setState({startDate: e.target.value});
        }

    }

    toDate(e)
    {
        let todayDate = new Date();
        let endDate = new Date(e.target.value);
        let startDate = new Date(this.state.startDate);

        if(todayDate < endDate)
        {
            alert("Sorry !! you can't select a future date");
            this.setState({endDate: ""});
        }
        else if(startDate > endDate)
        {
            alert("Sorry !! start date should come before end date");
            this.setState({endDate: ""});
        }
        else
        {
            this.setState({endDate: e.target.value});
        }

    }

    render() {

        const {orderData} = this.state;

        return (
            <>
                <Navbar/>
                <div className={'container'}>
                    <div className={'row '}>
                        <form>
                            <div className="col s4">
                                <label >From: </label>
                                <input type="datetime-local" id="start" name="trip-start"
                                       value={this.state.startDate}
                                       onChange={(e) => this.fromDate(e)}/>

                            </div>
                            <div className="col s4">
                                <label className={''}>To: </label>
                                <input type="datetime-local" id="end" name="trip-start"
                                       value={this.state.endDate}
                                       onChange={(e) => this.toDate(e)}/>

                            </div>
                            <div className="input-field col s4">
                                <button
                                    className="btn waves-effect waves-light raw-material-ui-buttons"
                                    onClick={(e) => this.view(e)}>View
                                </button>

                            </div>
                        </form>
                    </div>
                    <div className={'raw_home'}>
                        <table className={'highlight'}>
                            <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Customer Name</th>
                                <th>Order Date</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderData.map((data) => {
                                    return <tr>
                                        <td>{data.orderLinePK.orderId}</td>
                                        <td>{data.customerName}</td>
                                        <td>{data.orderDate}</td>
                                        <td>{CommonTools.numberFormat(data.price)}</td>
                                    </tr>
                                })
                            }
                            {

                                <tr>
                                    <td className={'center'} colSpan={3}>
                                        Total Amount
                                    </td>
                                    <td>
                                        {CommonTools.numberFormat(this.state.totalPrice)}
                                    </td>
                                </tr>
                            }

                            </tbody>

                        </table>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default withRouter(IncomeReport);
