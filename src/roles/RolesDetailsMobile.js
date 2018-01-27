import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import Slide from 'material-ui/transitions/Slide'
import { connect } from 'react-redux'
import * as actions from './rolesActions'
import EditButton from './RoleUpdate'
import { history } from '../app/routes'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class RolesDetailsMobile extends React.Component {

  handleClose = () => {
    const { setRoleInView, setDetailsMobile } = this.props
    setDetailsMobile(false)
    setRoleInView(null)
  };

  transition = (props) => {
    const { setRoleInView } = this.props
    return <Slide direction="left" {...props} onExited={() => {
      history.push(`/dash/roles`)
      setRoleInView(null)
    }} />;
  }

  render() {
    const { classes, open } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          transition={this.transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <ChevronLeftIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Role Details
              </Typography>
              <EditButton />
            </Toolbar>
          </AppBar>
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

RolesDetailsMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const maspstatetoprops = (state) => {
  return {
    open: state.roles.isDetailsMobileOpen
  }
} 

const comp = withStyles(styles)(RolesDetailsMobile);
export default connect(maspstatetoprops, actions)(comp)
