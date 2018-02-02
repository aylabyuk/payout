import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { renderDatePicker, renderTimePicker } from './staffsUtil'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import moment from 'moment'

class StaffEncodeDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, staff, timeEnd, timeStart } = this.props;

    let start = moment(timeStart, 'HH:mm')
    let end = moment(timeEnd, 'HH:mm')
    let duration = moment.duration(end.diff(start));
    let hours = parseFloat(duration.asHours()).toFixed(2)
    let totalPay = parseFloat(staff.role.ratePerHour * hours).toFixed(2)

    return (
      <div>
        <Button color='primary' onClick={this.handleClickOpen}>encode</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{`add day of work for ${staff.firstName} ${staff.lastName}`}</DialogTitle>
          <DialogContent>
            <Field name='date' label='date' component={renderDatePicker} />
            <br />
            <Field name='timeStart' label='time started' component={renderTimePicker} />
            <Field name='timeEnd' label='time ended' component={renderTimePicker} />
            <br />
            <br />
            <Typography type='body1'>{`rate per hour is ₱${staff.role.ratePerHour}`}</Typography>
            { totalPay > 0 && <div>
              <Typography type='body1'>{`total hours rendered is ${hours}`}</Typography>
              <Typography type='body2'>{`total pay is ₱${totalPay}`}</Typography>
            </div>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

StaffEncodeDialog = reduxForm({
  form: 'staffEncode',
  // validate: validateForm,
})(StaffEncodeDialog)

// StaffEncodeDialog.propTypes = {
//   fullScreen: PropTypes.bool.isRequired,
// };

const selector = formValueSelector('staffEncode')
StaffEncodeDialog = connect(state => {
  const timeStart = selector(state, 'timeStart')
  const timeEnd = selector(state, 'timeEnd')
  return {
    timeStart,
    timeEnd
  }
})(StaffEncodeDialog)

export default withMobileDialog()(StaffEncodeDialog)