import React, { Component } from 'react';
import './About.css';

class About extends Component {
    render() {
        return(
            <div className="AboutParent">
                <div className="SideMargin"></div>
                <div className="AboutContent">
                    <div className="ContentHeader">Introduction</div>
                    <div className="AboutText">
                        Hello, thank you for visiting my webpage. My name is Colton Weaver, I am a Senior Computer Engineering student at Texas A&M.
                        I am originally from Amarillo, Texas, and will be moving to Seattle, Washington in six months. On this webpage you will find 
                        information about my interests, experience, and how to contact me.
                    </div>
                    <div className="ContentHeader">Interests</div>
                    <div className="AboutText">
                        My interests in software development are focused in the field of distributed computing. Working with distributed systems is 
                        fascinating to me. My most recent internship was with Amazon Web Services where I worked within the Serverless Organization.
                        This served to foster my interests in this field even more. Outside of work, I enjoy great coffee, photography as a hobby, bouldering,
                        and weightlifting.
                    </div>
                    <div className="ContentHeader">About this Page</div>
                    <div className="AboutText">
                        This page is written in React.js and deployed using GitHub pages. I learned React during my internship at Amazon and decided
                        to practice my skill in the lanugage by creating my personal website with it.
                    </div>
                </div>
                <div className="SideMargin"></div>
            </div>
        );
    }
}

export default About;