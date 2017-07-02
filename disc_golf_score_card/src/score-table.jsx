import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

const items = [1, 2, 3, 4, 5]
const tableItems = items.map((itm) => 
    <td>{itm}</td>
);
const rows = tableItems.map((itm) =>
    <tr>{itm}</tr>
); 

class ScoreTable extends Component {
    render(){
        return (
            <Table>
                <thead>
                    <tr>
                        <td>
                            heading
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
}

export default ScoreTable