import axios from "axios";

import authHeader from './auth-header';

const API_URL = 'http://localhost:9192/api/order/';

class OrderService {

    order(orderData) {
        return axios.post(API_URL + 'placed-order', orderData, {headers: authHeader()});
    }

    getOrders(page, size, customerId, status, customerType) {
        return axios.get(API_URL + 'order-line-by-customer', {
            headers: authHeader(),
            params: {customerId: customerId, page: page, size: size, status: status, customerType: customerType}
        })
    }

    getOrderLineByRawId(page, size, rawId) {
        return axios.get(API_URL + 'order-line-by-rawId', {
            headers: authHeader(),
            params: {page: page, size: size, rawId: rawId}
        })
    }

    getOrderByPK(orderPK) {
        return axios.get(API_URL + 'order-line-by-pk', {
            headers: authHeader(),
            params: {orderId: orderPK.orderId, rawId: orderPK.rawId}
        })
    }

    getTransactionToken(orderId) {
        return axios.get(API_URL + 'order-transaction-token', {
            headers: authHeader(),
            params: {OrderId: orderId}
        });
    }

    Refund(orderId, orderLinePk) {
        return axios.post(API_URL + 'order-refund', {
            orderId: orderId,
            orderLinePK: orderLinePk
        }, {headers: authHeader()});
    }

    changeStatus(orderPK, status) {
        return axios.get(API_URL + 'order-line-state-change', {
            headers: authHeader(),
            params: {orderId: orderPK.orderId, rawId: orderPK.rawId, status: status}
        })
    }

    getOrdersByDate(startDate, endDate, customerId, status, customerType) {
        return axios.post(API_URL + 'orders-report', {
            customerId: customerId,
            status: status,
            customerType: customerType,
            startDate: startDate,
            endDate: endDate
        },{
            headers: authHeader()

        })
    }

    getRawMaterialUsage(startDate, endDate, customerId, name) {
        return axios.post(API_URL + 'rawMaterialUsage', {
            customerId: customerId,
            rawName: name,
            startDate: startDate,
            endDate: endDate
        },{
            headers: authHeader()

        })
    }

    getOrdersByName(customerId, status, rawMaterialName) {
        return axios.post(API_URL + 'items-sales-report', {
            customerId: customerId,
            status: status,
            rawMaterialName: rawMaterialName
        },{
            headers: authHeader()

        })
    }

    getAllItems(customerId, status) {
        return axios.get(API_URL + 'all-sales-items', {
            headers: authHeader(),
            params: {customerId: customerId, status: status}
        })
    }

    getTopBuyer(startDate, endDate, customerId) {
        return axios.post(API_URL + 'topBuyers', {
            customerId: customerId,
            startDate: startDate,
            endDate: endDate
        },{
            headers: authHeader()

        })
    }
}

export default new OrderService()
