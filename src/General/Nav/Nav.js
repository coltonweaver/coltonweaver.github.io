import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
    render() {
        return(
            <div className="Nav">
                <div className="NavTitle">Colton Blake Weaver</div>
                <button className="Link">Contact</button>
                <button className="Link">Experience</button>
                <button className="Link">About</button>
                <button className="Link">Home</button>
            </div>
        );
    }
}

export default Nav;
