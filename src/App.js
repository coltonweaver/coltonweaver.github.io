import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './General/Nav/Nav';
import Home from './Views/Home/Home';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Nav/>
                    <div className="PageContent">
                        <Route exact path="/" component={Home} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
