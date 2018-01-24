import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Typography from 'material-ui/Typography';

import Staffs from '../staffs/Staffs'
import Roles from '../roles/Roles'

class Content extends Component {
    render() {
        const { classes } = this.props
        return (
            <main className={classes.content}>
                <Route path='/staffs' component={Staffs} />
                <Route path='/roles' component={Roles} />

            </main>
        );
    }
}

export default Content;