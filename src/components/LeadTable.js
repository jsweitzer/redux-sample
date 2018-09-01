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
import {getLeads,applySort,addLead, getProperties,updateLead,toggleEditing,deleteLead,toggleFilterEditing,updateFilter} from '../actions/index';
import Row from './Row';
import FilterIcon from '@material-ui/icons/FilterList'
import SwapVert from '@material-ui/icons/SwapVert'
import GroupWork from '@material-ui/icons/GroupWork'
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  icon: {
    marginLeft: '.5em',
    fontSize: 15,
    cursor: 'pointer',
  },
  filter:{
      position: 'absolute',
      top: 0,
      backgroundColor: 'white',
      boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
  },
  activeIcon: {
    marginLeft: '.5em',
    fontSize: 17,
    cursor: 'pointer',
    color: 'red'
  },
  header: {
      display: 'inline-block'
  }
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
        this.onFilterClick = this.onFilterClick.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSortClick = this.onSortClick.bind(this);
        this.onEditFormKeydown = this.onEditFormKeydown.bind(this);
    }
    componentWillMount(){
        this.props.getLeads();
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
    onEditFormKeydown(lead, e){
        if(e.keyCode == 13){
            this.props.updateLead(lead);
        }
    }
    onChange(e){
        e.preventDefault;
        var newState = Object.assign({}, this.state);
        newState.lead[e.target.name] = e.target.value;
        this.setState(newState);
    }
    onFilterClick(propName){
        this.props.toggleFilterEditing(propName);
    }
    onFilterChange(e){
        var payload = {};
        payload.Name = e.target.name.split('_')[0];
        payload.Value = e.target.value;
        this.props.updateFilter(payload)
    }
    onSortClick(propName){
        var sort = {};
        sort.field = propName;
        this.props.applySort(sort);
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
                    if(prop.isEditing){
                        return(
                            <TableCell key={'h'+i}>
                                <Typography className={classes.header} onClick={() => this.onSortClick(prop.Name)} variant='body2'>
                                    {prop.Name}
                                </Typography>
                                <FilterIcon onClick={() => this.onFilterClick(prop.Name)} className={prop.filter != undefined && prop.filter.length != '' ? classes.activeIcon : classes.icon} />
                                <TextField className={classes.filter} name={prop.Name+'_filter'} id={prop.Name+'_filter'} label='Filter' margin="normal" onChange={this.onFilterChange} value={prop.filter == undefined ? '' : prop.filter}/>
                                <GroupWork className={classes.icon}></GroupWork>
                            </TableCell>
                        )
                    }else{
                        return(
                            <TableCell key={'h'+i}>
                                <Typography className={classes.header} onClick={() => this.onSortClick(prop.Name)} variant='body2'>
                                    {prop.Name}
                                </Typography>
                                <FilterIcon onClick={() => this.onFilterClick(prop.Name)} className={prop.filter != undefined && prop.filter.length != '' ? classes.activeIcon : classes.icon} />
                                <GroupWork className={classes.icon}></GroupWork>
                            </TableCell>
                        )
                    }
                })
                var filteredLeads = this.props.Data.filter((v, i) => {
                    var result = true;
                    for(var i = 0; i < this.props.Properties.length; i++){
                        var prop = this.props.Properties[i];
                        console.log('prop.filter: ' + prop.filter)
                        console.log('prop.filter: ' + prop.Name)
                        if(prop.filter != undefined && prop.filter != '' && v[prop.Name] != undefined && !v[prop.Name].toString().toLowerCase().includes(prop.filter.toLowerCase())){
                            result = false;
                            console.log('return false')
                        }
                        console.log('return true')
                    }
                    return result;
                })
                if(this.props.Sort.field != '' && this.props.Sort.asc){
                    filteredLeads.sort((a,b) => {
                        if(a[this.props.Sort.field] < b[this.props.Sort.field]) return -1;
                        if(a[this.props.Sort.field] > b[this.props.Sort.field]) return 1;
                        return 0;
                    })
                }else if(this.props.Sort.field != '' && !this.props.Sort.asc){
                    filteredLeads.sort((a,b) => {
                        if(a[this.props.Sort.field] > b[this.props.Sort.field]) return -1;
                        if(a[this.props.Sort.field] < b[this.props.Sort.field]) return 1;
                        return 0;
                    })
                }
                const dat = filteredLeads.map((data, i) => {
                    return (
                        <Row onEditFormKeydown={this.onEditFormKeydown} onLeadDelete={this.onLeadDelete} onLeadUpdate={this.onLeadUpdate} onRowClick={() => this.onRowClick(data.LeadID)} key={data.LeadID} Data={data} Properties={this.props.Properties} Editing={this.props.Editing.includes(data.LeadID)}/>
                    )
                })

return (
    <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {headers}
                </TableRow>
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
    Properties: state.Properties,
    Sort: state.Sort
})

export default connect(mapStateToProps, {getLeads,applySort,addLead,getProperties,updateLead, toggleEditing,deleteLead,toggleFilterEditing,updateFilter})(withStyles(styles)(LeadTable));