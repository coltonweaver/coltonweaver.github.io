import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Home from '../../Views/Home/Home';
import About from '../../Views/About/About';
import Experience from '../../Views/Experience/Experience';
import Contact from '../../Views/Contact/Contact';
import './PageContent.css';

class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
    }

    handleClick = value => {
        this.setState({
            index: value,
        });
    }

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    }

    render() {
        const { index } = this.state;

        return(
            <div className="PageContent">
                <div className="Nav">
                    <div className="NavTitle">Colton Blake Weaver</div>
                    <div className="Buttons">
                        <button className="Button" onClick={() => this.handleClick(3)}>Contact</button>
                        <button className="Button" onClick={() => this.handleClick(2)}>Experience</button>
                        <button className="Button" onClick={() => this.handleClick(1)}>About</button>
                        <button className="Button" onClick={() => this.handleClick(0)}>Home</button>
                    </div>
                </div>
                <SwipeableViews className="ViewContent" index={index} onChangeIndex={this.handleChangeIndex}>
                    <Home />
                    <About />
                    <Experience />
                    <Contact />
                </SwipeableViews>
            </div>
        );
    }
}

export default PageContent;
