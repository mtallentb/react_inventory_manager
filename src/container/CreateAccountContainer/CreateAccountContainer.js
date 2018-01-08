import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'
import CreateAccount from '../../components/CreateAccount/CreateAccount'
import axios from 'axios'


class CreateAccountContainer extends Component {
    
    render() {
        return (
            <CreateAccount create={(first_name, last_name, email, password, password_confirm) => this.props.onCreateAccount(first_name, last_name, email, password, password_confirm)} />
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onCreateAccount: (first_name, last_name, email, password, password_confirm) => {
            axios
                .post("https://ancient-reef-75174.herokuapp.com/users", {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirm
                })
                .then((response) => {
                    console.log(response)
                    console.log("Your Auth Token is: " + response.data.auth_token)
                })
                .then(() => dispatch({ type: actionTypes.HIDE_CREATE_ACCOUNT }))    
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export default connect(null, mapDispatchToProps)(CreateAccountContainer)
