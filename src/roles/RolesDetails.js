import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

class RoleInfo extends Component {
    render() {
        const { role } = this.props
        return (
            <div>
                <Typography type='display1'>{role.name}</Typography>
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
        const { roles } = this.props

        return(
            roles.map((role) => {
                return <Route key={role.id} path={`/dash/roles/${role.name}`} render={() => <RoleInfo role={role}/>} />
            })
        ) 
    }
}

export default RolesDetails;