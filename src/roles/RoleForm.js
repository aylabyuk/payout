import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { connect } from 'react-redux'
import * as actions from './rolesActions'

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
            <TextField 
              id="name"
              label="Name"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin='normal'
            />
            <TextField 
              id="description"
              label="Description"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              rowsMax={10}
              rows={5}
              margin='normal'
            />
            <TextField
              id="ratePerHour"
              label="Rate (hourly)"
              // value={this.state.age}
              // onChange={this.handleChange('age')}
              type="number"
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
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

const comp = withMobileDialog()(RoleForm);
export default connect(mapstatetoprops, actions)(comp)