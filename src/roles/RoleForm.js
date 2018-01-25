import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { connect } from 'react-redux'
import * as actions from './rolesActions'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from './rolesUtil'

class RoleForm extends React.Component {
  handleClose = () => {
    this.props.toggleCreateRole()
  };

  render() {
    const { fullScreen, open } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Create a new role"}</DialogTitle>
          <DialogContent>
            <Field name='name' label='Name' component={renderTextField} fullWidth={true}/>
            <Field name='description' label='Description' component={renderTextField} custom={{
              multiline: true,
              rowsMax: 10,
              rows: 5
            }} fullWidth={true}/>
            <Field name='ratePerHour' label='Rate (hourly)' component={renderTextField} custom={{
              type: 'number'
            }} startAdornment={ <InputAdornment position="start">₱</InputAdornment> } fullWidth={false}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
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

RoleForm.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapstatetoprops = (state) => {
    return {
        open: state.roles.isCreateRoleOpen
    }
}

const withForm = reduxForm({
  form: 'role',
})(withMobileDialog()(RoleForm))

export default connect(mapstatetoprops, actions)(withForm)