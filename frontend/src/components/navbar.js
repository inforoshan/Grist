import React from 'react'
import {withRouter} from 'react-router-dom'

import AuthService from '../services/auth-service'

import logo from "../assert/images/logo/nav_log.png";

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        const user = AuthService.getCurrentUser();

        const cartData = JSON.parse(localStorage.getItem('dataCart'));

        this.state = {
            usertype: user.customerType,
            cartItems: cartData !== null ? cartData : [],
            userName: user.username
        }
    }

    logout() {
        AuthService.logout();
    }

    cartClicked() {
        if (this.state.cartItems !== null && this.state.cartItems.length > 0) {
            this.props.history.push("/checkout");
        } else {
            console.log("Do nothing !!!!");
        }
    }

    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <a href={this.state.usertype === 'Hotel' ? '/hotel' : '/supplier'} class="brand-logo"><img src={logo}/><span className={'logo-contain'}></span></a>
                    <a className={'log-name'}><span><span className={'nav-user'}>{this.state.userName}</span> <span className={'nav-as'}>as</span> <span className={this.state.usertype === "Hotel" ? "nav-customer" : "nav-supplier"}>{this.state.usertype === "Hotel" ? "Hotelier" : "Supplier"}</span> </span></a>
                    <ul class="right hide-on-med-and-down">
                        {this.state.usertype === 'Hotel' ? <li><a onClick={() => this.cartClicked()}><span
                            className={this.state.cartItems !== null && this.state.cartItems.length > 0 ? "new badge badge-items" : ''}>{this.state.cartItems !== null && this.state.cartItems.length > 0 ? this.state.cartItems.length : ''}</span>


                            <i className='material-icons left shopping-cart'>shopping_cart </i></a></li> : ''}
                        <li><a href={this.state.usertype === 'Hotel' ? '/hotel' : '/supplier'}>Main Menu</a></li>
                        <li><a href={this.state.usertype === 'Hotel' ? '/MainView' : '/supplier'}>Home</a></li>
                        <li><a href="/" onClick={this.logout}><i className='material-icons left'>chevron_left</i>logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)
