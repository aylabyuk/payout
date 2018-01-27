import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import * as actions from './rolesActions'
import { history } from '../app/routes'
import { withRouter } from 'react-router-dom'

class EditButton extends Component {

    handleClick() {
        history.push(this.props.location.pathname + '/edit')
    }

    render() {
        const { location } = this.props
        const editing = location.pathname.substr(location.pathname.lastIndexOf('/') + 1 ) === 'edit'

        return (
            <div>
                {editing ? 
                    <Button raised color='secondary'>
                        Save
                    </Button>
                    : <IconButton color="inherit" onClick={this.handleClick.bind(this)}>
                        <EditIcon />
                    </IconButton>
                }
            </div>
        );
    }
}

export default withRouter(EditButton)