import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar';
import { List as RVList, AutoSizer } from 'react-virtualized'
import AddIcon from 'material-ui-icons/Add';
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import * as actions from './rolesActions' 
import { connect } from 'react-redux'
import { history } from '../app/routes'
import { withRouter } from 'react-router-dom'

import RoleForm from './RoleForm'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1000,
    flex: 1,
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    position: 'absolute',
    bottom: '30px',
    right: '30px'
  }
});

class RolesMaster extends React.Component {
    _noRowsRenderer = () => {
        return <div ></div>;
    }


    componentDidMount() {
        const { location, data: roles, setRoleInView } = this.props
        
        const currentLocation = location.pathname.substr(location.pathname.lastIndexOf('/') + 1 )
        const role = roles.filter(r => {
            return r.name === currentLocation
        })
        
        if(role.length !== 0) {
            setRoleInView(role[0])
        }
        
    }

    handleClick = (role) => {
        const {setDetailsMobile } = this.props
        setTimeout(() => {
            history.push(`/dash/roles/${role.name}`)
            setDetailsMobile(true)
            return 0 
        }, 100)
    }

    handleCreate = () => {
        this.props.toggleCreateRole()
    }

    _rowRenderer = ({index, isScrolling, key, style }) => {
        const { data: roles, roleInView, path } = this.props
        let role = roles[index]

        return(
            <div key={key} 
                style={{...style, fontWeight: roleInView && roleInView.id === role.id && path !== '/dash/roles' ? 'bold' : 'normal' }} >
                <ListItem button onClick={() => this.handleClick(role)} >
                     <Avatar>
                         {role.name.substring(0,2).toUpperCase()}
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
        const { classes, data: roles, scrollTop } = this.props

        return(
            <div className={classes.root}>
                <AutoSizer>
                    {({width, height}) => (
                        <RVList
                            id='roleList'
                            height={height}
                            width={width}
                            noRowsRenderer={this._noRowsRenderer}
                            rowHeight={70}
                            rowRenderer={this._rowRenderer}
                            rowCount={roles.length}
                            onScroll={this._onScroll}
                            scrollTop={scrollTop}
                        />
                    )}
                </AutoSizer>
                <Tooltip title='Create Role'>
                    <Button fab color="secondary" aria-label="add" className={classes.fab} onClick={this.handleCreate}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                <RoleForm />
            </div>
        )
    }
}

const mapstatetoprops = (state) => {
    return {
        roleInView: state.roles.roleInView,
        scrollTop: state.roles.scrollTop,
        path: state.router.location.pathname,
        browser: state.browser
    }
}

const comp = withStyles(styles)(RolesMaster);
export default connect(mapstatetoprops, actions)(withRouter(comp))