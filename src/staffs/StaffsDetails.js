import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// import StaffUpdate from './StaffUpdate' 
// import StaffEditInfo from './StaffEditInfo'
import { connect } from 'react-redux'
import * as actions from './staffsActions' 

class StaffInfo extends Component {
    render() {
        const { staff, onMobile } = this.props

        if(!staff) {
            return <div />
        }

        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <Typography style={{ flex: '2 1 auto' }} type='display1'>{staff.firstName}</Typography>
                    {/* {!onMobile && <StaffUpdate style={{ alignSelf: 'flex-end' }}/>} */}
                </div>
                <Divider />
                <br />
                <Typography paragraph align='justify' type='subheading'>{staff.lastName}</Typography>
                <Divider />
            </div>
        );
    }
}

StaffInfo = connect( (state) => {
    return { 
        staff: state.staffs.staffInView,
    }
}, actions)(StaffInfo)


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