import React, { Component } from 'react';
import Header from '../../General/Header/Header';
import ColtonPic from '../../Images/colton.jpg';
import './Home.css';

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <div className="SideMargin"></div>
                <div className="HomeContent">
                    <Header image={ColtonPic} />
                    <h1 className="HomeTitle">Welcome</h1>
                    <div>Student</div>
                    <div>Software Developer</div>
                    <div>Coffee Lover</div>
                    <div>Photographer</div>
                </div>
                <div className="SideMargin"></div>
            </div>
        );
    }
}

export default Home;