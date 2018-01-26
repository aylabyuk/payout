import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import * as actions from './rolesActions'

class EditButton extends Component {

    handleClick() {
        this.props.setEditMode(true)
    }

    render() {
        const {isEditMode} = this.props
        return (
            <div>
                {isEditMode ? 
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

const mapstatetoprops = (state) => {
    return {
        isEditMode: state.roles.isEditMode
    }
}

export default connect(mapstatetoprops, actions)(EditButton)