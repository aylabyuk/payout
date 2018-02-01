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
            error={touched && error ? true : false}
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
        error={touched && error ? true : false}
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
    mutation createStaff(
        $firstName: String!
        $lastName: String!
        $gender: Gender!
        $birthdate: DateTime! 
        $address: String!
        $phoneNumber: String
        $email: String
        $roleId: ID!
        $picLarge: String
        $picMedium: String
        $picThumbnail: String) {
        createPerson(
            firstName: $firstName
            lastName: $lastName
            gender: $gender
            birthdate: $birthdate
            address: $address
            phoneNumber: $phoneNumber
            email: $email
            roleId: $roleId
            picLarge: $picLarge
            picMedium: $picMedium
            picThumbnail: $picThumbnail
        ) {
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
    if (!values.firstName) {
      errors.firstName = 'this field is required'
    }
    
    if (!values.lastName) {
        errors.lastName = 'this field is required'
    }

    if (!values.gender) {
        errors.gender = 'this field is required'
    }
    
    if (!values.address) {
        errors.address = 'this field is required'
    }

    if (!values.email) {
        errors.email = 'this field is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'this field is required'
    }
  
    return errors
}

export const normalizePhone = value => {
    if (!value) {
      return value
    }
  
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
      return onlyNums
    }
    if (onlyNums.length <= 7) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
      6,
      10
    )}`
  }