import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lead from './Lead';

class Leads extends Component {
  constructor(props, context) {
    super(props, context);
    }

  render(){

    if(this.props.Leads != undefined){
        const leads = this.props.Leads.map((lead, i) => {
            return (
                <div key={i} className='cell'>
                    <Lead 
                        lead={lead}
                     />
                </div>
            )
        })
        return(
            <div className='container  table'>
                <h4 className='table-title'>Leads</h4>
                {leads}
            </div>
        )
    }else{
        return(
            <div className='container'>
                got none
            </div>
        )
    }
  }
}
const mapStateToProps = state => ({
    Leads: state.Leads
})
export default connect(mapStateToProps, {})(Leads)
