// validation for registration
export const validateSignup = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
      // eslint-disable-next-line
    } else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))) {
        errors.email = 'Invalid email'
    }
  
    if (!values.password) {
      errors.password = 'Required'
    }
  
    if (!values.password2) {
      errors.password2 = 'Required'
    }
  
    if(values.password !== values.password2) {
      errors.password2 = 'passwords not matched'
    }
    return errors
}
  
  // validation for login
export const validateLogin = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    }
  
    if (!values.password) {
      errors.password = 'Required'
    }
  
    return errors
}
