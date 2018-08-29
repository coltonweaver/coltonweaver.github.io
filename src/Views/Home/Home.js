import React, { Component } from 'react';
import Header from '../../General/Header/Header';
import ColtonPic from '../../Images/colton.jpg';
import './Home.css';

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <Header image={ColtonPic} />
                <h1 className="HomeTitle">Welcome to My Website</h1>
            </div>
        );
    }
}

export default Home;