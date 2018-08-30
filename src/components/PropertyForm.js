import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addProperty} from '../actions/index';

class PropertyForm extends Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
            Name: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        e.preventDefault;
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(){
        this.props.addProperty(this.state.Name);
    }

    render(){
        return (
            <div className='container'>
                <div className='cell'>
                    <h4 className='cellTitle'>Add Property</h4>
                    <label htmlFor='Name'>Name</label>
                    <input name='Name' onChange={this.onChange} value={this.state.Name}/>
                    <button onClick={this.onSubmit}>Save</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {addProperty})(PropertyForm)
