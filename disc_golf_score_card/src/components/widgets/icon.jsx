/* jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
//import * as fontAwesome from '../../../../node_modules/font-awesome/css/font-awesome.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
//require('font-awesome-webpack');
import classnames from 'classnames';
function getIcon(name, size, spin, pulse, style, prefix = 'fa', ...props){    
    let iconName = `${prefix}-${name}`;
    let iconSize = `fa-${size}`;

    let classOpts = {
        [prefix]: true,
        'fa-spin': spin ? true : false,
        'fa-pulse': pulse ? true : false,
    };
    if(size){
        classOpts[iconSize] = true;
    }
    classOpts[iconName] = true;
    return (
        
        <span className={classnames(classOpts)} style={style} {...props} ></span>
    );
}

class Icon extends Component {
    render(){
        return getIcon(
            this.props.name,
            this.props.size,
            this.props.spin,
            this.props.pulse,
            this.props.style,
            this.props.prefix,            
            ...this.props
        );
    }
}

export default Icon