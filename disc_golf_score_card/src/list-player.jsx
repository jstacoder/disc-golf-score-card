import React, { Component } from 'react';
import * as reactBS from 'react-bootstrap';
import * as axios from 'axios';

export default class ListPlayer extends Component {
    constructor(...props){
        super(...props);
        this.state = {
            props: props,
            players:[],
        };
    }
    loadPlayers = () =>{
        axios.get("/api/player")
              .then((res)=>{
                this.setState({players:res.data});
              });
    }
    addPlayer = (player) => {
        let players = this.state.players;
        players.push(player);
        this.setState({players: players});
    }
    componentDidMount = () =>{
        console.log(arguments);
        this.loadPlayers();
    }
    render(){
        let ListGroupItem = reactBS.ListGroupItem;
        let ListGroup = reactBS.ListGroup;
        let loadPlayerElements = () => {
            return (
                <ListGroup>
                    {this.state.players.map((itm) =>{
                            return (
                                <ListGroupItem>{itm.name}</ListGroupItem>
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
