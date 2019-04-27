import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Pagination from "react-js-pagination";

export default class Listing extends Component {

    constructor()
    {

        super();
        this.state={
            categories: [],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed: 5
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        
        Axios.get("http://127.0.0.1:8000/category-all?page="+pageNumber)
        .then(response=>{
            this.setState({
                categories: response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    componentDidMount()
    {
        Axios.get('http://127.0.0.1:8000/category-all')
        .then(response=>{
            this.setState({
                categories: response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    onDelete(category_id)
    {
        Axios.delete('http://127.0.0.1:8000/category-destroy/'+category_id)
        .then(response=>{
            var categories = this.state.categories;
            for(var i = 0; i < categories.length; i++)
            {
                if(categories[i].id == category_id)
                {
                    categories.splice(i, 1);
                    this.setState({categories:categories});
                }
            }
        });
    }


    render() {
        return (
            <div><hr/>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.categories.map(category=>{
                            return (
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{category.name}</th>
                                    <th scope="col">{category.active == 1?('Active'):('Inactive')}</th>
                                    <th scope="col">{category.created_at}</th>
                                    <th scope="col">{category.updated_at}</th>
                                    <th>
                                        <Link className="btn btn-success" to={`/category-edit/${category.id}`}>Edit</Link>
                                        <a className="btn btn-danger" onClick={this.onDelete.bind(this,category.id)}>Delete</a>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>

                <div className="pagination justify-content-center">
                <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                onChange={this.handlePageChange}
                itemClass='page-item'
                linkClass='page-link'
                />
            </div>

            </div>
        );
    }
}

