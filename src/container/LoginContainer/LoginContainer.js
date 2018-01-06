import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../store/actions'
import Login from '../../components/Login/Login'
// import axios from 'axios'

class LoginContainer extends Component {

    render() {
        return (
            <Login login={(email, password) => this.props.onLogin(email, password)} />
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(LoginContainer)