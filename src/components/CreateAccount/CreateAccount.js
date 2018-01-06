import React from 'react'
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from "react-bootstrap/lib/"

const createAccount = (props) => {

    function FieldGroup({ id, label, help, ...props }) {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props} onChange={props.change} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        )
    }

    return <div className="container" style={{ textAlign: "left" }}>
        <Col md={2} />
        <Col md={8}>
            <form>
                <FieldGroup id="formControlsFirstName" type="text" label="First Name" inputRef={(ref) => { this.first_name = ref }} />
                <FieldGroup id="formControlsLastName" type="text" label="Last Name" inputRef={(ref) => { this.last_name = ref }} />
                <FieldGroup id="formControlsEmail" type="text" label="Email" inputRef={(ref) => { this.email = ref }} />
                <FieldGroup id="formControlsPassword" type="password" label="Password" inputRef={(ref) => { this.password = ref }} />
                <FieldGroup id="formControlsPassword" type="password" label="Confirm Password" inputRef={(ref) => { this.confirm_password = ref }} />

                <Button type="button" bsStyle="success" onClick={() => {
                    props.create(this.first_name.value, this.last_name.value, this.email.value, this.password.value, this.confirm_password.value)
                }}>
                    Create Account
                    </Button>
            </form>
            <br />
            <br />
        </Col>
        <Col md={2} />
    </div>
}

export default createAccount