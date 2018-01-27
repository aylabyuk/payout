import React from 'react'
import RoleUpdate from './RoleUpdate'
import { renderTextField, validateForm } from './rolesUtil'
import { Field, reduxForm } from 'redux-form'
import { InputAdornment } from 'material-ui/Input'
import { connect } from 'react-redux'
import { Prompt } from 'react-router-dom'

class RoleEditInfo extends React.Component {

    render() {
        const { onMobile, dirty } = this.props
        return (
            <form style={{ padding: '30px' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '2 1 auto' }}/>
                    {!onMobile && <RoleUpdate style={{ alignSelf: 'flex-end' }}/>}
                </div>
                <Field name='name' label='Name' component={renderTextField} fullWidth={true}/>
                <Field name='description' label='Description' component={renderTextField} custom={{
                    multiline: true,
                    rowsMax: 10,
                    rows: 5
                    }} fullWidth={true}/>
                <Field name='ratePerHour' label='Rate (hourly)' component={renderTextField} custom={{
                    type: 'number'
                    }} startAdornment={ <InputAdornment position="start">₱</InputAdornment> } fullWidth={false}/>
                <Prompt
                    message='Any unsaved changes will be lost. Continue?'
                    when={dirty} 
                />
            </form>
        )
    }
}

const withForm = reduxForm({
    form: 'updateRole',
    validate: validateForm,
    enableReinitialize: true
    // destroyOnUnmount: false
})(RoleEditInfo)

const withData = connect(
    state => ({
        initialValues: state.roles.roleInView
    })
)(withForm)

export default withData