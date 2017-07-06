import React, { Component } from 'react';
import * as reactBS from 'react-bootstrap';
import * as axios from 'axios';

export default class AddPlayer extends Component {
    constructor(...args){
        super(...args);

        this.state = {
            props: args,
            player: {
                name: '',
                frisbees: [],
            }
        };
    }
    handleNameChange = (e) => {
        let player = this.state.player;
        player.name = e.target.value;
        this.setState({player: player});
    }
    handleFrisbeeChange = (e) => {
        let player = this.state.player;
        player.frisbees = e.target.value;
        this.setState({player: player});
    }
    handleSubmit = (e) => {
        e.preventDefault();

        let name = this.state.player.name;
        let frisbees = this.state.player.frisbees;

        console.log("name: ", name, "frisbees: ", frisbees);

        let player = {
            name: name,
            frisbees: frisbees,
        };

        this.setState({ player: {
            name: '',
            frisbees:[]
        }});

        axios.post('/api/player/', player)
                .then((res) =>{
                    console.log('good request!', res);
                })
                .catch((err) =>{
                    console.log('bad request!', err);
                });
    }
    render(){
        let setState = this.setState;
        return (
            <div>
                <reactBS.PageHeader>Add Player</reactBS.PageHeader>
                <reactBS.Form method="post" action="" onSubmit={this.handleSubmit}>
                    <reactBS.FormGroup>
                        <reactBS.ControlLabel>Name</reactBS.ControlLabel>
                        <reactBS.FormControl 
                            type="text" 
                            value={this.state.player.name} 
                            onChange={this.handleNameChange}
                        />
                    </reactBS.FormGroup>
                    <reactBS.FormGroup>
                        <reactBS.ControlLabel>add frisbee</reactBS.ControlLabel>
                        <reactBS.FormControl 
                            type="text" 
                            value={this.state.player.frisbees} 
                            onChange={this.handleFrisbeeChange}
                        />
                    </reactBS.FormGroup>
                    <reactBS.FormControl type="submit" value="submit" />
                </reactBS.Form>
            </div>
        );
    }
}
