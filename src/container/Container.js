import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonToolbar } from 'react-bootstrap/lib/'
import * as actionTypes from '../store/actions'
import LoginContainer from './LoginContainer/LoginContainer'
import CreateAccountContainer from './CreateAccountContainer/CreateAccountContainer'
import SellProductButtons from './SellProductsContainer/SellProductsContainer'
import AddToStockButtons from './AddToStockContainer/AddToStockContainer'
import Inventory from './Inventory/Inventory'
import Orders from './OrdersContainer/OrdersContainer'
import CreateProduct from './CreateProduct/CreateProduct'
import Chart from './ChartContainer/ChartContainer'

class Container extends Component {

    state = {
        showSellProducts: false,
        showAddToStock: false,
        showInventory: false,
        showCreateProduct: false,
        showOrders: false
    }

    showSellProducts = () => {
        this.props.hideChart()
        this.setState({
            showSellProducts: true,
            showAddToStock: false,
            showInventory: false,
            showCreateProduct: false,
            showOrders: false
        })
    }

    showAddToStock = () => {
        this.props.hideChart()
        this.setState({
            showSellProducts: false,
            showAddToStock: true,
            showInventory: false,
            showCreateProduct: false,
            showOrders: false
        })
    }

    showInventory = () => {
        this.props.hideChart()
        this.setState({
            showSellProducts: false,
            showAddToStock: false,
            showInventory: true,
            showCreateProduct: false,
            showOrders: false
        })
    }

    showCreateProduct = () => {
        this.props.hideChart()
        this.setState({
            showSellProducts: false,
            showAddToStock: false,
            showInventory: false,
            showCreateProduct: true,
            showOrders: false
        })
    }

    showOrders = () => {
        this.props.hideChart()
        this.setState({
            showSellProducts: false,
            showAddToStock: false,
            showInventory: false,
            showCreateProduct: false,
            showOrders: true
        })
    }

    render() {
        return ( 
            <div className='container'>
                {this.props.showLogin ? <LoginContainer /> : null}
                {this.props.showCreateAccount ? <CreateAccountContainer /> : null}
                {this.props.isAuthed ?
                <div>
                    <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                        <Button bsStyle="primary" bsSize="large" onClick={this.showSellProducts}>
                            Sell Products
                        </Button>
                        <Button bsStyle="danger" bsSize="large" onClick={this.showAddToStock}>
                            Add to Stock
                        </Button>
                        <Button bsStyle="info" bsSize="large" onClick={this.showInventory}>
                            View Inventory
                        </Button>
                        <Button bsStyle="success" bsSize="large" onClick={this.showCreateProduct}>
                            Create New Product
                        </Button>
                        <Button bsStyle="warning" bsSize="large" onClick={this.showOrders}>
                            Order History
                        </Button>
                    </ButtonToolbar>
                    {this.props.showContainers ? 
                    <div>
                        {this.state.showSellProducts ? <SellProductButtons /> : null}
                        {this.state.showAddToStock ? <AddToStockButtons /> : null}
                        {this.state.showInventory ? <Inventory /> : null}
                        {this.state.showCreateProduct ? <CreateProduct /> : null}
                        {this.state.showOrders ? <Orders /> : null}
                    </div>
                    : null}
                    {this.props.showChart ? <Chart /> : null}
                </div>
                : null}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        showLogin: state.main.showLogin,
        showCreateAccount: state.main.showCreateAccount,
        showChart: state.auth.showChart,
        showContainers: state.auth.showContainers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideChart: () => dispatch(actionTypes.hideChart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)