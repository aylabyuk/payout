import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import { connect } from 'react-redux'
import * as actions from './layoutActions'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 56px)',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
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
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100vh - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class Layout extends React.Component {

    handleDrawerToggle = () => {
        this.props.toggleSideBar()
    };

    render() {
        const { classes, theme, isSideBarOpen } = this.props;

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
		isSideBarOpen: state.layout.isSideBarOpen
	}
}

const component = withStyles(styles, { withTheme: true })(Layout);
const connectedComponent = connect(mapStateToProps, actions)(component)

export default connectedComponent