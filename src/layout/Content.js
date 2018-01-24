import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

class Content extends Component {
    render() {
        const { classes } = this.props
        return (
            <main className={classes.content}>
                <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
            </main>
        );
    }
}

export default Content;