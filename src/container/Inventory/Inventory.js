import React, { Component } from 'react'
import { connect } from 'react-redux'
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
} from "react-bootstrap/lib/"
import axios from 'axios'
import * as actionTypes from '../../store/actions'
import Refresh from 'react-icons/lib/md/autorenew'



class Inventory extends Component {
    state = {
        products: this.props.products,
        showModal: false,
        productToUpdate: null,
        preEditProductName: null,
        preEditDescription: null,
        preEditPrice: null,
        preEditQuantity: null,
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
        axios({
            method: 'get',
            url: 'https://ancient-reef-75174.herokuapp.com/products/',
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                console.log(category_id)
                let productsArr = response.data.filter((product) => product.category_id === category_id)
                console.log(productsArr)
                this.props.updateProducts(productsArr)
            })
    }

    refreshProducts = () => {
        this.setState({
            showMensCategory: false,
            showWomensCategory: false,
            showKidsCategory: false,
            showMiscCategory: false
        })
        axios({
            method: 'get',
            url: 'https://ancient-reef-75174.herokuapp.com/products/',
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                this.props.updateProducts(response.data)
            })
    }

    deleteProduct = (productID, index) => {
        const newProducts = [...this.props.products]
        newProducts.splice(index, 1)
        this.props.updateProducts(newProducts)
        // axios({
        //     method: 'delete',
        //     url: 'https://ancient-reef-75174.herokuapp.com/products/' + productID,
        //     headers: { 'Authorization': this.props.token }
        // })
        // .then(response => console.log(response))
    }

    updateProduct = (product_name, description, price, quantity) => {
        console.log("Current Product ID: " + this.state.productToUpdate)
        console.log(product_name, description, price, quantity)

        let updatedProduct = {
            category_id: 15,
            product_name: product_name,
            price: price,
            description: description,
            quantity: quantity,
            photo: "photo"
        }

        console.log("updatedProduct: " + updatedProduct)

        axios({
            method: 'patch',
            url: 'https://ancient-reef-75174.herokuapp.com/products/' + this.state.productToUpdate,
            data: updatedProduct,
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                console.log(response)
                axios({
                    method: 'get',
                    url: 'https://ancient-reef-75174.herokuapp.com/products/',
                    headers: { 'Authorization': this.props.token }
                })
                    .then((response) => {
                        console.log(response.data)
                        let newProductsArr = response.data
                        this.props.updateProducts(newProductsArr)
                        this.setState({ showModal: false })
                    })
            })
    }

    render() {

        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} onChange={props.change} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            )
        }

        const sortKeys = (a, b) => { return a.id - b.id }

        const products = this.props.products.sort(sortKeys).map((product, index) => {
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
                    this.deleteProduct(product.id, index)
                    // this.props.onDeleteProduct(product.id)
                }}>Delete</Button></td>
            </tr>
        })

        return (
            <div className="container"style={{ margin: 10 }}>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    <Button onClick={this.refreshProducts}><Refresh /> Show All</Button>
                    <Button onClick={this.showMensCategory}>Men</Button>
                    <Button onClick={this.showWomensCategory}>Women</Button>
                    <Button onClick={this.showKidsCategory}>Kids</Button>
                    <Button onClick={this.showMiscCategory}>Miscellaneous</Button>
                </ButtonToolbar>
                <Col md={1} />
                <Col md={10}>
                    <br />
                    {this.state.showMensCategory ?
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
                                                <option value="select">Select a Category</option>
                                                <option value="">Men's</option>
                                                <option value="1">&nbsp;&nbsp;&nbsp;&nbsp;T-Shirts</option>
                                                <option value="2">&nbsp;&nbsp;&nbsp;&nbsp;Hoodies</option>
                                                <option value="3">&nbsp;&nbsp;&nbsp;&nbsp;Pants</option>
                                                <option value="4">&nbsp;&nbsp;&nbsp;&nbsp;Shorts</option>
                                                <option value="5">&nbsp;&nbsp;&nbsp;&nbsp;Jackets</option>
                                                <option value="6">&nbsp;&nbsp;&nbsp;&nbsp;Hats</option>
                                                <option value="7">&nbsp;&nbsp;&nbsp;&nbsp;Socks</option>
                                                <option value="">Women's</option>
                                                <option value="8">&nbsp;&nbsp;&nbsp;&nbsp;T-Shirts</option>
                                                <option value="9">&nbsp;&nbsp;&nbsp;&nbsp;Tank Tops</option>
                                                <option value="10">&nbsp;&nbsp;&nbsp;&nbsp;Hoodies</option>
                                                <option value="11">&nbsp;&nbsp;&nbsp;&nbsp;Jackets</option>
                                                <option value="12">&nbsp;&nbsp;&nbsp;&nbsp;Shorts</option>
                                                <option value="13">&nbsp;&nbsp;&nbsp;&nbsp;Hats</option>
                                                <option value="14">&nbsp;&nbsp;&nbsp;&nbsp;Socks</option>
                                                <option value="">Kids</option>
                                                <option value="15">&nbsp;&nbsp;&nbsp;&nbsp;T-Shirts</option>
                                                <option value="16">&nbsp;&nbsp;&nbsp;&nbsp;Hoodies</option>
                                                <option value="17">&nbsp;&nbsp;&nbsp;&nbsp;Pants</option>
                                                <option value="18">&nbsp;&nbsp;&nbsp;&nbsp;Shorts</option>
                                                <option value="">Miscellaneous</option>
                                                <option value="19">&nbsp;&nbsp;&nbsp;&nbsp;Ties</option>
                                                <option value="20">&nbsp;&nbsp;&nbsp;&nbsp;Cups</option>
                                                <option value="21">&nbsp;&nbsp;&nbsp;&nbsp;Mugs</option>
                                                <option value="22">&nbsp;&nbsp;&nbsp;&nbsp;Towels</option>
                                                <option value="23">&nbsp;&nbsp;&nbsp;&nbsp;Flags</option>
                                                <option value="24">&nbsp;&nbsp;&nbsp;&nbsp;Keychains</option>
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
        onDeleteProduct: (productID) => dispatch(actionTypes.deleteProduct(productID)),
        updateProducts: (products) => dispatch(actionTypes.editProduct(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
