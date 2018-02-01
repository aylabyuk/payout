import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { connect } from 'react-redux'
import * as actions from './staffsActions'
import { Field, reduxForm } from 'redux-form'
import { renderTextField, 
  renderGenderDropDown, 
  renderDatePicker,
  executeMutation, 
  createStaffMutation, 
  normalizePhone,
  validateForm } from './staffsfUtil'
import { graphql } from 'react-apollo'
import RolesAutosuggest from '../roles/RolesAutosuggest';

class StaffForm extends React.Component {
  handleClose = () => {
    this.props.toggleCreateStaff()
  };

  handleFormSubmit = (data, mutation) => {
    executeMutation(data, mutation).then(() => {
      this.handleClose()
      this.props.reset()
    })
  }

  render() {
    const { fullScreen, open, handleSubmit, createStaff } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Create Staff"}</DialogTitle>
          <DialogContent>
            <RolesAutosuggest />
            <Field name='firstName' label='firstname' component={renderTextField} fullWidth={true}/>
            <Field name='lastName' label='lastname' component={renderTextField} fullWidth={true}/>
            <Field name='gender' component={renderGenderDropDown} />
            <Field name='birthdate' component={renderDatePicker}/>
            <Field name='address' label='address' component={renderTextField} fullWidth={true}/>
            <Field name='email' label='email' component={renderTextField} fullWidth={true}/>
            <Field name='phoneNumber' label='phone' component={renderTextField} fullWidth={true} normalize={normalizePhone}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleSubmit(data => this.handleFormSubmit(data, createStaff) )} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

StaffForm.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapstatetoprops = (state) => {
    return {
        open: state.staffs.isCreateStaffOpen
    }
}

const withForm = reduxForm({
  form: 'staff',
  validate: validateForm,
  destroyOnUnmount: false
})(withMobileDialog()(StaffForm))

const comp = connect(mapstatetoprops, actions)(withForm)
export default graphql(createStaffMutation, { name: 'createStaff' })(comp)