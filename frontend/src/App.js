import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Home from "./pages/home";
import ViewRawMaterials from "./pages/hotel/view-raw-materials";
import Login from "./pages/login";
import RegisterCustomer from "./pages/register-customer";
import AddRawMaterials from "./pages/supplier/edit-raw-materials";
import ViewItem from "./pages/hotel/view-item";
import Checkout from "./pages/hotel/checkout";
import SupplierHome from "./pages/supplier/supplier-home";
import HotelHome from "./pages/hotel/hotel-home";
import ViewOrders from "./pages/supplier/view-orders";
import OrderMainView from "./pages/supplier/view-orders-main";
import ViewOrdersAccepted from "./pages/supplier/view-orders-accepted";
import ViewRejectedOrders from "./pages/hotel/view-rejected-orders";
import ViewHotelOrders from "./pages/hotel/view-hotel-orders";
import ViewHotelOrderMain from "./pages/hotel/view-hotel-order-main";
import Feedback from "./components/feedback";
import ViewFeedback from "./pages/supplier/view-feedback";
import IncomeReport from "./pages/supplier/reports/Income-report";
import ViewReports from "./pages/supplier/view-reports";
import PurchaseReport from "./pages/hotel/reports/perches-report";
import ItemSalesReport from "./pages/supplier/reports/Item-sales-report";
import MonthlyUsageReport from "./pages/hotel/reports/view-monthly-usage-report";
import ViewHotelMainReport from "./pages/hotel/view-hotel-reports-main";
import TopBuyers from "./pages/supplier/reports/top-buyers";
import UserManagement from "./pages/user-management";

const App = () => {
    return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path='/register' exact component={RegisterCustomer}/>
                    <Route path='/addRawMaterial' exact component={AddRawMaterials}/>
                    <Route path='/MainView' exact component={ViewRawMaterials}/>
                    <Route path='/view-item' exact component={ViewItem}/>
                    <Route path='/checkout' exact component={Checkout}/>
                    <Route path='/home' exact component={Home}/>
                    <Route path='/supplier' exact component={SupplierHome}/>
                    <Route path='/hotel' exact component={HotelHome}/>
                    <Route path='/view-orders' exact component={ViewOrders}/>
                    <Route path='/view-order-main' exact component={OrderMainView}/>
                    <Route path='/view-orders-accepted' exact component={ViewOrdersAccepted}/>
                    <Route path='/view-rejected-orders' exact component={ViewRejectedOrders}/>
                    <Route path='/view-hotel-orders' exact component={ViewHotelOrders}/>
                    <Route path='/view-hotel-order-main' exact component={ViewHotelOrderMain}/>
                    <Route path='/feedback' exact component={Feedback}/>
                    <Route path='/view-feedback' exact component={ViewFeedback}/>
                    <Route path='/income-report' exact component={IncomeReport}/>
                    <Route path='/view-reports' exact component={ViewReports}/>
                    <Route path='/view-purchase-report' exact component={PurchaseReport}/>
                    <Route path='/view-item-sales-report' exact component={ItemSalesReport}/>
                    <Route path='/view-hotel-reports-main' exact component={ViewHotelMainReport}/>
                    <Route path='/view-monthly-usage-report' exact component={MonthlyUsageReport}/>
                    <Route path='/view-top-buyer' exact component={TopBuyers}/>
                    <Route path='/user-management' exact component={UserManagement}/>
                </Switch>
            </Router>

    )
}

export default App;
