import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import { List as RVList, AutoSizer } from 'react-virtualized'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import * as actions from './rolesActions' 
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1000,
    flex: 1,
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.background.paper
  },
});

class RolesMaster extends React.Component {
    _noRowsRenderer = () => {
        return <div ></div>;
    }

    _rowRenderer = ({index, isScrolling, key, style }) => {
        const { roles } = this.props
        let role = roles[index]

        return(
            <div key={key} style={style} >
                <ListItem button component={Link} to={`/dash/roles/${role.name}`}>
                     <Avatar>
                         <FolderIcon />
                     </Avatar>
                     <ListItemText disableTypography primary={role.name} secondary={
                         <Typography noWrap>{role.description}</Typography>
                     }/>
                 </ListItem>
            </div>
        )
    }

    _onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        this.props.setScrollTop(scrollTop)
    }

    render() {
        const { classes, roles, scrollTop } = this.props

        return(
            <div className={classes.root}>
                <AutoSizer>
                    {({width, height}) => (
                        <RVList
                            id='roleList'
                            height={height}
                            width={width}
                            noRowsRenderer={this._noRowsRenderer}
                            rowHeight={500}
                            rowRenderer={this._rowRenderer}
                            rowCount={roles.length}
                            onScroll={this._onScroll}
                            scrollTop={scrollTop}
                        />
                    )}
                </AutoSizer>
            </div>
        )
    }
}

const mapstatetoprops = (state) => {
    return {
        scrollTop: state.roles.scrollTop
    }
}

const comp = withStyles(styles)(RolesMaster);
export default connect(mapstatetoprops, actions)(comp)