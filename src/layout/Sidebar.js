import React from 'react';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default ({ classes, theme, open, handleDrawer }) => {
    const drawer = (
        <div>
            <div className={classes.drawerHeader} />
            <Divider />
            <List>test</List>
        </div>
    );

    return (
        <div>
            <Hidden mdUp>
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
            <Hidden smDown implementation="css">
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
    