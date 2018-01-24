import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';

export default ({ classes, handleDrawer }) => 
  <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawer}
        className={classes.navIconHide}
      >
        <MenuIcon />
      </IconButton>
      <Typography type="title" color="inherit" noWrap>
        Payout
      </Typography>
    </Toolbar>
  </AppBar>