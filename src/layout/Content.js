import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Typography from 'material-ui/Typography';

import Employees from '../employees/Employees'
import Positions from '../positions/Positions'

class Content extends Component {
    render() {
        const { classes } = this.props
        return (
            <main className={classes.content}>
                <Route path='/employees' component={Employees} />
                <Route path='/positions' component={Positions} />

                <Typography noWrap>{'This text is rendered from the main Content component'}</Typography>
            </main>
        );
    }
}

export default Content;