import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validateSignup } from './authValidator'
import { renderTextField, tryLogin, loginQuery } from './authUtil'
import { compose } from 'react-apollo'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from 'material-ui'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withMobileDialog from 'material-ui/Dialog/withMobileDialog';

class SignUp extends Component {

    handleRegistration(data) {
        const { signup, login } = this.props

        signup({
            variables: {
                email: data.email, 
                password: data.password
            }
        }).then((d) => {
            tryLogin(data, login)
        }).catch((msg) => {
            console.log(msg)
            window.alert(msg.graphQLErrors[0].message)
        })
    }

    render() {
        const { fullScreen, open, handleSubmit } = this.props;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                fullScreen={fullScreen}
                aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">signup</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Note: This will only create an account with a GUEST access level. To change your account's access level please 
                        inform the site's administrator or send an email to oriel.absin@gmail.com.
                    </DialogContentText>
                    <Field name='email' label='email' placeholder='myemail123@gmail.com' component={renderTextField}/>
                    <Field name='password' label='Password' placeholder='********'  type='password' component={renderTextField}/>
                    <Field name='password2' label='Confirm Password' placeholder='********'  type='password' component={renderTextField}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(data => this.handleRegistration(data))} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const signup = gql`
    mutation signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            token
        }
    }
`

const withForm = reduxForm({
    form: 'signup',
    validate: validateSignup,
    destroyOnUnmount: false
})(withMobileDialog()(SignUp))

const withData = compose(
    graphql(signup, { name: 'signup' }),
    graphql(loginQuery, { name: 'login' }),
)


export default (withData)(withForm)