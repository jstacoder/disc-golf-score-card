/* jshint moz: true */
import React, { Component } from 'react';
import  * as RB from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';
import Icon from '../widgets/icon';


export default class TurnPage extends Component {
    componentDidMount = () => {
        this.props.setGameStart();
    }
    handleFinish = () => {
        const player = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];         
        const score = this.props.currentTurn.currentDisplayNumber;
        const holeId = this.props.currentTurn.currentHoleId;
        this.props.updateScore(player, score, holeId);
        console.log(player, score, holeId);
        this.props.resetCount();
        this.props.changePlayer(this.props.gameData.players);
    }
    incrementCount = () =>{
        this.props.incrementCount();
    }
    decrementCount = () =>{
        this.props.decrementCount();
    }
    getCurrOffset(num, par){
        if(num == par){
            return 0;
        }
        if(num < par){
            return -(par-num);
        }
        if(num > par){
            return num-par;
        }
    }
    render(){
        if(this.props.gameData && !this.props.gameData.course){           
            return (
                <Redirect to='/app' />
            );
        }             
        const player = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];        
        console.log(this.props);
        const currHoleId = this.props.currentTurn.currentHoleId;        
        const course = this.props.gameData.course;
        const hole = course.holes[this.props.gameData.holesById[currHoleId]];        
        const currDisplayNumber = this.props.currentTurn.currentDisplayNumber;
        const currDisplayOffset = this.getCurrOffset(currDisplayNumber, hole.par);
        const styles = {
                position: 'relative',
                left: '14px',
                top: '6px',
        };
        const offsetNames = {            
            '-2': 'eagle',
            '-1': 'birdy',
            '0' : 'par',
            '1' : 'bogey',
            '2' : 'double bogey',
            'undefined': '',
            'null': '',
        };
        console.log(this, player);
        return (
            <RB.Grid style={{marginTop:"5%"}}>
                <RB.Row>
                    <RB.Col xs={12} sm={12} md={6} lg={8} mdOffset={3} lgOffset={2}>
                        <LinkContainer to="/app/current-game">
                            <RB.Button block bsSize="lg">back to list</RB.Button>
                        </LinkContainer>
                    </RB.Col>
                    <RB.Col xs={12} sm={12} md={6} lg={8} mdOffset={3} lgOffset={2}>

                        <RB.Panel>
                            <RB.PageHeader className='text-center'>{course.display_name} <small className="text-right">hole {hole.number}</small></RB.PageHeader>
                            
                            <RB.Row>
                                <RB.Col xs={12}>
                                    <h1 className="text-center">par {hole.par}</h1>
                                    <h1 className="text-center">{player.name}</h1>
                                    <p className="text-center lead">Stroking: {currDisplayNumber} <small>({currDisplayOffset})  [{offsetNames[currDisplayOffset]}]</small></p>
                                </RB.Col>
                            </RB.Row>
                            <RB.Row>
                                <RB.Col xs={12} sm={2} smOffset={4}>                                
                                    <RB.Well onClick={this.incrementCount} bsSize="sm">
                                        <p  style={styles}>
                                            <Icon  name="plus" size="4x" prefix="glyphicon"/>
                                        </p>
                                    </RB.Well>
                                </RB.Col>
                                <RB.Col xs={12} sm={2} smPush={1}>
                                    <RB.Well onClick={this.decrementCount} bsSize="sm">
                                        <p  style={styles}>
                                            <Icon name="minus" size="4x" prefix="glyphicon" />
                                        </p>
                                    </RB.Well>
                                </RB.Col>
                            </RB.Row>                            
                        </RB.Panel>
                    </RB.Col>
                    <RB.Col xs={12} sm={12} md={6} lg={8} mdOffset={3} lgOffset={2}>
                        <RB.Button onClick={this.handleFinish} bsSize="lg" block>Finish</RB.Button>                   
                    </RB.Col>
                </RB.Row>
            </RB.Grid>
 
        );
    }
}