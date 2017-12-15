import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductButton from '../../components/AddToStock/AddToStockButtons';
import { 
    ButtonToolbar, 
    Modal, 
    Button, 
    FormGroup, 
    ControlLabel, 
    HelpBlock,
    FormControl
 } from 'react-bootstrap/lib/';
import * as actionTypes from '../../store/actions/actions';
// import axios from 'axios';




class AddToStockButtons extends Component {

    state = {
        cart: [],
        showModal: false,
        updatedProduct: null,
        updatedProductID: null
    }

    addToCart = (product) => {
        let newArr = this.state.cart.concat(product);
        this.setState({ cart: newArr });
        console.log(this.state.cart);
    }

    render() {
        const products = this.props.products.map(product => {
            return <ProductButton key={product.id} name={product.product_name} quantity={product.quantity} click={() => this.setState({ showModal: true, updatedProduct: product.product_name, updatedProductID: product.id })} />
        });

        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} onChange={props.change} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }

        return (
            <div style={{ margin: 10 }} >
                <br /> <br />
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(0, 4)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(4, 8)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(8, 12)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(12, 16)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(16, 20)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(20, 24)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(24, 28)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(28, 32)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(32, 36)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(36, 40)}
                </ButtonToolbar>
                {this.state.showModal ?
                    <div className="static-modal">
                        <Modal.Dialog style={{ overflowY: 'initial' }}>
                            <Modal.Header>
                                <Modal.Title>Your Cart</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: 'left', overflowY: 'auto', height: 500 }}>
                                <h4>Update quantity of {this.state.updatedProduct}</h4>
                                <FieldGroup id="formControlsPrice" type="text" label="Quantity" inputRef={(ref) => { this.quantity = ref }} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
                                <Button bsStyle="success" onClick={() => {
                                    this.props.updateQuantity(this.state.updatedProduct, this.state.updatedProductID, this.quantity.value);
                                    this.setState({ showModal: false });
                                    }}>Update Quantity</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.auth.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementQuantity: (productID, quantity) => dispatch(actionTypes.incrementQuantity(productID, quantity)),
        updateQuantity: (product_name, productID, quantity) => dispatch(actionTypes.updateQuantity(product_name, productID, quantity))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToStockButtons);