import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Col, Button, ButtonToolbar } from "react-bootstrap/lib/";
import axios from 'axios';


class Inventory extends Component {
    state = {
        products: this.props.products
    }

    deleteProduct = (productID, index) => {
        console.log(typeof (productID));
        let id = String(productID);
        console.log(typeof (id));
        axios({
            method: 'delete',
            url: 'http://localhost:5000/products/' + productID,
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                console.log(response);
                const newProducts = [...this.props.products];
                newProducts.splice(index, 1);
                this.setState({ products: newProducts });
            });
    }

    render() {

        const products = this.state.products.map((product, index) => {
            return <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category_id}</td>
                <td><Button bsSize="small" bsStyle="info" onClick={() => console.log('Edit Clicked!')}>Edit</Button></td>
                <td><Button bsSize="small" bsStyle="danger" onClick={() => this.deleteProduct(product.id, index)}>Delete</Button></td>
            </tr>;
        });

        return <div className="container">
            <Col md={1} />
            <Col md={10}>
                <ButtonToolbar style={{ justifyContent: 'center', display: 'flex' }}>
                    <Button bsStyle="info" style={{ margin: 10 }} onClick={() => console.log('All Products Clicked!')}>All Products</Button>
                    <Button bsStyle="info" style={{ margin: 10 }} onClick={() => console.log('Men\'s Clothes Clicked!')}>Men's</Button>
                    <Button bsStyle="info" style={{ margin: 10 }} onClick={() => console.log('Women\'s Clothes Clicked!')}>Women's</Button>
                    <Button bsStyle="info" style={{ margin: 10 }} onClick={() => console.log('Gameday Clicked!')}>Gameday</Button>
                    <Button bsStyle="info" style={{ margin: 10 }} onClick={() => console.log('Gifts Clicked!')}>Gifts</Button>
                </ButtonToolbar>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </Table>
            </Col>
            <Col md={1} />
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        products: state.auth.products
    }
}

export default connect(mapStateToProps)(Inventory);
