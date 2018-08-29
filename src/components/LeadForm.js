import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addLead, getProperties} from '../actions/index';

class LeadForm extends Component {
  constructor(props, context) {
    super(props, context);
    var proper = [];
    var sstate = {lead: {}};
    for(var property in props.lead){
        if(props.lead.hasOwnProperty(property)){
            sstate.lead[property] = '';
        }
    }
    for(var p in proper){

    }
    this.state = sstate;
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    }
    componentWillMount(){
        this.props.getProperties();
    }
  onChange(e){
    e.preventDefault;
    var newState = this.state.lead;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }
  onSubmit(){
      var newLead = Object.assign({}, this.state.lead);
      this.props.addLead(newLead);
  }
  renderProperties(){
    var props = [];
    for(var property in this.props.properties){
        props.push(this.props.properties[property].Name);
    }
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
    lead: state.Leads[0],
    properties: state.Properties
})

export default connect(mapStateToProps, {addLead,getProperties})(LeadForm)
