import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Prompt } from 'react-router-dom'
import { connect } from 'react-redux'

import Staffs from '../staffs/Staffs'
import Roles from '../roles/Roles'

class Content extends Component {
    render() {
        const { classes } = this.props
        return (
            <main className={classes.content}>
                <Route path='/dash/staffs' component={Staffs} />
                <Route path='/dash/roles' component={Roles} />
            </main>
        );
    }
}

export default withRouter(Content);