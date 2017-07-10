import React, { Component } from 'react'
import { PageHeader, Row, Col } from 'react-bootstrap'

class Heading extends Component {
    render(){
        return (
            <Row>
                <Col 
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <PageHeader>Disc Golf Score Card</PageHeader>
                </Col>
            </Row>
        );
    }
}
export default Heading