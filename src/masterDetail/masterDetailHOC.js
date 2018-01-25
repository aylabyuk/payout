import React from 'react';  
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 0,
      height: 'calc(100vh - 64px)'
    },
    left: {
      padding: 50,
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      height: '100%'
    }
});
  

export function masterDetailComp(Master, Detail, DetailsMobile, props) {

  class MasterDetailComponent extends React.Component {
    render() {
        const { classes, browser } = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item sm={4} xs={12}>
                        <div className={classes.paper}>
                            <Master roles={props}/>
                        </div>
                    </Grid>
                    { !browser.lessThan.medium && <Grid item sm={8} xs={12}>
                        <div className={classes.left}>
                            <Detail roles={props}/>
                        </div>
                    </Grid>}
                </Grid>

            { browser.lessThan.medium && 
                <DetailsMobile >
                    <div style={{ padding: '14px' }}>
                        <Detail roles={props} />
                    </div>
                </DetailsMobile >
            }

            </div>
        )

    }
  }

  const mapstatetoprops = (state) => {
      return {
          browser: state.browser
      }
  }

  const comp = withStyles(styles)(MasterDetailComponent)
  return connect(mapstatetoprops, null)(comp)
}