import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'


class EditButton extends React.Component {

    handleClick() {
        
    }

    render() {
        return (
        <IconButton color="inherit" onClick={this.handleClick}>
            <EditIcon />
        </IconButton>
        );
    }
}

export default EditButton