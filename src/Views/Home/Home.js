import React, { Component } from 'react';
import Header from '../../General/Header/Header';
import ColtonPic from '../../Images/colton.jpg';
import './Home.css';

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <div className="HomeContent">
                    <Header image={ColtonPic} />
                    <h1 className="HomeTitle">Welcome</h1>
                    <div className="HomeText">Student</div>
                    <div className="HomeText">Software Developer</div>
                    <div className="HomeText">Coffee Lover</div>
                    <div className="HomeText">Photographer</div>
                </div>
            </div>
        );
    }
}

export default Home;