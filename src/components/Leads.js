import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lead from './Lead';
import {getLeads,getProperties} from '../actions/index';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 'fit-content',
        margin: '1em',
    },
    sub: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 'fit-content',
    },    
})

class Leads extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        this.props.getProperties();
        this.props.getLeads();
    }

    render(){
        const classes = this.props.classes;
        if(this.props.Leads != undefined){
            
            const leads = this.props.Leads.map((lead, i) => {
                return (
                    <Paper key={i} className={classes.sub} elevation={0}>
                        <Lead 
                            lead={lead}
                        />
                    </Paper>
                )
            })

            return(
                <Paper className={classes.root}>
                    <Typography variant="headline">
                        Leads
                    </Typography>
                    {leads}
                </Paper>
            )

        }else{

            return(
                <Paper className='container'>
                    got none
                </Paper>
            )
            
        }
    }
}
const mapStateToProps = state => ({
    Leads: state.Leads
})
export default connect(mapStateToProps, {getLeads,getProperties})(withStyles(styles)(Leads))
