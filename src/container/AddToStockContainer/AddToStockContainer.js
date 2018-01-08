import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductButton from '../../components/AddToStock/AddToStockButtons'
import { 
    ButtonToolbar, 
    Modal, 
    Button, 
    FormGroup, 
    ControlLabel, 
    HelpBlock,
    FormControl
 } from 'react-bootstrap/lib/'
import * as actionTypes from '../../store/actions'
import axios from 'axios'
import Refresh from 'react-icons/lib/md/autorenew'

class AddToStockButtons extends Component {

    state = {
        cart: [],
        products: this.props.products,
        showModal: false,
        updatedProduct: null,
        updatedProductID: null,
        showMensCategory: false,
        showWomensCategory: false,
        showKidsCategory: false,
        showMiscCategory: false
    }

    showAllProducts = () => {
        this.setState({
            products: this.props.products,
            showMensCategory: false,
            showWomensCategory: false,
            showKidsCategory: false,
            showMiscCategory: false
        })
    }

    showMensCategory = () => {
        this.setState({
            showMensCategory: true,
            showWomensCategory: false,
            showKidsCategory: false,
            showMiscCategory: false
        })
    }

    showWomensCategory = () => {
        this.setState({
            showMensCategory: false,
            showWomensCategory: true,
            showKidsCategory: false,
            showMiscCategory: false
        })
    }

    showKidsCategory = () => {
        this.setState({
            showMensCategory: false,
            showWomensCategory: false,
            showKidsCategory: true,
            showMiscCategory: false
        })
    }

    showMiscCategory = () => {
        this.setState({
            showMensCategory: false,
            showWomensCategory: false,
            showKidsCategory: false,
            showMiscCategory: true
        })
    }
    
    filterCategory = (category_id) => {
        let products = this.props.products.filter((product) => product.category_id === category_id)
        this.setState({ products: products })
    }

    updateQuantity = (productID, quantity) => {
        axios({
            method: 'patch',
            url: 'https://ancient-reef-75174.herokuapp.com/products/' + productID,
            data: { quantity: quantity },
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                axios({
                    method: 'get',
                    url: 'https://ancient-reef-75174.herokuapp.com/products/',
                    headers: { 'Authorization': this.props.token }
                })
                    .then((response) => {
                        let newProductsArr = response.data
                        this.props.updateProduct(newProductsArr);
                        this.setState({ showModal: false });
                    })
            });
    };

    updateLocalQuantity = (productID, quantity) => {
        console.log("Given product ID: " + productID)
        let products = [...this.state.products]
        products.forEach((item, index) => {
            if (item.id === productID) {
                console.log("Matching Item " + item.product_name)
                item.quantity = quantity
            }
        });
        this.setState({ products: products })
    };

    addToCart = (product) => {
        let newArr = this.state.cart.concat(product)
        this.setState({ cart: newArr })
        console.log(this.state.cart)
    }

    render() {

        const sortKeys = (a, b) => { return a.id - b.id }

        const products = this.state.products.sort(sortKeys).map(product => {
            return <ProductButton key={product.id} name={product.product_name} quantity={product.quantity} click={() => this.setState({ showModal: true, updatedProduct: product.product_name, updatedProductID: product.id })} />
        })
        // eslint-disable-next-line
        const productButtons = this.state.products.map((product, index) => {
            if (index % 4 === 0) {
                return (
                    <ButtonToolbar key={product.id} style={{ justifyContent: "center", display: "flex" }}>
                        {products.slice(index, (index + 4))}
                    </ButtonToolbar>
                )
            }
        })

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
            <div className='container' style={{ margin: 10 }} >
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    <Button onClick={this.showAllProducts}><Refresh /> Show All</Button>
                    <Button onClick={this.showMensCategory}>Men</Button>
                    <Button onClick={this.showWomensCategory}>Women</Button>
                    <Button onClick={this.showKidsCategory}>Kids</Button>
                    <Button onClick={this.showMiscCategory}>Miscellaneous</Button>
                </ButtonToolbar>
                <br />
                { this.state.showMensCategory ?
                    <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                        <Button onClick={() => this.filterCategory(1)}>Men's T-Shirts</Button>
                        <Button onClick={() => this.filterCategory(2)}>Men's Hoodies</Button>
                        <Button onClick={() => this.filterCategory(3)}>Men's Pants</Button>
                        <Button onClick={() => this.filterCategory(4)}>Men's Shorts</Button>
                        <Button onClick={() => this.filterCategory(5)}>Men's Jackets</Button>
                        <Button onClick={() => this.filterCategory(6)}>Men's Hats</Button>
                        <Button onClick={() => this.filterCategory(7)}>Men's Socks</Button>
                    </ButtonToolbar>
                : null}
                {this.state.showWomensCategory ?
                    <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                        <Button onClick={() => this.filterCategory(8)}>Women's T-Shirts</Button>
                        <Button onClick={() => this.filterCategory(9)}>Women's Tank Tops</Button>
                        <Button onClick={() => this.filterCategory(10)}>Women's Hoodies</Button>
                        <Button onClick={() => this.filterCategory(11)}>Women's Jackets</Button>
                        <Button onClick={() => this.filterCategory(12)}>Women's Shorts</Button>
                        <Button onClick={() => this.filterCategory(13)}>Women's Hats</Button>
                        <Button onClick={() => this.filterCategory(14)}>Women's Socks</Button>
                    </ButtonToolbar>
                : null}
                {this.state.showKidsCategory ?
                    <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                        <Button onClick={() => this.filterCategory(15)}>Kids' T-Shirts</Button>
                        <Button onClick={() => this.filterCategory(16)}>Kids' Hoodies</Button>
                        <Button onClick={() => this.filterCategory(17)}>Kids' Pants</Button>
                        <Button onClick={() => this.filterCategory(18)}>Kids' Shorts</Button>
                    </ButtonToolbar>
                : null}
                {this.state.showMiscCategory ?
                    <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                        <Button onClick={() => this.filterCategory(19)}>Ties</Button>
                        <Button onClick={() => this.filterCategory(20)}>Cups</Button>
                        <Button onClick={() => this.filterCategory(21)}>Mugs</Button>
                        <Button onClick={() => this.filterCategory(22)}>Towels</Button>
                        <Button onClick={() => this.filterCategory(23)}>Flags</Button>
                        <Button onClick={() => this.filterCategory(24)}>Keychains</Button>
                    </ButtonToolbar>
                : null}
                <br />
                {productButtons}
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
                                    this.updateQuantity(this.state.updatedProductID, this.quantity.value)
                                    this.updateLocalQuantity(this.state.updatedProductID, this.quantity.value)
                                    this.setState({ showModal: false })
                                    }}>Update Quantity</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                : null}
            </div>
        )
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
        incrementQuantity: (productID, quantity) => dispatch(actionTypes.incrementQuantity(productID, quantity)),
        updateQuantity: (product_name, productID, quantity) => dispatch(actionTypes.updateQuantity(product_name, productID, quantity)),
        updateProduct: (products) => dispatch(actionTypes.editProduct(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToStockButtons)