import React, { Component } from 'react';

class UserConfirmation extends Component {
    render() {
        const { message, onConfirm, onCancel } = this.props
        return (
            <div id="open-modal" class="modal-window">
                <div>
                    <a title="Close" class="modal-close">Close</a>
                    <h1>User Confirmation</h1>
                    <div>{message}</div>
                </div>
            </div>
        );
    }
}

export default UserConfirmation;