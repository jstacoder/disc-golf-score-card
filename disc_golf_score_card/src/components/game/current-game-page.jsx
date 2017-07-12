import React, { Component } from 'react';

export default class CurrentGamePage extends Component {
    render(){
        return (
            <ul>
                <li>{this.props.gameData.course}</li>
                {this.props.gameData.players.map(player => (<li>{player.name}</li>))}
            </ul>
        );
    }
}