import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addProperty} from '../actions/index';
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

class PropertyForm extends Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
            Name: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        e.preventDefault;
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(){
        this.props.addProperty(this.state.Name);
    }

    render(){
        const classes = this.props.classes;
        return (
            <div className='container'>
                <Paper className={classes.root}>
                    <Typography variant="headline" component="h3">
                        Add Property
                    </Typography>
                    <TextField name='Name' id='Name' label='Name' margin="normal" onChange={this.onChange}/>
                    <Button variant="contained" className={classes.button} onClick={this.onSubmit}>Save</Button>
                </Paper>
            </div>
        )
    }
}

export default connect(null, {addProperty})(withStyles(styles)(PropertyForm))
