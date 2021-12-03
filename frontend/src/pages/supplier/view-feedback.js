import React, {Component} from 'react';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import FeedbackService from "../../services/feedback-service";
import AuthService from "../../services/auth-service";
import {withRouter} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

class ViewFeedback extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Supplier') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            customerId: user.customerId,
            feedbackData: [],
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
        console.log("test page", currentPage);
        FeedbackService.getOrderLineByRawId(currentPage, this.state.rawDataPerPage, this.state.customerId).then(response => response.data).then(data => {
            let numbers = [];

            for (let x = 1; x <= data.totalPages; x++) {
                numbers.push(x);
            }

            this.setState({
                feedbackData: data.content,
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

    render() {

        const {feedbackData, currentPage, totalPages} = this.state;

        return (
            <div>
                <Navbar/>
                <div className={'raw_home'}>
                    <table className={'highlight container'}>
                        <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Rating</th>
                            <th>Comment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            feedbackData.map((data) => {
                                return <tr>
                                    <td>{data.customer.customerName}</td>
                                    <td><ReactStars
                                        count={5}
                                        value={data.feedbackStars}
                                        size={40}
                                        edit={false}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor='#ffd700'
                                    /></td>
                                    <td>{data.feedBackComment}</td>
                                </tr>
                            })
                        }
                        </tbody>

                    </table>
                </div>
                <div className='view-raw-materials-footer'>
                    <div className='left'>
                        <div className={'view-raw-materials-show-pages'}> Show Pages {currentPage} of {totalPages}</div>
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
                                                className={currentPage === pageNumber ? "active" : "waves-effect"}><a
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
        );
    }
}

export default withRouter(ViewFeedback);
