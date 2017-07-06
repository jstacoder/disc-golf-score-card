/* jshint esversion:6 */
/* jshint moz: true */

import React, { Component } from 'react';
import * as reactBootstrap from 'react-bootstrap';

export default class AddGame extends Component {
    constructor(...args){
        super(...args);
        this.state = { props: args }; 
    }
    render(){
        return (
            <div>
                <reactBootstrap.Grid>
                    <reactBootstrap.Row>
                        <reactBootstrap.Col md={12}>
                            <reactBootstrap.PageHeader>
                                Add new gaMe
                            </reactBootstrap.PageHeader>
                        </reactBootstrap.Col>    
                    </reactBootstrap.Row>
                </reactBootstrap.Grid>
            </div>
        );
    }
}
