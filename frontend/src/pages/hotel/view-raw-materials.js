import React from "react";
import {withRouter} from "react-router-dom";

import Navbar from "../../components/navbar";

import CommonTools from "../../services/common-tools"
import AuthService from "../../services/auth-service";
import RawMaterialService from "../../services/raw-material-service";

import "../../assert/css/viewrawmaterials.css";
import Footer from "../../components/footer";
import ReactStars from "react-rating-stars-component";

class ViewRawMaterials extends React.Component {

    constructor(props) {
        super(props);
        const user = AuthService.getCurrentUser();
        console.log("User : ", user);
        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            customerId: 0,
            rawId: 0,
            rawData: [],
            currentPage: 1,
            rawDataPerPage: 15,
            pageNumbers: [],
            orderByRating: false,
            rawMaterialName:"",
        }
    }

    componentDidMount() {
        this.findRawData(this.state.currentPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    findRawData(currentPage) {
        currentPage -= 1;
        console.log("test page", currentPage);
        RawMaterialService.getRawData(currentPage, this.state.rawDataPerPage).then(response => response.data).then(data => {
            let numbers = [];

            for (let x = 1; x <= data.totalPages; x++) {
                numbers.push(x);
            }

            this.setState({
                rawData: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number + 1,
                pageNumbers: numbers
            });
        });

    }

    findRawDataByNameAndRating(name, rating, currentPage){
        currentPage -= 1;
        RawMaterialService.getRawDataByNameAndRating(name, rating, currentPage,this.state.rawDataPerPage).then(response => response.data).then(data => {
            let numbers = [];

            for (let x = 1; x <= data.totalPages; x++) {
                numbers.push(x);
            }

            this.setState({
                rawData: data.content,
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

        this.findRawData(pageNumber);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }

    previousPage(currentPage) {
        if (currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            });

            this.findRawData(currentPage - 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    nextPage(currentPage) {
        if (currentPage < this.state.totalPages) {
            this.setState({
                currentPage: currentPage + 1
            });
            this.findRawData(currentPage + 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    viewItem(rawId) {
        this.props.history.push({
            pathname: "/view-item",
            state: {rawId: rawId}
        });
    }

    checkBoxChange(event) {

        if(event.target.checked)
        {
            this.setState({
                orderByRating:true
            });

            if(this.state.rawMaterialName !== "")
            {
                this.findRawDataByNameAndRating(this.state.rawMaterialName, true, this.state.currentPage);
            }
            else
            {
                this.findRawDataByNameAndRating("", true, this.state.currentPage);
            }
        }
        else
        {
            this.setState({
                orderByRating:false
            });

            if(this.state.rawMaterialName !== "")
            {
                this.findRawDataByNameAndRating(this.state.rawMaterialName, false, this.state.currentPage);
            }
            else
            {
                this.findRawData(this.state.currentPage);
            }
        }
    }

    searchTriggered(event)
    {
        if(event.target.value === "")
        {
            this.setState({
                rawMaterialName: ""
            });

            if(this.state.orderByRating)
            {
                this.findRawDataByNameAndRating("", true, this.state.currentPage);
            }
            else
            {
                this.findRawData(this.state.currentPage);
            }
        }
        else {
            this.setState({
                rawMaterialName: event.target.value
            });

            if(this.state.orderByRating)
            {
                this.findRawDataByNameAndRating(event.target.value, true, this.state.currentPage);
            }
            else
            {
                this.findRawDataByNameAndRating(event.target.value, false, this.state.currentPage);
            }
        }
    }

    render() {

        const {rawData, currentPage, totalPages} = this.state;

        return (

            <div>
                <Navbar addItem={4}/>
                <div className={'row search'}>
                    <form>
                        <div className={'col s3'}>

                        </div>
                        <div className={'col s3 input-field left'}>
                            <input id="search" placeholder="Search" onChange={event => this.searchTriggered(event)}/>
                        </div>
                        <div className={'col s2'}>

                        </div>
                        <div className={'col s4 input-field right'}>
                            <label className={'order-checkbox'}>
                                <input type="checkbox" defaultChecked = {this.state.orderByRating} onChange={event => this.checkBoxChange(event)}/>
                                <span>Order By Rating</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div className={'raw_home'}>

                    {
                        rawData.map((data, index) => {
                            return <div className="card grid-card " onClick={() => this.viewItem(data.rawId)}>
                                <div className="card-image ">
                                    <img className="responsive-img activator card-images"
                                         src={data.imagePath.split(',')[0]}/>
                                </div>
                                <div className="card-content">
                                            <span
                                                className="card-title activator grey-text text-darken-4">{data.rawMaterialName}</span>
                                    <div className={'row bottom-margin'}>
                                        <div className={'col s2'}>
                                            <ReactStars a11y={true} size={30} count={1}
                                                        value={1}
                                                        edit={false}/>
                                        </div>
                                        <div className={'col s10 feedback-main-page'}>
                                            {data.rating.toFixed(1)}
                                        </div>
                                    </div>
                                    <p><b>{CommonTools.numberFormat(data.unitPrice)} </b></p>
                                    <p><b>Qty : {data.quantity.toFixed(1)} </b></p>

                                    <p><b>Unit Type : {data.unitType}</b></p>
                                </div>
                            </div>

                        })
                    }
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

export default withRouter(ViewRawMaterials)