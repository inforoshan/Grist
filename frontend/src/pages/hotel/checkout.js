import React from "react";
import {withRouter} from "react-router-dom";

import Paypal from "../../components/paypal";
import CommonTools from "../../services/common-tools";

import '../../assert/css/checkout.css';
import AuthService from "../../services/auth-service";
import Navbar from "../../components/navbar";

class Checkout extends React.Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        const dataCart = JSON.parse(localStorage.getItem('dataCart'));

        console.log('Data card : ', dataCart);

        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }
        let orderLineData = [];

        this.state = {
            amount: 0,
            data: dataCart !== null ? dataCart : this.props.location.state.items,
            delivery: 0,
            orderData: {
                totalAmount: 0,
                transactionToken: '',
                itemQuantity: 0,
                customerId: 0,
                orderLine: []
            }
        }

        this.state.data.forEach(data => {

            this.state.amount += data.selectedQty * data.unitPrice;
            orderLineData.push({
                'quantity': data.selectedQty,
                'unitPrice': data.unitPrice,
                'rawId': data.rawId,
                'supplier': data.supplier
            });
        });

        this.state.orderData = {
            totalAmount: this.state.amount,
            transactionToken: '',
            itemQuantity: dataCart !== null ? dataCart.length : this.props.location.state.items.length,
            customerId: AuthService.getCurrentUser().customerId,
            orderLine: orderLineData
        };

    }

    reduction(id) {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));

        dataCart.forEach(item => {
            if (item.rawId === id) {
                item.selectedQty === 0 || item.selectedQty === 1 ? item.selectedQty = 1 : item.selectedQty -= 1;
            }
        });

        localStorage.setItem('dataCart', JSON.stringify(dataCart));
        window.location.reload();
    }

    increase(id) {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        let flag = false;

        dataCart.forEach(item => {
            if (item.rawId === id) {
                let qty = parseInt(item.selectedQty, 10);
                qty += 1;
                if(qty <= item.quantity)
                {
                    item.selectedQty = qty;
                }
                else
                {
                    flag = true;
                }
            }
        });

        if(flag)
        {
           alert("Can't increase selected quantity exceed the stock quantity !!!");
        }

        localStorage.setItem('dataCart', JSON.stringify(dataCart));
        window.location.reload();
    }

    remove(event, id)
    {

        let dataCart = JSON.parse(localStorage.getItem('dataCart'));

        dataCart.forEach((item, index) => {
            if (item.rawId === id) {
                dataCart.splice(index, 1);
            }
        });

        if(dataCart.length === 0)
        {
            localStorage.setItem('dataCart', JSON.stringify(dataCart));
            this.props.history.push("/MainView");
        }
        else
        {
            localStorage.setItem('dataCart', JSON.stringify(dataCart));
            window.location.reload();
        }

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col s6'}>
                            {
                                this.state.data.map(data => {
                                    return <div className="card horizontal grid-card-checkout ">
                                        <div className="card-image ">
                                            <img className="responsive-img activator card-images checkout-images"
                                                 src={data.image.image}/>
                                        </div>
                                        <div className="card-content card-content-checkout">
                                            <span
                                                className="card-title activator grey-text text-darken-4">{data.rawMaterialName}</span>
                                            <p><b>Price
                                                : {CommonTools.numberFormat(data.selectedQty * data.unitPrice)}</b></p>
                                            <p><b> Quantity <button className={'reduction'}
                                                onClick={() => this.reduction(data.rawId)}>-</button> {data.selectedQty}
                                            </b>
                                                <button className={'increase'} onClick={() => this.increase(data.rawId)}>+</button>
                                            </p>

                                        </div>
                                        <div className={'remove_button'}>
                                            <button className={'cross-button'} onClick={event => this.remove(event,data.rawId)}><i className="material-icons">close</i></button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className={'col center s6'}>
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title"><b>Price Details</b></span>
                                    <table cellSpacing="0" cellPadding="0"
                                           className={'responsive-table view-item-table'}>
                                        <tr>
                                            <td>Products ( {this.state.data.length} )</td>
                                            <td>{CommonTools.numberFormat(this.state.amount)}</td>
                                        </tr>
                                        <tr>
                                            <td>Delivery Charges</td>
                                            <td>{this.state.delivery == 0 ? 'Free' : this.state.delivery}</td>
                                        </tr>
                                        <tr>
                                            <td>Discount</td>
                                            <td>{this.state.amount > 5000 ? this.state.amount*0.05 : 0}</td>
                                        </tr>
                                        <tfoot>
                                        <tr>
                                            <td><b>Total Amount</b></td>
                                            <td className={''}>
                                                <b>{this.state.amount > 5000 ? CommonTools.numberFormat(this.state.amount + this.state.delivery - this.state.amount*0.05) : CommonTools.numberFormat(this.state.amount + this.state.delivery)}</b>
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="card-action paypal-button">
                                    <Paypal total={this.state.amount > 5000 ? (this.state.amount + this.state.delivery - this.state.amount*0.05): (this.state.amount + this.state.delivery) }
                                            items={this.state.orderData}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Checkout)