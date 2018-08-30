import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addLead, getProperties} from '../actions/index';
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
    constructor(props, context) {
        super(props, context);

        this.state = {lead: {}};

        for(var property in props.lead){
            if(props.lead.hasOwnProperty(property)){
                this.state.lead[property] = '';
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
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

    onKeyDown(e){
        if(e.keyCode === 13){
            var newLead = Object.assign({}, this.state.lead);
            this.props.addLead(newLead);
        }
    }

    renderProperties(){
        var props = [];
        for(var property in this.props.properties){
            if(this.props.properties[property].Name != 'LeadID' && this.props.properties[property].Name != 'Lead_ExtraField')
                props.push(this.props.properties[property].Name);
        }
        const elements = props.map((p, i) => {
            return(
                <div key={i} className='properties'>
                    <TextField name={p} id={p} label={p} margin="normal" onChange={this.onChange}/>
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
    lead: state.Leads[0],
    properties: state.Properties
})

export default connect(mapStateToProps, {addLead,getProperties})(withStyles(styles)(LeadForm))
