import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  },
});

class RolesMaster extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <List>
                    <ListItem button>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                        <ListItemText primary="Photos" secondary="Jan 9, 2016" />
                    </ListItem>
                    <ListItem button>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                        <ListItemText primary="Work" secondary="Jan 7, 2016" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(RolesMaster);