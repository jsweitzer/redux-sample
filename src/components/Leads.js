import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lead from './Lead';
import {getLeads,getProperties} from '../actions/index';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {toggleEditing} from '../actions/index';
import LeadForm from'./LeadForm'

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

    constructor(props) {
        super(props);
        this.onLeadClick = this.onLeadClick.bind(this);
    }

    componentWillMount(){
        this.props.getProperties();
        this.props.getLeads();
    }

    onLeadClick(leadId){
        this.props.toggleEditing(leadId);
    }

    render(){
        const classes = this.props.classes;
        if(this.props.Leads != undefined){
            console.log(JSON.stringify(this.props.Leads));
            console.log(JSON.stringify(this.props.Editing));
            const leads = this.props.Leads.map((lead, i) => {
                if(this.props.Editing.includes(lead.LeadID)){
                    console.log('rendering as edit '+JSON.stringify(lead));
                    return (
                    <Paper key={lead.LeadID} className={classes.sub} elevation={0}>
                        <LeadForm lead={lead} isEditing={true}/>
                    </Paper>
                    )
                }
                else{
                    console.log('rendering as read '+JSON.stringify(lead));
                    return (
                        <Paper key={lead.LeadID} onClick={() => {this.onLeadClick(lead.LeadID)}} className={classes.sub} elevation={0}>
                            <Lead 
                                lead={lead}
                            />
                        </Paper>
                    )
                }
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
    Leads: state.Leads,
    Editing: state.Editing
})
export default connect(mapStateToProps, {getLeads,getProperties,toggleEditing})(withStyles(styles)(Leads))
