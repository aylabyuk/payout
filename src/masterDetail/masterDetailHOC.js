import React from 'react';  
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 0,
    },
});
  

export function masterDetailComp(Master, Detail) {

  class MasterDetailComponent extends React.Component {
    render() {
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item sm={4} xs={12}>
                        <div className={classes.paper}>
                            <Master />
                        </div>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <div className={classes.paper}>
                            <Detail />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )

    }
  }

  return withStyles(styles)(MasterDetailComponent)
}