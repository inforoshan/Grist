import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { format } from "date-fns";

import AuthService from "../../../services/auth-service";
import OrderService from "../../../services/order-service";
import CommonTools from "../../../services/common-tools";

import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

class MonthlyUsageReport extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            customerId: user.customerId,
            rawId: 0,
            rawMaterialData: [],
            totalPrice: 0.00,
            startDate: "",
            endDate: "",
            rawMaterialName: ""
        }
    }

    findUsageData(startDate, endDate, name) {

        OrderService.getRawMaterialUsage(startDate, endDate, this.state.customerId, name).then(response => response.data).then(data => {

            this.setState({
                rawMaterialData: data
            });

            if (this.state.rawMaterialData !== undefined) {
                let totalPrice = 0.00;

                data.forEach(rawMaterialData => {
                    totalPrice += rawMaterialData.totalCost
                });

                this.setState({totalPrice : totalPrice});
            }
        });
    }

    view(e) {
        e.preventDefault();
        console.log("Start date", this.state.startDate);
        console.log("End date", this.state.endDate);

        if(this.state.rawMaterialName === "")
        {
            if(this.state.startDate !== "" && this.state.endDate !== "")
            {
                this.findUsageData(this.state.startDate, this.state.endDate,null);
            }
        }
        else
        {
            if(this.state.startDate !== "" && this.state.endDate !== "")
            {
                this.findUsageData(this.state.startDate, this.state.endDate, this.state.rawMaterialName);
            }
        }

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

        console.log("End Date ", endDate);
        console.log("today End Date ", todayDate);
        console.log("today End Date ", todayDate < endDate);

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

    printDoc()
    {
        window.print();
    }

    onSearch(event)
    {
        if(event.target.value === "")
        {
            this.setState({
                rawMaterialName: ""
            });

            if(this.state.startDate !== "" && this.state.endDate !== "")
            {
                this.findUsageData(this.state.startDate, this.state.endDate,null);
            }
        }
        else
        {
            this.setState({
                rawMaterialName: event.target.value
            });

            if(this.state.startDate !== "" && this.state.endDate !== "")
            {
                console.log("tessssssssssss ", event.target.value);
                this.findUsageData(this.state.startDate, this.state.endDate, event.target.value);
            }
        }
    }

    render() {

        const {rawMaterialData, totalPrice} = this.state;

        return (
            <>
                <Navbar/>
                <div className={'container'}>
                    <div className={'row '}>
                        <form>
                            <div className="col s3">
                                <label >Search </label>
                                <input type="text" onChange={(e) => this.onSearch(e)}/>

                            </div>
                            <div className="col s3">
                                <label>Start Date</label>
                                <input
                                    type="datetime-local"
                                    value={this.state.startDate}
                                    onChange={e => this.fromDate(e)}
                                />

                            </div>
                            <div className="col s3">
                                <label>End Date:</label>
                                <input
                                    type="datetime-local"
                                    value={this.state.endDate}
                                    onChange={e => this.toDate(e)}
                                />
                            </div>
                            <div className="input-field col s3">
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
                                <th>Item Name</th>
                                <th>Total Quantity</th>
                                <th>Cost (LKR)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rawMaterialData !== undefined ?
                                rawMaterialData.map((data) => {
                                    return <tr>
                                        <td>{data.rawMaterialName}</td>
                                        <td>{data.totalQuantity}</td>
                                        <td>{CommonTools.numberFormat(data.totalCost)}</td>
                                    </tr>
                                }) : <tr>
                                    <td colSpan={4} className={'center'}>No Data Found</td>
                                </tr>
                            }
                            {

                                <tr>
                                    <td className={'center'} colSpan={2}>
                                        Total Amount
                                    </td>
                                    <td>
                                        {CommonTools.numberFormat(totalPrice)}
                                    </td>
                                </tr>
                            }

                            </tbody>

                        </table>
                        <div>
                            <button onClick={() => this.printDoc()}>Print</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default withRouter(MonthlyUsageReport);
