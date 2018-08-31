import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {addLead, getProperties,updateLead,toggleEditing,deleteLead} from '../actions/index';
import Row from './Row';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}



class LeadTable extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onLeadUpdate = this.onLeadUpdate.bind(this);
        this.onLeadDelete = this.onLeadDelete.bind(this);
    }
    onLeadDelete(lead){
        this.props.deleteLead(lead)
    }
    onSubmit(){
        var newLead = Object.assign({}, this.state.lead);
        if(this.props.isEditing){
            newLead.LeadID = this.props.lead.LeadID;
            this.props.updateLead(newLead);
        }else{
            this.props.addLead(newLead);
        }
    }
    onKeyDown(e){
        if(e.keyCode === 13){
            var newLead = Object.assign({}, this.state.lead);
            if(this.props.isEditing){
                newLead.LeadID = this.props.lead.LeadID;
                this.props.updateLead(newLead);
            }else{
                this.props.addLead(newLead);
            }
        }
    }
    onRowClick(leadId){
        if(!this.props.Editing.includes(leadId))
            this.props.toggleEditing(leadId);
    }
    onLeadUpdate(lead){
        this.props.updateLead(lead);
    }
    onChange(e){
        e.preventDefault;
        var newState = Object.assign({}, this.state);
        newState.lead[e.target.name] = e.target.value;
        this.setState(newState);
    }
    render(){

                const classes = this.props.classes;
                console.log('EDITING ' + this.props.Editing)
                if(this.props.Data == undefined || this.props.Editing == undefined)
                    return (
                        <div>
                        </div>
                    )
                const rows = [
                    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
                    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
                    createData('Eclair', 262, 16.0, 24, 6.0),
                    createData('Cupcake', 305, 3.7, 67, 4.3),
                    createData('Gingerbread', 356, 16.0, 49, 3.9),
                ];
                console.log('PROPS'+JSON.stringify(this.props));
                var props = [];
                const headers = this.props.Properties.map((prop, i) => {
                    return(
                        <TableCell key={'h'+i}>
                            {prop.Name}
                        </TableCell>
                    )
                })
                const dat = this.props.Data.map((data, i) => {
                    return (
                        <Row onLeadDelete={this.onLeadDelete} onLeadUpdate={this.onLeadUpdate} onRowClick={() => this.onRowClick(data.LeadID)} key={data.LeadID} Data={data} Properties={this.props.Properties} Editing={this.props.Editing.includes(data.LeadID)}/>
                    )
                })

return (
    <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                {headers}
            </TableHead>
            <TableBody>
                {dat}
            </TableBody>
        </Table>
    </Paper>
    );
    }
}  
        


LeadTable.propTypes = {
  classes: PropTypes.object.isRequired,
  Data: PropTypes.array.isRequired,
  Editing: PropTypes.array,
};

const mapStateToProps = state => ({
    Data: state.Leads,
    Editing: state.Editing,
    Properties: state.Properties
})

export default connect(mapStateToProps, {addLead,getProperties,updateLead, toggleEditing,deleteLead})(withStyles(styles)(LeadTable));