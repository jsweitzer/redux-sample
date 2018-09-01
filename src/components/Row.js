import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 'fit-content',
    },  
    textField: {
        margin: 0,
    },
    left: {
        display: 'inline-flex',
        marginRight: '1em'
    },
    right: {
        display: 'inline-flex',
        float: 'right'
    },
    button: {
        margin: theme.spacing.unit,
    },  
    icon: {
        margin: theme.spacing.unit,
        fontSize: 20,
        cursor: 'pointer'
      },
    disabledIcon:{
        margin: theme.spacing.untit,
        fontSize: 20,
        color: 'gray'      
      },
  });

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
      e.preventDefault;
      var newLead = Object.assign({}, this.state.Data);
        for(var i = 0; i< this.props.Properties.length; i++)
        {
            if(newLead.LeadID+'_'+this.props.Properties[i].Name == e.target.name)
                newLead[this.props.Properties[i].Name] = e.target.value;
        }
      this.setState({Data: newLead});
    }
    
    render(){
        const classes = this.props.classes;
        const data = this.props.Data;
        const textFieldProps = {
            fullWidth: false,
            margin: 'none',
        }
        const cells = this.props.Properties.map((prop, i) => {
        if(!this.props.Editing || prop.Name == 'LeadID'){
            return (
                <TableCell key={data.LeadID+i}>
                    {data[prop.Name]}
                </TableCell>
            )
        }else{
            return (
                <TableCell key={data.LeadID+i}>
                    <TextField  onKeyDown={(e) => this.props.onEditFormKeydown(this.state.Data,e)} inputProps={textFieldProps} className={classes.textField} name={data.LeadID+'_'+prop.Name} id={data.LeadID+'_'+prop.Name} onChange={this.onChange} margin="normal" value={this.state.Data[prop.Name] == undefined ? '' : this.state.Data[prop.Name]}/>
                </TableCell>
                )
            }
        })
        if(this.props.Editing){
            cells.push(
            <TableCell>
                <SaveIcon className={classes.icon} onClick={() => this.props.onLeadUpdate(this.state.Data)}/>
                <DeleteIcon className={classes.icon} onClick={() => this.props.onLeadDelete(this.state.Data)}/>
            </TableCell>)
        }else if(this.props.isGrouped){
            cells.push(
                <TableCell>
                        <EditIcon className={classes.disabledIcon} />
                        <DeleteIcon className={classes.disabledIcon} />
                </TableCell>)
        }else{
            cells.push(
            <TableCell>
                    <EditIcon className={classes.icon} onClick={() => this.props.onRowClick(this.state.Data)}/>
                    <DeleteIcon className={classes.icon} onClick={() => this.props.onLeadDelete(this.state.Data)}/>
            </TableCell>)
        }
        
        return (
            <TableRow key={data.LeadID} className={classes.sub} elevation={0}>
                {cells}
            </TableRow>
        )
    }
}

export default withStyles(styles)(Row)
