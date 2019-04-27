import React, { Component } from 'react';
import Axios from 'axios';


export default class Edit extends Component {

    constructor(props)
    {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name: ''
        }
    }

    componentDidMount()
    {
        Axios.get('http://127.0.0.1:8000/category-get/'+this.props.match.params.id)
        .then(response=>{
            this.setState({category_name: response.data.name});
        });
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

        Axios.put("http://127.0.0.1:8000/category-update/"+this.props.match.params.id, data)
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

