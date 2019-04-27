import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Edit from './Edit';


export default class Index extends Component {
    render() {
        return (
            <Router>
            <div>
                <hr/>
                <Link to="/category-add" className="btn btn-primary float-left">Add Category</Link> 
                <Link to="/category-list" className="btn btn-warning float-right"> Listing</Link>
                <br/>
                <Route exact path="/category-add" component={Add}/>
                <Route exact path="/category-list" component={Listing}/>
                <Route exact path="/category-edit/:id" component={Edit}/>
                <hr />
            </div>
            </Router>
        );
    }
}

