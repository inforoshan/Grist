import React, {useState, useEffect, useRef} from 'react'

import swal from "sweetalert";
import {useHistory} from "react-router-dom";

import OrderService from '../services/order-service';

function Paypal(props) {
    const {total, items} = props
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    const history = useHistory()

    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    layout:  'vertical',
                    color:   'blue',
                    shape:   'rect',
                    label:   'paypal'
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Ordered',
                            amount: {
                                currency_code: 'USD',
                                value: total,
                            },

                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    items.transactionToken = order.purchase_units[0].payments.captures[0].id;
                    OrderService.order(items);
                },
                onError: err => {
                    setError(err);
                    console.error('ERROR', err);
                },
            })
            .render(paypalRef.current);
    }, []);

    if (paidFor) {
        swal({
            title: "Payment Success !!!",
            text: "Thank you for shopping with us",
            icon: "success"
        }).then((success) => {
            localStorage.removeItem('dataCart');
            history.push('/MainView');
        });
    }

    if (error) {
        swal({
            title: "Payment Error !!!",
            text: "Please try again",
            icon: "error"
        }).then((fail) => {
            console.log("Payment error !!!");
        });
    }

    return (
        <div>
            <div ref={paypalRef}/>
        </div>
    )
}

export default Paypal