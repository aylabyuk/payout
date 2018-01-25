import React from 'react'
import { TextField } from 'material-ui'
import gql from 'graphql-tag';
// import { history } from '../app/routes'

export const renderTextField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
    endAdornment,
    ...custom
}) => (
    <TextField 
        margin='dense'
        fullWidth
        label={label}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        InputProps={{ style: {fontSize: 20}, endAdornment } }
        error={touched && error ? true : false}
        helperText={touched && error ? error : ''}
        {...input}
        {...custom}/>
)

export function setLocalStorageTokens(token) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("token", token)
    } else {
        window.alert('localstorage not supported, you cant login using this device.')
        // Sorry! No Web Storage support..
    }
}

export function tryLogin(data, mutate) {
    mutate({
        variables: {
            email: data.email, 
            password: data.password
        }
    }).then((d) => {
        // successfully logged in
        setLocalStorageTokens(d.data.login.token)
        // history.push('/dash/staffs')
        window.location.reload();
    }).catch((msg) => {
        console.log(msg)
        alert('Login Failed ' + msg)
    })
}

export const loginQuery = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`