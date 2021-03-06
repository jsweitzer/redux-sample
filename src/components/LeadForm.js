import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addLead, getProperties,updateLead} from '../actions/index';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 'fit-content',
        margin: '1em',
    },  
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },  
    button: {
        margin: theme.spacing.unit,
    },
  });

class LeadForm extends Component {
    constructor(props) {
        super(props);

        
        var newState = props.lead == undefined ? {lead: {}} : {lead: Object.assign({}, props.lead)};
        this.state = newState;



        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentWillMount(){
        this.props.getProperties();
    }


    onChange(e){
        e.preventDefault;
        var newState = Object.assign({}, this.state);
        newState.lead[e.target.name] = e.target.value;
        this.setState(newState);
    }

    onSubmit(){
        var newLead = Object.assign({}, this.state.entity);
        if(this.props.isEditing){
            newLead.ID = this.props.lead.ID;
            this.props.updateLead(newLead);
        }else{
            this.props.addLead(newLead);
        }
    }

    onKeyDown(e){
        if(e.keyCode === 13){
            var newLead = Object.assign({}, this.state.lead);
            if(this.props.isEditing){
                newLead.ID = this.props.lead.ID;
                this.props.updateLead(newLead);
            }else{
                this.props.addLead(newLead);
            }
        }
    }

    renderProperties(){
        var props = [];
        console.log('STATE'+JSON.stringify(this.state));
        for(var property in this.props.properties){
            if(this.props.properties[property].Name != 'ID' && this.props.properties[property].Name != 'Lead_ExtraField')
                props.push(this.props.properties[property].Name);
        }
        const elements = props.map((p, i) => {
            return(
                <div key={i} className='properties'>
                    <TextField name={p} id={p} label={p} margin="normal" onChange={this.onChange} value={this.state.lead == undefined ? '' : this.state.lead[p]}/>
                </div>
            )
        })
        return elements;
    }

    render(){
        const properties = this.renderProperties()
        const classes = this.props.classes;
        return (
            <Paper className={classes.root} onKeyDown={this.onKeyDown}>
                <Typography variant="headline" component="h3">
                    Add Lead
                </Typography>
                {properties}
                <Button variant="contained" className={classes.button} onClick={this.onSubmit}>Save</Button>
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    leads: state.Leads[0],
    properties: state.Properties,
    Editing: state.Editing
})

export default connect(mapStateToProps, {addLead,getProperties,updateLead})(withStyles(styles)(LeadForm))
