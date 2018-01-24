import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom'

import PeopleIcon from 'material-ui-icons/People'
import WorkIcon from 'material-ui-icons/Work'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  }
});

class NavList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <List className={classes.root} subheader={<ListSubheader>navigation</ListSubheader>}>
            <ListItem button component={Link} to='/dash/staffs'>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText inset primary="Staffs" />
            </ListItem>
            <ListItem button component={Link} to='/dash/roles'>
            <ListItemIcon>
                <WorkIcon />
            </ListItemIcon>
            <ListItemText inset primary="Roles" />
            </ListItem>
        </List>

    );
  }
}

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavList);