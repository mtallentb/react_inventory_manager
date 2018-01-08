import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductButton from '../../components/SellProducts/SellProductButtons'
import { ButtonToolbar, Button } from 'react-bootstrap/lib/'
import * as actionTypes from '../../store/actions'
import Refresh from 'react-icons/lib/md/autorenew'
import axios from 'axios';

class ProductButtons extends Component {

    state = {
        products: this.props.products,
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

    handleButtonPress = (product_id, index, product_name, price) => {
        console.log(product_id, index, product_name, price)
        this.props.onAddToCart({
            id: product_id,
            index: index,
            product_name: product_name,
            price: price
        })
    }

    render() {

        const sortKeys = (a, b) => {return a.id - b.id}

        const products = this.props.products.sort(sortKeys).map((product, index) => {
            return (
                <ProductButton key={product.id} name={product.product_name} quantity={product.quantity} click={() => {
                    this.handleButtonPress(product.id, index, product.product_name, product.price)
                }}
                />
            )
        })
        // eslint-disable-next-line
        const productButtons = this.props.products.map((product, index) => {
            if (index % 4 === 0) {
                return (
                    <ButtonToolbar key={product.id} style={{ justifyContent: "center", display: "flex" }}>
                        {products.slice(index, (index + 4))}
                    </ButtonToolbar>
                )
            }
        })

        return (
            <div className="container" style={{ margin: 10 }} >
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    <Button onClick={this.refreshProducts}><Refresh /> Show All</Button>
                    <Button onClick={this.showMensCategory}>Men</Button>
                    <Button onClick={this.showWomensCategory}>Women</Button>
                    <Button onClick={this.showKidsCategory}>Kids</Button>
                    <Button onClick={this.showMiscCategory}>Miscellaneous</Button>
                </ButtonToolbar>
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
                {productButtons}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.auth.products,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product) => dispatch(actionTypes.addToCart(product)),
        updateProducts: (category_id) => dispatch(actionTypes.editProduct(category_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductButtons)