import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductButton from '../../components/SellProducts/SellProductButtons'
import { ButtonToolbar, Button } from 'react-bootstrap/lib/'
import * as actionTypes from '../../store/actions'
// import axios from 'axios';

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

    filterCategory = (category_id) => {
        console.log(category_id)
        let products = this.props.products.filter((product) => product.category_id === category_id)
        console.log(products)
        this.setState({ products: products })
    }

    render() {

        const sortKeys = (a, b) => {return a.id - b.id}

        const products = this.state.products.sort(sortKeys).map((product, index) => {
            return <ProductButton key={product.id} name={product.product_name} quantity={product.quantity} click={() => 
                this.props.onAddToCart({
                    id: product.id,
                    index: index,
                    product_name: product.product_name,
                    price: product.price,
                    quantity: product.quantity
                })} />

        })

        return (
            <div className="container" style={{ margin: 10 }} >
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    <Button onClick={this.showAllProducts}>Show All</Button>
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
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(40, 44)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(44, 48)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(48, 52)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(52, 56)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(56, 60)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(60, 64)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(64, 68)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(68, 72)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(72, 76)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(76, 80)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(80, 84)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(84, 88)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(88, 92)}
                </ButtonToolbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.auth.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product) => dispatch(actionTypes.addToCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductButtons)