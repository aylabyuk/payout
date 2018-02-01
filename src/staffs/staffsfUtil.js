import React from 'react'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
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

export const renderGenderDropDown = ({
    input,
    meta: { touched, error },
    custom
}) => (
    <FormControl style={{ marginRight: '20px' }}>
        <InputLabel shrink={true} htmlFor="age-native-simple">gender</InputLabel>
        <Select
            native
            inputProps={{
                id: 'age-native-simple',
            }}
            {...input}
            {...custom}
        >   
            <option value={null}></option>
            <option value={"MALE"}>MALE</option>
            <option value={"FEMALE"}>FEMALE</option>
        </Select>
    </FormControl>
)

export const renderDatePicker = ({
    input,
    meta: { touched, error },
    custom
}) => (
    <TextField
        id="date"
        label="birthdate"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        {...input}
        {...custom}
    />
)

export async function executeMutation(data, mutate) {
    await mutate({
        variables: {
            firstName: data.firstName, 
            lastName: data.lastName,
            gender: data.gender,
            birthdate: data.birthdate,
            address: data.address,
            phoneNumber: data.phoneNumber,
            email: data.email,
            staffId: data.staffId,
            picLarge: data.picLarge,
            picMedium: data.picMedium,
            picThumbnail: data.picThumbnail      
        }
    }).then((d) => {
        console.log(d)
    }).catch((msg) => {
        alert(msg)
    })

    return true
}

export const createStaffMutation = gql`
    mutation createStaff($name: String!, $description: String!, $ratePerHour: Int!) {
        createStaff(name: $name, description: $description, ratePerHour: $ratePerHour) {
            id
            firstName
            lastName
            gender
            birthDate
            address
            phoneNumber
            email
            picture {
                id
                large
                medium
                thumbnail
            }
            staff {
                id
                name
                description
            }
        }
    }
`

export const updateStaffMutation = gql`
    mutation updateStaff($id: ID!, $name: String!, $description: String!, $ratePerHour: Int!) {
        updateStaff(id: $id, name: $name, description: $description, ratePerHour: $ratePerHour) {
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