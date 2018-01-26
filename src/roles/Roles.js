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
        this.props.data.subscribeToMore({
            document: ROLES_CHANGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) {
                    return prev
                }

                return 0
            }
        })
    }

    render() {

        console.log(this.props)

        const CombinedComponents = masterDetailComp(RolesMaster, RolesDetails, RolesDetailsMobile, this.props.data.roles)

        return <CombinedComponents />
    }
}

const withData = graphql(ROLE_QUERY)(Roles)

export default withData;