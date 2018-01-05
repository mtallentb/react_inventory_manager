import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions';
import { Table } from "react-bootstrap/lib/";
import axios from 'axios';

class Orders extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        console.log(this.props.token);
        axios({
            method: 'get',
            url: 'https://ancient-reef-75174.herokuapp.com/order_line_items/',
            headers: { 'Authorization': this.props.token }
            })
            .then((response) => {
                console.log("Response Data: " + response.data);
                let newOrdersArr = [...response.data];
                newOrdersArr.forEach((item, index) => {
                    console.log("Product: " + item);
                    console.log("Product Name: " + item.product_name);
                    this.setState({
                        orders: this.state.orders.concat(item)
                    });
                });
                console.log('State: ' + this.state.orders);
            });
    }

    render() {
        const orders = this.state.orders.map((order, index) => {
            let creation_year = order.created_at.slice(0, 4);
            let creation_month_and_day = order.created_at.slice(5, 10);
            let creation_date = creation_month_and_day + "-" + creation_year;
            return <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.order_id}</td>
                <td>{order.product_name}</td>
                <td>${order.price}</td>
                <td>{creation_date}</td>
            </tr>;
        });

        return ( 
            <div className='container'>
                <h2>Order History</h2>

                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </Table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Orders);