import React, { Component } from 'react'
import { connect } from 'react-redux'
// import * as actionTypes from '../../store/actions'
import { Table, Button, Col, Modal } from "react-bootstrap/lib/"
import axios from 'axios'

class Orders extends Component {

    state = {
        orders: [],
        line_items: [],
        fullOrders: [],
        orderTotals: [],
        orderDates: [],
        showModal: false,
        currentOrder: [],
        currentOrderID: null,
        currentOrderDate: null,
        currentOrderTotal: null
    }

    componentDidMount() {
        console.log(this.props.token)
        axios({
            method: 'get',
            url: 'https://ancient-reef-75174.herokuapp.com/order_line_items/',
            headers: { 'Authorization': this.props.token }
            })
            .then((response) => {
                let line_items = [];
                let newOrdersArr = [...response.data]
                newOrdersArr.forEach((item, index) => {
                    this.setState({
                        orders: this.state.orders.concat(item)
                    })
                    line_items.push(newOrdersArr.filter((order) => order.order_id === (index + 1)))
                })
                console.log(line_items)
                this.setState({ line_items: line_items })
            })
            .then(() => {
                let fullOrders = []
                let orderTotals = []
                let orderDates = []
                // eslint-disable-next-line
                let orders = this.state.line_items.map((order) => {
                    let line = order.map((item) => item.product_name)
                    if (line.length !== 0) {
                        let product_list = line.join(", ")
                        fullOrders.push(product_list)
                    }
                    let line_total = order.map((item) => item.price)
                    if (line_total.length !== 0) {
                        const reducer = (accumulator, currentValue) => accumulator + currentValue;
                        let orderTotal = line_total.reduce(reducer)
                        orderTotals.push(orderTotal.toFixed(2))
                    }
                    let dates = order.map(item => item.created_at)
                    if (dates.length !== 0) {
                        let creation_year = dates[0].slice(0, 4)
                        let creation_month_and_day = dates[0].slice(5, 10)
                        let creation_date = creation_month_and_day + "-" + creation_year
                        orderDates.push(creation_date)
                    }
                })
                this.setState({ 
                    fullOrders: fullOrders,
                    orderTotals: orderTotals,
                    orderDates: orderDates
                })
            })
    }

    orderDetail = (order_id, total, creation_date) => {
        let currentOrder = []
        // eslint-disable-next-line
        this.state.line_items.map(order => {
            if (order.length !== 0) {
                // eslint-disable-next-line
                order.map(item => {
                    if (item.order_id === order_id) {
                        currentOrder.push(item)
                    }
                    
                })
            }
        })
        console.log(currentOrder)
        this.setState({
            currentOrderDate: creation_date,
            currentOrderTotal: total,
            currentOrderID: order_id,
            currentOrder: currentOrder,
            showModal: true
        })
    }
 
    render() {

        const orders = this.state.fullOrders.map((order, index) => {
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{index + 1}</td>
                <td><strong>{order.slice(0,50)}...</strong></td>
                <td>${this.state.orderTotals[index]}</td>
                <td>{this.state.orderDates[index]}</td>
                <td><Button bsStyle="info" onClick={() => this.orderDetail((index + 1), this.state.orderTotals[index], this.state.orderDates[index])}>View Order</Button></td>
            </tr>
        })

        const orderDetail = this.state.currentOrder.map((item, index) => {
            return <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.product_name}</td>
                <td>${item.price}</td>
            </tr>
        })

        return ( 
            <div className='container'>
                <br /><br /><br />
                <Col md={1} />
                <Col md={10}> 
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Products</th>
                            <th>Total</th>
                            <th>Date Created</th>
                            <th>View Order</th>
                        </tr>
                    </thead>
                    <tbody style={{ padding: 5 }}>
                        {orders}
                    </tbody>
                </Table>
                    {this.state.showModal ?
                        <div className="static-modal">
                            <Modal.Dialog style={{ overflowY: 'initial' }}>
                                <Modal.Header>
                                    <Modal.Title>Order Details for Order ID: {this.state.currentOrderID}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ textAlign: 'left' }}>
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ padding: 5 }}>
                                            {orderDetail}
                                            <tr>
                                                <th></th>
                                                <th><strong>Total: </strong></th>
                                                <th>${this.state.currentOrderTotal}</th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <strong>Order completed on {this.state.currentOrderDate}</strong>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </div>
                        : null}
                </Col>
                <Col md={1} />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Orders)