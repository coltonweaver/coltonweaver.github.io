import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return(
            <div className="Header">
                <img className="Image" src={this.props.image} alt="Page Header"/>
            </div>
        );
    }
}

export default Header;