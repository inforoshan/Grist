import React from 'react';
import {withRouter} from 'react-router-dom';

import Navbar from '../../components/navbar';
import CommonTools from '../../services/common-tools';
import RawMaterials from '../../services/raw-material-service';
import AuthService from "../../services/auth-service";
import {Carousel} from 'react-carousel-minimal';

import '../../assert/css/view-item.css';
import emptyImages from '../../assert/images/empty/empty.jpg';
import FeedbackService from '../../services/feedback-service';

import swal from "sweetalert";
import ReactStars from "react-rating-stars-component/dist/react-stars";

class ViewItem extends React.Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Hotel') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            rawId: this.props.location.state.rawId,
            rawMaterialName: '',
            unitPrice: 0,
            quantity: 0,
            imagesData: [],
            unitType: '',
            customerId: 0,
            selectedQty: 1,
            errorMessage: '',
            rating: 0.0,
        }

    }

    componentDidMount() {
        this.findRawDataById(this.props.location.state.rawId);
    }

    findRawDataById(rawId) {
        console.log("Raw Id : ", rawId);
        RawMaterials.getRawDataByRawId(rawId).then(response => response.data).then(responseData => {
            let images = [];
            responseData.imagePath.forEach(data => images.push({'image': data}));

            this.setState({
                rawMaterialName: responseData.rawMaterialName,
                unitPrice: responseData.unitPrice,
                quantity: responseData.quantity,
                imagesData: images,
                unitType: responseData.unitType,
                customerId: responseData.customerId,
                description: responseData.description,
                feedbacks: responseData.feed,
                rating: responseData.rate
            });

        });
    }

    quantity(event) {
        let value = event.target.value;

        if (value <= this.state.quantity) {
            this.setState({
                selectedQty: event.target.value,
                errorMessage: ''
            })
        } else {
            this.setState({
                selectedQty: event.target.value,
                errorMessage: 'Actual quantity exceed'
            });

        }

    }

    buyNow(event) {

        if (this.state.selectedQty > 0 && this.state.quantity >= this.state.selectedQty) {
            let data = [{
                rawId: this.state.rawId,
                rawMaterialName: this.state.rawMaterialName,
                quantity: this.state.quantity,
                unitPrice: this.state.unitPrice,
                image: this.state.imagesData[0],
                customerId: AuthService.getCurrentUser().customerId,
                supplier: this.state.customerId,
                selectedQty: this.state.selectedQty,
            }];

            this.props.history.push({
                pathname: "/checkout",
                state: {
                    items: data
                }
            });

            this.state.errorMessage = '';
        } else {
            this.state.errorMessage = "Please select the valid quantity";
            swal({
                title: "Please select the quantity",
                text: "Please try again with valid quantity",
                icon: "error"
            }).then((fail) => {
                console.log("Quantity error");
            });
        }
    }

    addCart(id) {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));

        if(this.state.selectedQty >= this.state.quantity || this.state.selectedQty === 0 || this.state.selectedQty === '')
        {
            swal({
                title: "Please select the valid Quantity !!!",
                text: "",
                icon: "warning"
            }).then((fail) => {
                window.location.reload();
            });

        }
        else
        {
            let data = [{
                rawId: this.state.rawId,
                rawMaterialName: this.state.rawMaterialName,
                quantity: this.state.quantity,
                unitPrice: this.state.unitPrice,
                image: this.state.imagesData[0],
                customerId: AuthService.getCurrentUser().customerId,
                supplier: this.state.customerId,
                selectedQty: this.state.selectedQty,
            }];

            if (dataCart !== null) {
                const check = dataCart.every(item => {
                    return item.rawId !== id
                })

                if (check) {
                    dataCart.push(data[0]);
                    localStorage.setItem('dataCart', JSON.stringify(dataCart));
                    window.location.reload();
                } else {
                    swal({
                        title: "Item Already in cart !!!",
                        text: "Please try another item",
                        icon: "warning"
                    }).then((fail) => {
                        window.location.reload();
                        console.log("Item Already in cart !!!");
                    });
                }
            } else {
                localStorage.setItem('dataCart', JSON.stringify(data));
                window.location.reload();

            }

        }

    }


    render() {
        const {rating} = this.state
        const data = [{
            'image': emptyImages
        }, {'image': emptyImages}
        ]

        const captionStyle = {
            fontSize: '2em',
            fontWeight: 'bold',
        }
        const slideNumberStyle = {
            fontSize: '20px',
            fontWeight: 'bold',
        }



        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className={'col s1'}></div>
                    <div className="col s6" style={{textAlign: "center"}}>
                        <Carousel
                            data={this.state.imagesData.length > 0 ? this.state.imagesData : data}
                            time={2000}
                            width="850px"
                            height="500px"
                            captionStyle={captionStyle}
                            radius="10px"
                            slideNumber={true}
                            slideNumberStyle={slideNumberStyle}
                            captionPosition="bottom"
                            automatic={false}
                            dots={false}
                            pauseIconColor="white"
                            pauseIconSize="40px"
                            slideBackgroundColor="darkgrey"
                            slideImageFit="cover"
                            thumbnails={true}
                            thumbnailWidth="100px"
                            style={{
                                textAlign: "left",
                                maxWidth: "850px",
                                maxHeight: "500px",
                                margin: "40px auto",
                            }}
                        />
                    </div>
                    <div className={'col s4 view-item-right left'}>
                        <div className={'row'}>
                            <div className={'col s12'}>
                                <h4>{this.state.rawMaterialName}</h4>
                                <p className={'left-align'}>
                                    {
                                        this.state.description === '' ? 'NO DESCRIPTION FOUND !!!' : this.state.description
                                    }

                                </p>
                            </div>
                        </div>
                        <div className={'row'}>
                            <from>
                                <div className={'col s12'}>
                                    <table cellspacing="0" cellpadding="0"
                                           className={'responsive-table view-item-table'}>
                                        <tr className={'view-item-table-row'}>
                                            <td className={'left'}>
                                                Available Qty :
                                            </td>
                                            <td className={'left-align'}>{this.state.quantity + ' (' + this.state.unitType + ')'}</td>
                                        </tr>
                                        <tr className={'view-item-table-row'}>
                                            <td className={'left'}>
                                                Quantity :
                                            </td>
                                            <td className={'left-align'}>
                                                <input type="number"
                                                       step=".001"
                                                       className="validate view-item-table-quantity"
                                                       name="quantity"
                                                       onChange={(event) => this.quantity(event)}
                                                       value={this.state.selectedQty}
                                                />
                                                <p className={'alert-danger'}
                                                   hidden={this.state.errorMessage.length < 0}>{this.state.errorMessage}</p>
                                            </td>
                                        </tr>
                                        <tr className={'view-item-table-row'}>
                                            <td className={'left'}>
                                                Unit Price :
                                            </td>
                                            <td className={''}>
                                                <b> {CommonTools.numberFormat(this.state.unitPrice)}</b>
                                            </td>
                                        </tr>
                                        <tr className={'view-item-table-row'}>
                                            <td className={'left'}>
                                                Rating :
                                            </td>
                                            <td className={'react-stars-item'}>
                                                 <ReactStars size= {30} count={1} value={1}
                                                edit={false}/> <div className={'rating'}><b>{rating.toFixed(1)}</b></div>
                                            </td>
                                        </tr>
                                        <tr className={'view-item-table-row'}>
                                            <td className={'view-item-table-button'} colSpan={'2'}>
                                                <b><a
                                                    className={"waves-effect waves-light btn-large view-item-shopping-cart"}
                                                    onClick={() => this.addCart(this.state.rawId)}>
                                                    <i
                                                        className="material-icons left">add_shopping_cart
                                                    </i>Add to Cart</a>
                                                </b>
                                            </td>
                                        </tr>
                                        <tr className={'view-item-table-row'}>
                                            <td className={'view-item-table-button'} colSpan={'2'}>
                                                <b><a className='waves-effect waves-light btn-large'
                                                      onClick={(e) => this.buyNow(e)}> <i
                                                    className='material-icons left'>attach_money
                                                </i>Buy Now</a></b>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </from>
                        </div>
                    </div>
                    <div className={'col s1'}></div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewItem)