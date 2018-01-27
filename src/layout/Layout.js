import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import { connect } from 'react-redux'
import * as actions from './layoutActions'
import Modal from 'material-ui/Modal'
import { CircularProgress } from 'material-ui/Progress'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100vh',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: 0,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
    },
  },
});

class Layout extends React.Component {

    handleDrawerToggle = () => {
        this.props.toggleSideBar()
    };

    render() {
        const { classes, theme, isSideBarOpen, isSendingRequest } = this.props;

        return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
              <Header classes={classes} handleDrawer={this.handleDrawerToggle}/>
              <Sidebar classes={classes} theme={theme} open={isSideBarOpen}  handleDrawer={this.handleDrawerToggle}/>
              <Content classes={classes}/>
            </div>
        </div>
        );
    }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {  
	return {
    isSideBarOpen: state.layout.isSideBarOpen,
	}
}

const component = withStyles(styles, { withTheme: true })(Layout);
const connectedComponent = connect(mapStateToProps, actions)(component)

export default connectedComponent