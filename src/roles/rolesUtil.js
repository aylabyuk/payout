import React from 'react'
import TextField from 'material-ui/TextField'

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