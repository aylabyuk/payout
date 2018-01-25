import React from 'react'
import TextField from 'material-ui/TextField'
import gql from 'graphql-tag'

export const renderTextField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
    endAdornment,
    startAdornment,
    custom,
    fullWidth
}) => (
    <TextField 
        margin='normal'
        fullWidth={fullWidth}
        label={label}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        InputProps={{ style: {fontSize: 20}, endAdornment, startAdornment } }
        error={touched && error ? true : false}
        helperText={touched && error ? error : ''}
        {...input}
        {...custom}/>
)

export async function executeMutation(data, mutate) {
    await mutate({
        variables: {
            name: data.name, 
            description: data.description,
            ratePerHour: data.ratePerHour
        }
    }).then((d) => {
        console.log(d)
    }).catch((msg) => {
        alert(msg)
    })

    return true
}

export const createRoleMutation = gql`
    mutation createRole($name: String!, $description: String!, $ratePerHour: Int!) {
        createRole(name: $name, description: $description, ratePerHour: $ratePerHour) {
            id
            name
            description
            ratePerHour
        }
    }
`

export const validateForm = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Name required'
    }
  
    if (!values.description) {
      errors.description = 'Description required'
    }

    if (!values.ratePerHour) {
        errors.ratePerHour = 'Required'
    } else if(values.ratePerHour < 100) {
        errors.ratePerHour = 'rate per hour must at least greater than or equal to 100'
    }
  
    return errors
}