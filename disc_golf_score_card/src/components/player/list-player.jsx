import React, { Component } from 'react';
import * as reactBS from 'react-bootstrap';
import Icon from '../widgets/icon';
 
export default class ListPlayer extends Component {        
    remove = (player) => {
        this.props.removePlayer(player);
    }
    render(){
        let ListGroupItem = reactBS.ListGroupItem;
        let ListGroup = reactBS.ListGroup;
        let {Grid, Row, Col} = reactBS;
        const divStyle = {
            cursor: 'pointer'
        };
        let loadPlayerElements = () => {
            return (
                <ListGroup>
                    {this.props.playerList.map((itm) =>{
                            return (
                                <ListGroupItem key={itm.id}>
                                    <Row>
                                        <Col xs={2}>
                                            {itm.name} 
                                        </Col>
                                        <Col xs={8}>                                        
                                        </Col>
                                        <Col xs={1}>                                        
                                            <div style={divStyle} className="text-danger" onClick={e=> {this.remove(itm)}}>
                                                <Icon name="close" size="2x"  />
                                            </div>                                            
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            );
                    })
                }
                </ListGroup>
            );
        }
        return (
            <div>
                <reactBS.PageHeader>
                    List Players
                </reactBS.PageHeader>
                {loadPlayerElements()}
            </div>
        );
    }
}
