import axios from "axios";

import OrderService from '../services/order-service';

const PAYPAL_CLIENT = 'AU8UBS25iUCD18WJKpaEwLyoq9WERPQ4ulK89pvhplZZrlT7b2if7CQKTl20lDu6xtPGPh12eE1VNakY';
const PAYPAL_SECRET = 'ENCUfWpd2C4fUu5MDtYU7Ch-2njwOpHwJ8KH6ENUdXi3x0Wt01UXoiQMY744XAmVdJZXe5wl2Ont6udj';

const PAYPAL_OAUTH_API = 'https://api-m.sandbox.paypal.com/v1/oauth2/token/';
const PAYPAL_PAYMENTS_API = 'https://api-m.sandbox.paypal.com/v2/payments/captures/';

class PaypalService {

    token = '';

    refund(orderLinePk, price) {
        const basicAuth = Buffer.from(PAYPAL_CLIENT + ':' + PAYPAL_SECRET).toString('base64');
        axios.post(PAYPAL_OAUTH_API, 'grant_type=client_credentials', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + basicAuth,
                'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(auth => {

            OrderService.getTransactionToken(orderLinePk.orderId).then(response => response.data).then(data => {

                axios.post(PAYPAL_PAYMENTS_API + data + '/refund', {
                    amount: {
                        currency_code: 'USD',
                        value: price
                    }
                }, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + auth.data.access_token
                    },

                }).then(response => {
                    OrderService.Refund(orderLinePk.orderId, orderLinePk);
                });
            });


        });
    }

}

export default new PaypalService()