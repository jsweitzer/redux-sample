import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addLead} from '../actions/index';

class LeadForm extends Component {
  constructor(props, context) {
    super(props, context);
    var proper = [];
    for(var property in props){
        if(props.hasOwnProperty(property)){
            proper.push(property);
        }
    }
    const newState = proper.map((p, i) => {
        return(
            <div key={i} className='properties'>
                <label htmlFor={p} onChange={this.onChange}>{p}</label>
                <input name={p} onChange={this.onChange}/>
            </div>
        )
    })
    this.state = props;
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    }
  onChange(e){
    e.preventDefault;
    var newState = this.state.lead;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }
  onSubmit(){
      this.props.addLead(this.state.lead);
  }
  renderProperties(lead){
    var props = [];
    for(var property in lead){
        if(lead.hasOwnProperty(property)){
            props.push(property);
        }
    }
    var curState = this.state.lead;
    const elements = props.map((p, i) => {
        return(
            <div key={i} className='properties'>
                <label htmlFor={p} onChange={this.onChange}>{p}</label>
                <input name={p} onChange={this.onChange}/>
            </div>
        )
    })
    return elements;
}
  render(){
    const properties = this.renderProperties(this.props.lead)
    return (
        <div className='cell'>
            <h4 className='cellTitle'>Add Lead</h4>
            {properties}
            <button onClick={this.onSubmit}>Save</button>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    lead: state.Leads[0]
})

export default connect(mapStateToProps, {addLead})(LeadForm)
