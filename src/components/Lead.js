import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 'fit-content',
    },  
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    left: {
        display: 'inline-flex',
        marginRight: '1em'
    },
    right: {
        display: 'inline-flex',
        float: 'right'
    },
  });

class Lead extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.onChange = this.onChange.bind(this);
        this.renderProperties = this.renderProperties.bind(this);
    }

    onChange(e){
      e.preventDefault;
      this.setState({[e.target.name]: e.target.value});
    }

    renderProperties(lead){
        const classes = this.props.classes;
        var props = [];
        for(var property in lead){
            if(lead.hasOwnProperty(property)){
                props.push(property);
            }
        }

        var curState = this.state.lead;

        const elements = props.map((p, i) => {
            return(
                <div key={i} className='property'>
                    <Typography className={classes.left} variant="body2" align="left">
                        {p}
                    </Typography>
                    <Typography className={classes.right} variant="body1" align="right">
                        {curState[p]}
                    </Typography>
                </div>
            )
        })

        return elements;
    }
    
    render(){
        const properties = this.renderProperties(this.props.lead)
        const classes = this.props.classes;
        return (
            <Paper className={classes.root}>
                {properties}
            </Paper>
        )
    }
}

export default withStyles(styles)(Lead)
