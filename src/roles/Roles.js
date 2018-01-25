import React from 'react'
import { masterDetailComp } from '../masterDetail/masterDetailHOC'
import RolesMaster from './RolesMaster'
import RolesDetails from './RolesDetails'

import gql from 'graphql-tag'
import { client } from '../index'

class Roles extends React.Component {
    constructor() {
        super()
        this.state = {
            roles: client.readQuery({
                query: gql`
                    {
                        roles {
                            id
                            name
                            description
                            ratePerHour
                        }
                    }`
            }).roles,
        }
    }

    render() {
        const CombinedComponents = masterDetailComp(RolesMaster, RolesDetails, this.state.roles)

        return <CombinedComponents />
    }
}

export default Roles;