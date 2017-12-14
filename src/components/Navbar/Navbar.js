import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib/';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actions';


class Navigation extends Component {

    render() {
        return <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a>Inventory Manager</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    {this.props.isAuthed ?
                        <NavItem eventKey={1}>
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
        </Navbar>;
    }
};

const mapStateToProps = state => {
    return {
        isAuthed: state.main.isAuthed,
        cart: state.main.cart,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(actionTypes.showLogin()),
        logout: () => dispatch(actionTypes.authLogout()),
        createAccount: () => dispatch(actionTypes.showCreateAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);


