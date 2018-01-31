import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// import StaffUpdate from './StaffUpdate' 
// import StaffEditInfo from './StaffEditInfo'
import FaceIcon from 'material-ui-icons/Face'
import Icon from 'material-ui/Icon'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as actions from './staffsActions' 
import { Link } from 'react-router-dom'
import moment from 'moment'

const styles = {
    root: {
        height: '85vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    top: {
        flex: '0 1 auto',
        padding: '20px 0px 20px 0px',
        width: '100%',
        height: '10vh',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        margin: 'auto'
    },
    bottom: {
        flex: '2 1 auto',
        alignSelf: 'stretch',
        padding: '80px 12px'
    },
    avatarContainer: {
        top: '7.5vh',
        width: '100%',
        position: 'absolute',
    },
    bigAvatar: {
        width: 120,
        height: 120,
        margin: 'auto'
    },
    avatarImg: {
        width: 80,
        height: 80,
    }
  };

class StaffInfo extends Component {
    render() {
        const { staff, onMobile, classes } = this.props

        if(!staff) {
            return <div />
        }

        return (
            <div style={{ position: 'relative' }}>
                <div className={classes.root}>
                    <div className={classes.top} />
                    <div className={classes.bottom}>
                        <Typography type='display2'>{`${staff.firstName} ${staff.lastName}`}</Typography>
                        <Typography type='display1'>{staff.role.name}</Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon color='secondary' style={{ fontSize: 30 }}>fingerprint</Icon>
                            <Typography type='headline'>{ staff.gender + ' • ' + moment().diff(staff.birthDate, 'years')}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon color='secondary' style={{ fontSize: 30 }}>place</Icon>
                            <Typography type='headline'>{staff.address}</Typography>
                        </div>

                    </div>
                </div>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.bigAvatar}>
                        <FaceIcon className={classes.avatarImg}/>
                    </Avatar>
                </div>
            </div>
        );
    }
}

StaffInfo = connect( (state) => {
    return { 
        staff: state.staffs.staffInView,
    }
}, actions)(withStyles(styles)(StaffInfo))


class StaffsDetails extends Component {
    render() {
        const { data: staffs, onMobile } = this.props

        return(
            staffs.map((r) => {
                return (
                    <div key={r.id}>
                        <Route exact path={`/dash/staffs/${r.id}`} render={() => <StaffInfo onMobile={onMobile}/> } />
                        {/* <Route path={`/dash/staffs/${r.id}/edit`} render={() => <StaffEditInfo onMobile={onMobile}/> } /> */}
                    </div>
                )
            })
        ) 
    }
}



export default connect(null, actions)(StaffsDetails)