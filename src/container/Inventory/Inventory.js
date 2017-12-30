import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Table, 
    Col, 
    Button, 
    ButtonToolbar, 
    Modal, 
    FormGroup, 
    ControlLabel, 
    HelpBlock, 
    FormControl 
} from "react-bootstrap/lib/";
import axios from 'axios';
import * as actionTypes from '../../store/actions/actions';


class Inventory extends Component {
    state = {
        products: this.props.products,
        showModal: false,
        productToUpdate: null,
        preEditProductName: null,
        preEditDescription: null,
        preEditPrice: null,
        preEditQuantity: null
    }

    deleteProduct = (productID, index) => {
        const newProducts = [...this.state.products];
        newProducts.splice(index, 1);
        this.setState({ products: newProducts });
    }

    updateProduct = (product_name, description, price, quantity) => {
        console.log("Current Product ID: " + this.state.productToUpdate);
        console.log(product_name, description, price, quantity);

        let updatedProduct = {
            category_id: 15,
            product_name: product_name,
            price: price,
            description: description,
            quantity: quantity,
            photo: "photo"
        }

        console.log("updatedProduct: " + updatedProduct);

        axios({
            method: 'patch',
            url: 'https://ancient-reef-75174.herokuapp.com/products/' + this.state.productToUpdate,
            data: updatedProduct,
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                console.log(response);
                axios({
                    method: 'get',
                    url: 'https://ancient-reef-75174.herokuapp.com/products/',
                    headers: { 'Authorization': this.props.token }
                })
                    .then((response) => {
                        console.log(response.data);
                        let newProductsArr = response.data
                        this.props.updateProduct(newProductsArr);
                        this.setState({ showModal: false });
                    })
            });
    };

    render() {

        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} onChange={props.change} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }

        const products = this.state.products.map((product, index) => {
            return <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category_id}</td>
                <td><Button bsSize="small" bsStyle="info" onClick={() => {
                    this.setState({ 
                        showModal: true, 
                        productToUpdate: product.id,
                        preEditProductName: product.product_name,
                        preEditDescription: product.description,
                        preEditPrice: product.price,
                        preEditQuantity: product.quantity
                    })}} key={product.id}>Edit</Button></td>
                <td><Button bsSize="small" bsStyle="danger" onClick={() => {
                    this.deleteProduct(product.id, index);
                    this.props.onDeleteProduct(product.id, index);
                }}>Delete</Button></td>
            </tr>;
        });

        return <div className="container">
            <Col md={1} />
            <Col md={10}>
                <ButtonToolbar style={{ justifyContent: 'center', display: 'flex' }}>
                    <Button style={{ margin: 10 }} onClick={() => console.log('All Products Clicked!')}>All Products</Button>
                    <Button style={{ margin: 10 }} onClick={() => console.log('Men\'s Clothes Clicked!')}>Men's</Button>
                    <Button style={{ margin: 10 }} onClick={() => console.log('Women\'s Clothes Clicked!')}>Women's</Button>
                    <Button style={{ margin: 10 }} onClick={() => console.log('Gameday Clicked!')}>Gameday</Button>
                    <Button style={{ margin: 10 }} onClick={() => console.log('Gifts Clicked!')}>Gifts</Button>
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
                {this.state.showModal ?
                    <div className="static-modal">
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Update Existing Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: 'left' }}>
                                <form>
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Product Category</ControlLabel>
                                        <FormControl componentClass="select">
                                            <option value="Winter Gear">Select a Category</option>
                                            <option value="Winter Gear">Winter Gear</option>
                                            <option value="Hats">Hats</option>
                                            <option value="Bags">Bags</option>
                                            <option value="Stickers">Stickers</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FieldGroup id="formControlsText" type="text" label="Product Name" placeholder={this.state.preEditProductName} inputRef={(ref) => { this.product_name = ref }} />
                                    <FieldGroup id="formControlsPrice" type="text" label="Price" placeholder={this.state.preEditPrice} inputRef={(ref) => { this.price = ref }} />
                                    <FieldGroup id="formControlsPrice" type="text" label="Quantity" placeholder={this.state.preEditQuantity} inputRef={(ref) => { this.quantity = ref }} />
                                    <FieldGroup id="formControlsFile" type="file" label="Product Image" />

                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Product Description</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder={this.state.preEditDescription} inputRef={(ref) => { this.description = ref }} />
                                    </FormGroup>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.setState({ showModal: false })}>Cancel</Button>
                                <Button type="button" bsStyle="success" onClick={() => this.updateProduct(this.product_name.value, this.description.value, this.price.value, this.quantity.value)}>Update Product</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                    : null}
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

const mapDispatchToProps = dispatch => {
    return {
        onDeleteProduct: (productID, index) => dispatch(actionTypes.deleteProduct(productID, index)),
        updateProduct: (products) => dispatch(actionTypes.editProduct(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
