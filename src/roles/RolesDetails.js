import React, { Component } from 'react';

class RolesDetails extends Component {
    render() {
        const { roles } = this.props

        return (
            <div>
                {roles[0].name}
            </div>
        );
    }
}

export default RolesDetails;