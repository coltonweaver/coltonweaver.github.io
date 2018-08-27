import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './General/Nav/Nav';
import Home from './Views/Home/Home';
import About from './Views/About/About';
import Experience from './Views/Experience/Experience';
import Contact from './Views/Contact/Contact';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Nav/>
                    <div className="PageContent">
                        <Route exact path="/" component={Home} />
                        <Router path="/about" component={About} />
                        <Router path="/experience" component={Experience} />
                        <Router path="/contact" component={Contact} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
