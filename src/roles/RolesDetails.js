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

class RolesDetails extends Component {
    render() {
        const { data: roles, onMobile, isEditMode } = this.props

        return(
            roles.map((role) => {
                return <Route key={role.id} path={`/dash/roles/${role.name}`} render={() => 
                    isEditMode ? <RoleEditInfo role={role} onMobile={onMobile}/> : 
                        <RoleInfo role={role} onMobile={onMobile}/> } 
                />
            })
        ) 
    }
}

const mapstatetoprops = (state) => {
    return {
        isEditMode: state.roles.isEditMode,
        role: state.roles.roleInView
    }
}

export default connect(mapstatetoprops, actions)(RolesDetails)