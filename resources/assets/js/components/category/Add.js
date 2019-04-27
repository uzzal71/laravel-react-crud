import React, { Component } from 'react';
import Axios from 'axios';


export default class Add extends Component {

    constructor()
    {
        super();
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name: ''
        }
    }

    onChangeCategoryName(e)
    {
        this.setState({
            category_name:e.target.value
        });
    }

    onSubmit(e)
    {
        e.preventDefault();
        const data = {
            category_name : this.state.category_name
        }

        Axios.post("http://127.0.0.1:8000/category-store", data)
        .then(response=>console.log(response.data));
    }

    render() {
        return (
            <div>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="category_name">Category Name</label>
                        <input type="text" className="form-control" id="category_name" onChange={this.onChangeCategoryName} value={this.state.category_name}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

