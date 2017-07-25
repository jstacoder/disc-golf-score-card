/* jshint moz:true */
/* jshint esversion: 6 */
import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, PageHeader } from 'react-bootstrap';
import { BootstrapTable } from 'react-bootstrap-table';

class AddCourseForm extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            items:  ['Name', 'Location', 'number_of_holes'],
            name: '',
            location: '',
            number_of_holes: '',
        };
    }
    setValue = (field, e) => {
        let o = {};
        o[field] = e.target.value;
        this.setState(o);   
    }
    handleSubmit = (e) => {
        e.preventDefault();

        let name = this.state.name.trim();
        let location = this.state.location.trim();
        let number_of_holes = this.state.number_of_holes;

        if(!name || !location){
            console.log("NO VALUE!!! RETURNING!!!!");
            return;
        }
        let submitArgs = {
            name: name,
            location: location,
            number_of_holes: number_of_holes
        };
        console.log("SUBMITTING WITH: ", submitArgs);
        this.props.onCourseSubmit(name, location, number_of_holes);
        this.setState({
            name:'',
            location:'',
            number_of_holes:'',
            items:  ['Name', 'Location', 'number_of_holes'],
        });
    }
    handleChange = (e, name) => {
        let state = {};
        state[name] = e.target.value;
        this.setState(state);
    }
    render(){    
        let formControls = this.state.items.map((itm) => {
            return (
                <FormGroup key={`fg-${itm}`}> 
                    <ControlLabel>
                        {itm}
                    </ControlLabel>
                    <FormControl 
                        key={`${itm}-contyrol`}
                        name={itm.toLowerCase()} 
                        type="text" 
                        value={this.state[itm.toLowerCase()]} 
                        onChange={(e) =>{
                                this.handleChange(e, itm.toLowerCase())
                        }}/>
                    <FormControl.Feedback />
                </FormGroup>
            );
        });    
        return (
            <div>
            <PageHeader>Add new Course</PageHeader>
            <Form method="post" action="/course/" onSubmit={this.handleSubmit}>
                {formControls}         
                <FormControl type="submit" value="submit" />
            </Form>
            </div>
        );
    }
}

export default AddCourseForm