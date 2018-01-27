import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import * as actions from './rolesActions'
import { history } from '../app/routes'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { updateRoleMutation } from './rolesUtil'
import { setIsSendingRequest } from '../layout/layoutActions'

class EditButton extends Component {

    handleEdit = () => {
        history.push(this.props.location.pathname + '/edit')
    }

    handleSave = () => {
        const { form, updateRole, setIsSendingRequest } = this.props
        const { values } = form.updateRole

        setIsSendingRequest(true)

        updateRole({
            variables: {
                id: values.id,
                name: values.name, 
                description: values.description,
                ratePerHour: values.ratePerHour
            },
        }).then((d) => {
            setIsSendingRequest(false)
            history.push(`/dash/roles/${values.name}`)
        }).catch((msg) => {
            alert(msg)
            setIsSendingRequest(false)
        })
    }

    render() {
        const { location } = this.props
        const editing = location.pathname.substr(location.pathname.lastIndexOf('/') + 1 ) === 'edit'

        return (
            <div>
                {editing ? 
                    <Button raised color='secondary' onClick={this.handleSave}>
                        Save
                    </Button>
                    : <IconButton color="inherit" onClick={this.handleEdit}>
                        <EditIcon />
                    </IconButton>
                }
            </div>
        );
    }
}

const mapstatetoprops = (state) => {
    return {
        form: state.form
    }
}

const comp = connect(mapstatetoprops, { setIsSendingRequest })(withRouter(EditButton))
export default graphql(updateRoleMutation, { name: 'updateRole' })(comp)