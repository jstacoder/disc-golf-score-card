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
                    <PageHeader>
                        <h1>Disc Golf Score Card</h1>
                    </PageHeader>
                </Col>
            </Row>
        );
    }
}
export default Heading