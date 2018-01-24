import React from 'react';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import NavList from './Navlist'

export default ({ classes, theme, open, handleDrawer }) => {
    const drawer = (
        <div>
            <div className={classes.drawerHeader} />
            <Divider />
            <NavList />
        </div>
    );

    return (
        <div>
            <Hidden lgUp>
                <Drawer
                type="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onClose={handleDrawer}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                >
                {drawer}
                </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
                <Drawer
                type="permanent"
                open
                classes={{
                    paper: classes.drawerPaper,
                }}
                >
                {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
}
    