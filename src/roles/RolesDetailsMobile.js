import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import EditIcon from 'material-ui-icons/Edit';
import Slide from 'material-ui/transitions/Slide';
import { connect } from 'react-redux'
import * as actions from './rolesActions'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

class RolesDetailsMobile extends React.Component {

  handleClose = () => {
    this.props.toggleDetailsMobile()
  };

  render() {
    const { classes, open } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <ChevronLeftIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Role Details
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose}>
                <EditIcon />
              </IconButton>
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