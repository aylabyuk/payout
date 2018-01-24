import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import { List as RVList, AutoSizer } from 'react-virtualized'
import gql from 'graphql-tag'
import { client } from '../index'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1000,
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: 'red'
  },
});

class RolesMaster extends React.Component {
    constructor() {
        super()
        this.state = {
            roles: client.readQuery({
                query: gql`
                    {
                        roles {
                            id
                            name
                            description
                            ratePerHour
                        }
                    }`
            }).roles,
        }
    }

    _noRowsRenderer = () => {
        return <div ></div>;
    }

    _rowRenderer = ({index, isScrolling, key, style }) => {
        const { roles } = this.state
        let role = roles[index]

        return(
            <div key={key} style={style} >
                <ListItem button>
                     <Avatar>
                         <FolderIcon />
                     </Avatar>
                     <ListItemText primary={role.name} secondary="Jan 9, 2016" />
                 </ListItem>
            </div>
        )
    }

    render() {
        const { classes } = this.props
        const { roles } = this.state

        return(
            <div className={classes.root}>
                <AutoSizer>
                    {({width, height}) => (
                        <RVList
                            id='roleList'
                            height={height}
                            width={width}
                            noRowsRenderer={this._noRowsRenderer}
                            rowHeight={75}
                            rowRenderer={this._rowRenderer}
                            rowCount={roles.length}
                        />
                    )}
                </AutoSizer>
            </div>
        )
    }
}

export default withStyles(styles)(RolesMaster);