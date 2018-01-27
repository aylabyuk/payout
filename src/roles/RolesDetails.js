import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import RoleUpdate from './RoleUpdate' 
import RoleEditInfo from './RoleEditInfo'
import { connect } from 'react-redux'
import * as actions from './rolesActions' 

class RoleInfo extends Component {
    render() {
        const { role, onMobile } = this.props

        if(!role) {
            return <div />
        }

        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <Typography style={{ flex: '2 1 auto' }} type='display1'>{role.name}</Typography>
                    {!onMobile && <RoleUpdate style={{ alignSelf: 'flex-end' }}/>}
                </div>
                <Divider />
                <br />
                <Typography paragraph align='justify' type='subheading'>{role.description}</Typography>
                <br/>
                <Typography type='body2'>{`Rate: ₱ ${role.ratePerHour.toFixed(2)} per hour`}</Typography>
                <Divider />
            </div>
        );
    }
}

RoleInfo = connect( (state) => {
    return { 
        role: state.roles.roleInView,
    }
}, actions)(RoleInfo)


class RolesDetails extends Component {
    render() {
        const { data: roles, role, onMobile } = this.props

        return(
            roles.map((r) => {
                return (
                    <div key={r.id}>
                        <Route path={`/dash/roles/${r.name}`} render={() => <RoleInfo onMobile={onMobile}/> } />
                        <Route path={`/dash/roles/${r.name}/edit`} render={() => <RoleEditInfo onMobile={onMobile}/> } />
                    </div>
                )
            })
        ) 
    }
}



export default connect(null, actions)(RolesDetails)