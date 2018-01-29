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
import * as actions from './staffsActions'
import { history } from '../app/routes'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class StaffsDetailsMobile extends React.Component {

  handleClose = () => {
    const { setStaffInView, setDetailsMobile } = this.props
    setDetailsMobile(false)
    setStaffInView(null)
  };

  transition = (props) => {
    const { setStaffInView } = this.props
    return <Slide direction="left" {...props} onExited={() => {
      history.push(`/dash/staffs`)
      setStaffInView(null)
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
                Staff Details
              </Typography>
            </Toolbar>
          </AppBar>
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

StaffsDetailsMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const maspstatetoprops = (state) => {
  return {
    open: state.staffs.isDetailsMobileOpen
  }
} 

const comp = withStyles(styles)(StaffsDetailsMobile);
export default connect(maspstatetoprops, actions)(comp)
