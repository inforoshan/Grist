import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import AuthService from "../../../services/auth-service";
import OrderService from "../../../services/order-service";
import CommonTools from "../../../services/common-tools";

import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

class ItemSalesReport extends Component {
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
            rawMaterialName: ''
        }
    }

    componentDidMount() {
        this.findAll();
    }

    findAll() {

        OrderService.getAllItems(this.state.customerId, 'DELIVERED').then(response => response.data).then(data => {

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

    findOrderByName() {

        OrderService.getOrdersByName(this.state.customerId, 'DELIVERED', this.state.rawMaterialName).then(response => response.data).then(data => {

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
        this.findOrderByName();
    }

    typing(e) {

        if (e.target.value === '') {
            this.findAll();
        } else {
            this.state.rawMaterialName = e.target.value
            this.findOrderByName();
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
                            <div className="input-field col s4">
                                <label className={'material_name'}>Raw Material Name </label>
                                <input type="text"
                                       onChange={(e) => this.typing(e)}/>
                            </div>
                            <div className="input-field col s4">
                                {/*<button*/}
                                {/*    className="btn waves-effect waves-light raw-material-ui-buttons"*/}
                                {/*    onClick={(e) => this.view(e)}>View*/}
                                {/*</button>*/}

                            </div>
                        </form>
                    </div>
                    <div className={'raw_home'}>
                        <table className={'highlight'}>
                            <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Order Date</th>
                                <th>Income</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderData.map((data) => {
                                    return <tr>
                                        <td>{data.rawMaterialName}</td>
                                        <td>{data.quantity}</td>
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

export default withRouter(ItemSalesReport);
