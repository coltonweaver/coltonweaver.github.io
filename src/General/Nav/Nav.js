import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render() {
        return(
            <div className="Nav">
                <div className="NavTitle">Colton Blake Weaver</div>
                <Link to='/contact' className="Link">Contact</Link>
                <Link to='/experience' className="Link">Experience</Link>
                <Link to='/about' className="Link">About</Link>
                <Link to='/' className="Link">Home</Link>
            </div>
        );
    }
}

export default Nav;
