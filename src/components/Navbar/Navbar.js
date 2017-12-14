import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Modal, Button, Table } from 'react-bootstrap/lib/';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actions';


class Navigation extends Component {

    state = {
        showCart: false
    }

    showCart = () => {
       this.setState({ showCart: true });
    };

    hideCart = () => {
        this.setState({ showCart: false });
    };

    // removeFromCart = (productID) => {
    //     console.log('Item ID: ' + productID)
    //     let newCart = this.props.cart.filter(product => {
    //         return product.id !== productID;
    //     });
    //     console.log(newCart);
    // };

    render() {
        return <div> 
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a>Inventory Manager</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    {this.props.isAuthed ?
                        <NavItem eventKey={1} onClick={this.showCart}>
                            Cart ({this.props.cart.length})
                        </NavItem>
                        :
                        <NavItem eventKey={2} onClick={this.props.login}>
                            Login
                        </NavItem>}
                    {this.props.isAuthed ?
                        <NavItem eventKey={3} onClick={this.props.logout}>
                            Logout
                        </NavItem>
                        :
                        <NavItem eventKey={3} onClick={this.props.createAccount}>
                            Create Account
                        </NavItem>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        {this.state.showCart ? 
            <div className="static-modal">
                    <Modal.Dialog style={{ overflowY: 'initial'}}>
                    <Modal.Header>
                        <Modal.Title>Your Cart</Modal.Title>
                    </Modal.Header>
                        <Modal.Body style={{ textAlign: 'left', overflowY: 'auto', height: 500}}>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Remove From Cart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.cart.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index +1}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.price}</td>
                                        <td style={{textAlign: 'center'}}><Button bsSize="small" bsStyle="danger" onClick={() => {
                                            console.log("Delete " + item);
                                            this.props.removeFromCart(index);
                                            // this.props.onDeleteProduct(item.id, index);
                                        }}>Remove</Button></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideCart}>Close</Button>
                        <Button bsStyle="primary">Checkout</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        : null}
        </div>
        ;
    }
};

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        cart: state.auth.cart,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(actionTypes.showLogin()),
        logout: () => dispatch(actionTypes.authLogout()),
        createAccount: () => dispatch(actionTypes.showCreateAccount()),
        removeFromCart: (index) => dispatch(actionTypes.removeFromCart(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);


