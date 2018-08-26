import React, { Component } from 'react';
import Header from '../../General/Header/Header';
import HomeBanner from '../../Images/HomeBanner.png';
import './Home.css';

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <Header image={HomeBanner} />
                <h1 className="Title" >Colton Blake Weaver</h1>
            </div>
        );
    }
}

export default Home;