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
import {applyGroup,getLeads,applySort,addLead, getProperties,updateLead,toggleEditing,deleteLead,toggleFilterEditing,updateFilter, setNumerics} from '../actions/index';
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
    fontSize: 15,
    cursor: 'pointer',
    color: 'red'
  },
  header: {
      display: 'inline-block',
      cursor: 'pointer'
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
        this.onGroupClick = this.onGroupClick.bind(this);
        this.groupBy = this.groupBy.bind(this);
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
    onGroupClick(propName){
        var nans = {};
        for(var prop in this.props.Properties){
            nans[this.props.Properties[prop].Name] = false;
        }
        for(var i = 0; i < this.props.Data.length; i++){
            for(var prop in this.props.Properties){
                if(isNaN(this.props.Data[i][this.props.Properties[prop].Name])){
                    nans[this.props.Properties[prop].Name] = true;
                }
            }
        }
        this.props.setNumerics(nans);
        this.props.applyGroup(propName);
    }
    groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
    render(){

                const classes = this.props.classes;
                console.log('EDITING ' + this.props.Editing)
                if(this.props.Data == undefined || this.props.Editing == undefined)
                    return (
                        <div>
                        </div>
                    )
                    
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
                                <TextField onBlur={() => this.onFilterClick(prop.Name)} className={classes.filter} name={prop.Name+'_filter'} id={prop.Name+'_filter'} label='Filter' margin="normal" onChange={this.onFilterChange} value={prop.filter == undefined ? '' : prop.filter}/>
                                <GroupWork className={classes.disabledIcon}></GroupWork>
                            </TableCell>
                        )
                    }else{
                        return(
                            <TableCell key={'h'+i}>
                                <Typography className={classes.header} onClick={() => this.onSortClick(prop.Name)} variant='body2'>
                                    {prop.Name}
                                </Typography>
                                <FilterIcon onClick={() => this.onFilterClick(prop.Name)} className={prop.filter != undefined && prop.filter.length != '' ? classes.activeIcon : classes.icon} />
                                <GroupWork onClick={() => this.onGroupClick(prop.Name)} className={prop.Name != undefined && prop.Name == this.props.Group ? classes.activeIcon : classes.icon}></GroupWork>
                            </TableCell>
                        )
                    }
                })
                var filteredLeads = this.props.Data.filter((v, i) => {
                    var result = true;
                    for(var i = 0; i < this.props.Properties.length; i++){
                        var prop = this.props.Properties[i];
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
                if(this.props.Group != undefined && this.props.Group.length > 0){
                    var groups = this.groupBy(filteredLeads, this.props.Group);
                    var groupedRows = [];
                    for(var group in groups){
                        var aggregateEntity = {};
                        for(var prop in this.props.Properties){
                            if(this.props.Nans[prop]){
                                aggregateEntity[this.props.Properties[prop].Name] = '';
                            }else{
                                aggregateEntity[this.props.Properties[prop].Name] = 0;
                            }
                                
                        }
                        aggregateEntity[this.props.Group] = group;
                        for(var i = 0; i < groups[group].length; i++){
                            var entity = groups[group][i]
                            for(var prop in entity){
                                if(prop != this.props.Group && this.props.Nans[prop]){
                                    aggregateEntity[prop] = aggregateEntity[prop] == '' ? entity[prop] : aggregateEntity[prop] + '|' + entity[prop]
                                }else if(prop != this.props.Group && !this.props.Nans[prop])
                                    aggregateEntity[prop] = aggregateEntity[prop] += entity[prop]*1
                                    
                            }
                        }
                        groupedRows.push(aggregateEntity)
                    }
                    filteredLeads = groupedRows;
                }

                const dat = filteredLeads.map((data, i) => {
                    return (
                        <Row isGrouped={this.props.Group.length > 0} onEditFormKeydown={this.onEditFormKeydown} onLeadDelete={this.onLeadDelete} onLeadUpdate={this.onLeadUpdate} onRowClick={() => this.onRowClick(data.LeadID)} key={data.LeadID} Data={data} Properties={this.props.Properties} Editing={this.props.Editing.includes(data.LeadID)}/>
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
    Sort: state.Sort,
    Group: state.Group.grouper,
    Nans: state.Group.numerics
})

export default connect(mapStateToProps, {setNumerics,applyGroup,getLeads,applySort,addLead,getProperties,updateLead, toggleEditing,deleteLead,toggleFilterEditing,updateFilter})(withStyles(styles)(LeadTable));