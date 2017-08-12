import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function GoHomeButton(props){
    return (
        <LinkContainer to="/app">
            <Button block bsSize="lg" bsStyle="primary">Go Back</Button>
        </LinkContainer>
    );
}