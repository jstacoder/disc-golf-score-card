import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    Table,
    Grid,
    Row,
    Col,
    Button,
    PageHeader,
    Caption
} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

export default class CurrentGamePage extends Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.state = {
            editingCell: {},
            editError: false,
        };
    }
    changeCell = (editId, newVal) =>{
        this.setState({
            editingCell: { ...this.state.editingCell, [editId] : newVal }
        });
    }
    componentWillMount() {
        const course = this.props.gameData.course;
        const holes = this.props.gameData.course.holes;
        const currHoleId = this.props.currentTurn.currentHoleId || 0;
        
        const currentPlayerIndex = this.props.currentTurn.currentPlayerIndex;
        const currentPlayer = this.props.gameData.players[currentPlayerIndex];
        this.changeCell(`edit-input-${currHoleId}-${currentPlayer.name}`, currentPlayerHoleScore);
        const currentPlayerScores = this.props.players.scores[currentPlayer.name];
        const currentPlayerHoleScore = currentPlayerScores[currHoleId];
        console.log("MOUNTED!!! ", this.props.currentTurn, currentPlayerScores, currentPlayerHoleScore);
        this
            .props
            .setCount({stroke: currentPlayerHoleScore});
            

    }
    formatNameForDisplay = (name) => {
        let [start,
            end] = name.split('_');

        let fixFirst = (word) => {
            let [first,
                ...rest] = word.split('');
            return first.toUpperCase() + rest.join('');
        }
        return [start, end]
            .map(fixFirst)
            .join(' ')
    }
    toggleEditError = (val = null) =>{
        if(val === null){
            val = !this.state.editError;
        }
        this.setState({
            editError: val
        });
    }
    renderEndButtons = () => {
        const course = this.props.gameData.course;
        const holes = course.holes;
        const currHoleId = this.props.currentTurn.currentHoleId || 0;
        const isLastHole = (currHoleId == holes.length - 1);
        const isFirstTurn = currHoleId == 0;
        let rtn = [(
                <LinkContainer key={'my-link'} to="/app/turn/1">
                    <Button>{(currHoleId == 0)
                            ? 'start'
                            : 'continue'}
                        game</Button>
                </LinkContainer>
            )];
        if (isLastHole) {
            rtn.push(
                <IndexLinkContainer key={'my-link-2'} to="/app">
                    <Button>Finish Game</Button>
                </IndexLinkContainer>
            );
        }
        return rtn;
    }
    renderHoles = (currId) => {
        const course = this.props.gameData.course;
        let _holes = {
            front_nine: [],
            back_nine: []
        };
        const holes = this.props.gameData.course.holes;
        const currHoleId = this.props.currentTurn.currentHoleId || holes[0].id;
        const currentHole = course.holes[this.props.currentTurn.currentHoleId];
        let holeCopy = [...holes],
            player,
            hole;
        const players = this.props.gameData.players;
        const scores = this.props.players.scores;
        const totals = this.props.players.totalScores;

        while (_holes.front_nine.length != 9) {
            _holes
                .front_nine
                .push(holeCopy.splice(0, 1)[0]);
        }
        if (holeCopy.length) {
            while (holeCopy.length) {
                _holes
                    .back_nine
                    .push(holeCopy.splice(0, 1)[0]);
            }
        }

        return Object
            .keys(_holes)
            .map((key) => {
                const holes = _holes[key];
                let parTotal = 0;

                // if(holes.length){     parTotal = holes.reduce( (a, b) => (         a.par +
                // b.par     )); }
                const styles = {
                    textAlign: 'center',
                    width: '103px'
                };
                const baseStyles = {
                    marginRight: 0,
                    marginLeft: 0,
                    backgroundColor: '#fff',
                    borderColor: '#ddd',
                    borderWidth: '1px',
                    borderRadius: '4px 4px 0 0',
                    WebkitBoxShadow: 'none',
                    boxShadow: 'none'
                };
                const moreStyles = {
                    position: 'relative',
                    padding: '10px 15px 0px',
                    margin: '0 -15px 15px',
                    borderColor: '#e5e5e5 #eee #eee',
                    borderStyle: 'solid',
                    borderWidth: '1px 0',
                    WebkitBoxShadow: 'inset 0 3px 6px rgba(0,0,0,.05)',
                    boxShadow: 'inset 0 3px 6px rgba(0,0,0,.05)'
                };
                const tableStyles = {
                    ...moreStyles,
                    ...baseStyles
                };
                return holes.length
                    ? (
                        <div style={tableStyles} key={key}>
                            <Table condensed bordered striped>
                                <caption>{this.formatNameForDisplay(key)}</caption>
                                <thead>
                                    <tr>
                                        <th>Hole num</th>
                                        {holes.map(hole => (
                                            <th style={styles} key={`${hole.id}-header`}>{hole.number}</th>
                                        ))}
                                        <th>Totals</th>
                                    </tr>
                                    <tr>
                                        <th>Par</th>
                                        {holes.map(hole => {
                                            parTotal += hole.par;
                                            return (
                                                <th style={styles} key={`${hole.id}-par-header`}>{hole.par}</th>
                                            );
                                        })}
                                        <th>{parTotal}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this
                                        .props
                                        .gameData
                                        .players
                                        .map((player, pidx) => {
                                            //console.log(totals);
                                            let playerTotal = 0; //totals[player.name];
                                            let currScore = 0; //scores[player.name][currHoleId];
                                            if (currScore) {
                                                playerTotal += currScore;
                                            }
                                            return (
                                                <tr key={`tr-${player - name}-${pidx}`}>
                                                    <td>
                                                        <bold>{player.name}</bold>
                                                    </td>
                                                    {holes.map((hole, hidx) => {
                                                       // console.log('hole: ', hole, 'hole_index ', hidx, 'holes: ', holes);
                                                        const playerScore = this.props.players.scores[player.name][hidx];
                                                        playerTotal += (playerScore || 0);
                                                        const tableDataId = `td-${hidx}-${player.name}`;
                                                        const editId = `edit-input-${hidx}-${player.name}`;
                                                        const isEditing = this.props.editing[tableDataId];
                                                        const backgroundColor = this.state.editError ? 'red' : "#212345";
                                                        const inputStyle = {                                                            
                                                            borderStyle:'ridged',                                                            
                                                            backgroundColor: backgroundColor,
                                                            color:"#fffeef",
                                                            minWidth: '110%',
                                                            maxWidth:'160%',
                                                            borderRadius: '0px',
                                                            height: '30px',
                                                            marginTop: '-4px',
                                                            marginBottom: '-10px',
                                                            marginLeft: '-5px',
                                                            marginRight: '-5px',
                                                            paddingTop: '5px',
                                                        };
                                                        const clickFunc = (e) => {                                                            
                                                            if(!isEditing){
                                                                e.persist();
                                                                const old_target = e.target;                               
                                                                let isClickOff;                                 
                                                                this.props.actions.setEditing(tableDataId);
                                                                //this.setState({ editingCell: playerScore});
                                                                this.changeCell(editId, playerScore);
                                                                const keyPressEvent = event =>{             
                                                                    const lastKey = this.state.editingCell[editId];
                                                                    const allowedEntries = [1,2,3,4,5,6,7,8];
                                                                    if(event.key == 'Enter'){
                                                                        completeEditing();
                                                                        return;
                                                                    }
                                                                    if(parseInt(event.key) in allowedEntries){
                                                                        //this.setState({editingCell: event.key});
                                                                        this.changeCell(editId, event.key);
                                                                        this.toggleEditError(false);
                                                                    }else{
                                                                        this.toggleEditError(true);
                                                                    }
                                                                };
                                                                const clickEvent = event =>{
                                                                    event.stopPropagation();
                                                                    isClickOff = editId != event.target.id;
                                                                    if(isClickOff){
                                                                        console.log("COMPLETING CLICK HANDLER");
                                                                        completeEditing();
                                                                    }                                           
                                                                    console.log("STARTING NEW CLICK HANDLER");                         
                                                                };
                                                                const completeEditing = () =>{
                                                                    const score = this.state.editingCell[editId];
                                                                    this.props.actions.updateScore(player, score, hidx);
                                                                    this.props.actions.updateTotal(player, score)
                                                                    this.props.actions.unsetEditing(tableDataId);
                                                                    this.toggleEditError(false);
                                                                    document.removeEventListener('keypress', keyPressEvent);
                                                                    document.removeEventListener('click', clickEvent);
                                                                    return;
                                                                };
                                                                document.addEventListener('keypress',keyPressEvent);
                                                                document.addEventListener('click',clickEvent);
                                                                return;
                                                            }                                                            
                                                        };    
                                                        // const changeFunc = (e) =>{                                                    
                                                        //     this.setState(
                                                        //         {
                                                        //             editingCell: e.target.value
                                                        //         }
                                                        //     );                                                       
                                                        // }                                    
                                                        // const blurFunc = (e) =>{
                                                        //     this.props.actions.updateScore(player, e.target.value, hidx);
                                                        //     this.props.actions.unsetEditing(tableDataId);
                                                        // }
                                                        let content = playerScore;                
                                                        if(editId in this.state.editingCell){
                                                            content = this.state.editingCell[editId];
                                                        }
                                                        const tdContent = isEditing ? (<p id={editId} style={inputStyle}>{content}</p>) : (playerScore || 0);
                                                        return (
                                                            <td onClick={clickFunc} id={tableDataId}  key={`score-${player.name}-${pidx}-${hidx}`} style={styles}>{tdContent}</td>
                                                        );
                                                    })}
                                                    <td>{totals[player.name] || 0}</td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </Table>
                        </div>
                    )
                    : '';
            })
            .concat(this.renderEndButtons());
    }
    render() {
        const course = this.props.gameData.course;
        const holes = course.holes;
        const currHoleId = this.props.currentTurn.currentHoleId || holes[0].id;
        const currentHole = course.holes[this.props.currentTurn.currentHoleId];
        const currentPlayer = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];
        return (
            <Grid>
                <Row>
                    <Col xs={12}>                        
                        <PageHeader>{this.props.gameData.course.display_name}</PageHeader>
                        <p className='lead'>
                            <small>current player: {currentPlayer.name}</small>
                        </p>
                        <p className='lead'>
                            <small>current hole: {currentHole.number}</small>
                        </p>
                        {this.renderHoles(currHoleId)}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
