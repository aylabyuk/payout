import React from 'react'
import { masterDetailComp } from '../masterDetail/masterDetailHOC'
import RolesMaster from './RolesMaster'
import RolesDetails from './RolesDetails'
import RolesDetailsMobile from './RolesDetailsMobile'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ROLE_QUERY = gql`
    query {
        roles {
            id
            name
            description
            ratePerHour
        }
    }
`

const ROLES_CHANGES_SUBSCRIPTION = gql`
    subscription {
        rolesChanges {
          mutation
          node {
            id
            name
            description
            ratePerHour
          }
          updatedFields
          previousValues {
            id
            name
            description
            ratePerHour
          }
        }
      }
`

class Roles extends React.Component {
    componentWillMount() {
        this.props.roles.subscribeToMore({
            document: ROLES_CHANGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                const { data } = subscriptionData
                if(!data) {
                    return prev
                }

                function existAlready(id) {
                    return prev.roles.some((el) => {
                        return el.id === id
                    })
                }

                function removeFromList(array, el) {
                    return array.filter(e => e.id !== el.id)
                }

                if(data.rolesChanges.mutation === 'CREATED' && !existAlready(data.rolesChanges.node.id)) {
                    return {
                        roles: [...prev.roles, data.rolesChanges.node ]
                    }
                } else if(data.rolesChanges.mutation === 'DELETED') {
                    return {
                        roles : removeFromList(prev.roles, data.rolesChanges.previousValues)
                    }
                }

            }
        })
    }

    render() {
        const CombinedComponents = masterDetailComp(RolesMaster, RolesDetails, RolesDetailsMobile, this.props.roles.roles)

        return <CombinedComponents />
    }
}

const withData = graphql(ROLE_QUERY, { name: 'roles' })(Roles)

export default withData;