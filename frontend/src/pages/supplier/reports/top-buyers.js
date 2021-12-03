import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { Bar } from "react-chartjs-2";

import AuthService from "../../../services/auth-service";
import OrderService from "../../../services/order-service";
import CommonTools from "../../../services/common-tools";

import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

class TopBuyers extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Supplier') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            customerId: user.customerId,
            topBuyerData: [],
            hotelNames:[],
            totalIncomes:[],
            startDate: "",
            endDate: "",
        }
    }

    componentDidMount() {
    }

    getTopBuyer(startDate, endDate) {

        OrderService.getTopBuyer(startDate, endDate, this.state.customerId).then(response => response.data).then(data => {
            console.log("TopData ",data);

            let hotelNames = [];
            let totalIncomes = [];

            data.map(topdata => {
                hotelNames.push(topdata.hotelName);
                totalIncomes.push(topdata.totalIncome);
            });

            this.setState({
                topBuyerData: data,
                hotelNames:hotelNames,
                totalIncomes:totalIncomes
            });

            console.log("Hotel names",hotelNames);
            console.log("Total", totalIncomes);
        });
    }

    view(e) {
        e.preventDefault();
        console.log("Start date", this.state.startDate);
        console.log("End date", this.state.endDate);
        this.getTopBuyer(this.state.startDate, this.state.endDate);
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

    render() {

        const {hotelNames, totalIncomes} = this.state;

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
                        <Bar
                            data={{
                                labels: hotelNames,
                                datasets: [
                                    {
                                        label: "Customer/Income (LKR)",
                                        data: totalIncomes,
                                        backgroundColor: ["#6d78ad", "#51cda0", "#df7970", "#4c9ca0"],
                                        borderColor: ["aqua", "green", "red", "yellow"],
                                        borderWidth: 0.5,
                                    },
                                ],
                            }}
                            height={400}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                                legend: {
                                    labels: {
                                        fontSize: 15,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default withRouter(TopBuyers);
