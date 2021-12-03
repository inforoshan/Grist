import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import AuthService from "../../services/auth-service";
import OrderService from "../../services/order-service";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

class ViewHotelOrders extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            customerId: user.customerId,
            orderData: [],
            currentPage: 1,
            rawDataPerPage: 6,
            pageNumbers: []
        }
    }

    componentDidMount() {
        this.findOrderData(this.state.currentPage);
    }

    findOrderData(currentPage) {
        currentPage -= 1;
        OrderService.getOrders(currentPage, this.state.rawDataPerPage, this.state.customerId, 'Available', 'Hotel').then(response => response.data).then(data => {
            let numbers = [];
            for (let x = 1; x <= data.totalPages; x++) {

                numbers.push(x);
            }
            console.log("test page", data.content);

            this.setState({
                orderData: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number + 1,
                pageNumbers: numbers
            });
        });

    }

    pageNumber(pageNumber) {
        this.setState({
            currentPage: pageNumber
        });

        this.findOrderData(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }

    previousPage(currentPage) {
        if (currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            });

            this.findOrderData(currentPage - 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    nextPage(currentPage) {
        if (currentPage < this.state.totalPages) {
            this.setState({
                currentPage: currentPage + 1
            });

            this.findOrderData(currentPage + 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    feedBack(data)
    {
        this.props.history.push({pathname: "/feedback",
            state: { customerData: data }});
    }

    render() {

        const {orderData, currentPage, totalPages} = this.state;

        return (
            <>
                <div>
                    <Navbar/>
                    <div className={'raw_home'}>
                        <table className={'highlight container'}>
                            <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Raw Material Name</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Address</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderData.map((data) => {
                                    return <tr>
                                        <td>{data.customerName}</td>
                                        <td>{data.rawMaterialName}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.status}</td>
                                        <td>{data.address}</td>
                                        <td>
                                            <button className={'btn waves-effect waves-light order-view-button'} disabled={ data.status !== 'DELIVERED' }
                                                    onClick={() => this.feedBack(data)}>FeedBack
                                            </button>

                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>

                        </table>
                    </div>
                    <div className='view-raw-materials-footer'>
                        <div className='left'>
                            <div className={'view-raw-materials-show-pages'}> Show
                                Pages {currentPage} of {totalPages}</div>
                        </div>
                        <div className='right'>
                            <ul className="pagination">
                                <li className={currentPage === 1 ? 'disabled' : 'waves-effect'}><a
                                    onClick={() => this.previousPage(currentPage)}><i
                                    className="material-icons">chevron_left</i></a>
                                </li>
                                {
                                    this.state.pageNumbers.length > 0 && this.state.pageNumbers.length < 10 ? this.state.pageNumbers.map((pageNumber, index) => {
                                        return (<li key={index}
                                                    className={currentPage === pageNumber ? "active" : "waves-effect"}>
                                            <a
                                                onClick={() => this.pageNumber(pageNumber)}>{pageNumber}</a>
                                        </li>)
                                    }) : null
                                }

                                <li className={currentPage === totalPages ? 'disabled' : 'waves-effect'}><a
                                    onClick={() => this.nextPage(currentPage)}><i
                                    className="material-icons">chevron_right</i></a></li>
                            </ul>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </>
        );
    }
}

export default withRouter(ViewHotelOrders)
