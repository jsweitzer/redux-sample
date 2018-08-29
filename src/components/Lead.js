import React, { Component } from 'react';

class Lead extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = props;
    this.onChange = this.onChange.bind(this);
    this.renderProperties = this.renderProperties.bind(this);
    }
    componentWillReceiveProps(newProps){
        this.setState(newProps);
    }
  onChange(e){
    e.preventDefault;
    this.setState({[e.target.name]: e.target.value});
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
                <input name={p} onChange={this.onChange} value={curState[p] == undefined ? '' : curState[p]}/>
            </div>
        )
    })
    return elements;
}
  render(){
    const properties = this.renderProperties(this.props.lead)
    return (
        <div className='properties'>
            {properties}
        </div>
    )
  }
}

export default Lead
