import React from 'react'
import { masterDetailComp } from '../masterDetail/masterDetailHOC'
import RolesMaster from './RolesMaster'
import RolesDetails from './RolesDetails'

class Roles extends React.Component {
    render() {
        const CombinedComponents = masterDetailComp(RolesMaster, RolesDetails)

        return <CombinedComponents />
    }
}

export default Roles;