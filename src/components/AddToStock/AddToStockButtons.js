import React from 'react'
import { Button } from 'react-bootstrap/lib/'

const productBtn = (props) => {
    return <div>
        <Button bsStyle="danger" style={{ margin: 10, width: 250 }} onClick={props.click}>
            {props.name} ({props.quantity})
        </Button>
    </div>
}

export default productBtn