import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar';
import { List as RVList, AutoSizer } from 'react-virtualized'
import AddIcon from 'material-ui-icons/Add';
import PersonIcon from 'material-ui-icons/Person'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import * as actions from '../staffs/staffsActions' 
import { connect } from 'react-redux'
import { history } from '../app/routes'
import { withRouter } from 'react-router-dom'

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

class StaffsMaster extends React.Component {
    _noRowsRenderer = () => {
        return <div ></div>;
    }


    componentDidMount() {
        const { location, data: staffs, setStaffInView } = this.props
        
        const currentLocation = location.pathname.substr(location.pathname.lastIndexOf('/') + 1 )
        const staff = staffs.filter(r => {
            return r.id === currentLocation
        })
        
        if(staff.length !== 0) {
            setStaffInView(staff[0])
        }
        
    }

    handleClick = (staff) => {
        const {setDetailsMobile } = this.props
        setTimeout(() => {
            history.push(`/dash/staffs/${staff.id}`)
            setDetailsMobile(true)
            return 0 
        }, 100)
    }

    handleCreate = () => {
        // this.props.toggleCreateStaff()
    }

    _rowRenderer = ({index, isScrolling, key, style }) => {
        const { data: staffs, staffInView, path } = this.props
        let staff = staffs[index]

        return(
            <div key={key} 
                style={{...style, fontWeight: staffInView && staffInView.id === staff.id && path !== '/dash/staffs' ? 'bold' : 'normal' }} >
                <ListItem button onClick={() => this.handleClick(staff)} >
                     <Avatar>
                        <PersonIcon />
                     </Avatar>
                     <ListItemText disableTypography primary={`${staff.firstName} ${staff.lastName}`} secondary={
                         <Typography noWrap>{staff.role.name}</Typography>
                     }/>
                 </ListItem>
            </div>
        )
    }

    _onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        this.props.setScrollTop(scrollTop)
    }

    render() {
        const { classes, data: staffs, scrollTop } = this.props

        return(
            <div className={classes.root}>
                <AutoSizer>
                    {({width, height}) => (
                        <RVList
                            id='staffList'
                            height={height}
                            width={width}
                            noRowsRenderer={this._noRowsRenderer}
                            rowHeight={70}
                            rowRenderer={this._rowRenderer}
                            rowCount={staffs.length}
                            onScroll={this._onScroll}
                            scrollTop={scrollTop}
                        />
                    )}
                </AutoSizer>
                <Tooltip title='Create Staff'>
                    <Button fab color="secondary" aria-label="add" className={classes.fab} onClick={this.handleCreate}>
                        <AddIcon />
                    </Button>
                </Tooltip>
            </div>
        )
    }
}

const mapstatetoprops = (state) => {
    return {
        staffInView: state.staffs.staffInView,
        scrollTop: state.staffs.scrollTop,
        path: state.router.location.pathname,
        browser: state.browser
    }
}

const comp = withStyles(styles)(StaffsMaster);
export default connect(mapstatetoprops, actions)(withRouter(comp))