import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addProperty} from '../actions/index';

class PropertyForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        name: 'default',
        value: 'default'
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    }
  onChange(e){
    e.preventDefault;
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(){
      this.props.addProperty(this.state);
  }
  render(){
    return (
        <div className='container'>
            <div className='cell'>
                <h4 className='cellTitle'>Add Property</h4>
                <label htmlFor='name'>Name</label>
                <input name='name' onChange={this.onChange} value={this.state.name}/>
                <label htmlFor='value'>Value</label>
                <input name='value' onChange={this.onChange} value={this.state.value} />
                <button onClick={this.onSubmit}>Save</button>
            </div>
        </div>
    )
  }
}

export default connect(null, {addProperty})(PropertyForm)
