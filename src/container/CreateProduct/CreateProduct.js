import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actions';
import axios from 'axios';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from "react-bootstrap/lib/";

class CreateProduct extends Component {

    state = {
        show: true
    }

    addToDB = (product_name, description, price, quantity) => {
        console.log(product_name, description, price, quantity);

        let newProduct = {
            category_id: 15,
            product_name: product_name,
            price: price,
            description: description,
            quantity: quantity,
            photo: "photo"
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/products', 
            data: newProduct,
            headers: { 'Authorization': this.props.token }
        })
        .then((response) => {
            console.log(response);
            axios({
                method: 'get',
                url: 'http://localhost:5000/products/',
                headers: { 'Authorization': this.props.token }
            })
            .then((response) => {
                console.log(response.data);
                this.props.updateProducts(response.data);
            });
        });
    };

    hideCreateProduct = () => {
        this.setState({ show: false });
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
        return <div className="container" style={{ textAlign: "left" }}>
            <Col md={2} />
            <Col md={8}>
            <br /><br />
        {this.state.show ?
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
                    <FieldGroup id="formControlsText" type="text" label="Product Name" inputRef={(ref) => { this.product_name = ref }} />
                    <FieldGroup id="formControlsPrice" type="text" label="Price" inputRef={(ref) => { this.price = ref }} />
                    <FieldGroup id="formControlsPrice" type="text" label="Quantity" inputRef={(ref) => { this.quantity = ref }} />
                    <FieldGroup id="formControlsFile" type="file" label="Product Image" />

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Product Description</ControlLabel>
                        <FormControl componentClass="textarea" inputRef={(ref) => { this.description = ref }} />
                    </FormGroup>

                    <Button type="button" bsStyle="success" onClick={() => {
                        this.addToDB(this.product_name.value, this.description.value, this.price.value, this.quantity.value);
                        this.hideCreateProduct();
                    }}>
                        Create Product
                    </Button>
                </form>
                : null}
                <br />
                <br />
            </Col>
            <Col md={2} />
        </div>
    };
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        products: state.auth.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProducts: (products) => dispatch(actionTypes.loadProducts(products))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);

