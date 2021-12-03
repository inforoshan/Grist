import React, {Component} from 'react';
import ReactStars from "react-rating-stars-component";
import {withRouter} from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";
import FeedbackService from "../services/feedback-service";
import AuthService from "../services/auth-service";

let rating = 0;

const ratingChanged = (newRating) => {
    rating = newRating;
};


class Feedback extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            customerId: user.customerId,
            supplierId: this.props.location.state.customerData.customerId,
            starVales: 0.0,
            comment: '',
            rawId: this.props.location.state.customerData.rawId
        }
    }


    saveFeedBack(event){
        event.preventDefault();

        this.state.starVales = rating;
        FeedbackService.feedback(this.state);

        this.props.history.push("/view-hotel-orders");
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className={'container center'}>
                    <form className="col s12">

                        <div className="row">
                            <div className="input-field col s12 center">
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={80}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <div className="input-field col s12">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(e) => this.setState({comment:e.target.value})}></textarea>
                                <label htmlFor="textarea1">Feedback</label>
                            </div>
                            <div className="input-field col s12">
                                <button class="btn waves-effect waves-light" onClick={(event) => this.saveFeedBack(event)}>Submit
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer/>
            </>
        );
    }
}

export default withRouter(Feedback);
