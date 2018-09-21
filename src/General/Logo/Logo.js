import React, { Component } from 'react';

class Logo extends Component {
    render() {
        return(
            <div className="Logo">
                <img className="LogoImage" src={this.props.image} alt={this.props.alt} />
            </div>
        );
    }
}

export default Logo;