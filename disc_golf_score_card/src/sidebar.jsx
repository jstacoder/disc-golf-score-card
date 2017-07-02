import React, { Component } from 'react'
import { Col, Row, Well } from 'react-bootstrap'

class Sidebar extends Component {
    render(){
        return (
            <Col
                md={3}
                sm={12}
                lg={3}
            >
                <Well>
                    <p>Im a Sidebar</p>
                </Well>
            </Col>
        );
    }
}

export default Sidebar