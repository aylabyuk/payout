import React, { Component } from 'react';
import { masterDetailComp } from '../masterDetail/masterDetailHOC'
import StaffsMaster from './StaffsMaster'
import StaffsDetails from './StaffsDetails'
import StaffsDetailsMobile from './StaffsDetailsMobile'
import { existAlready, removeFromList, updateElement } from '../app/subscriptionUtilies'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const STAFF_QUERY = gql`
    query {
        people(orderBy: firstName_ASC) {
            id
            firstName
            lastName
            gender
            birthDate
            address
            role {
                id
                name
            }
        }
    }
`

const PEOPLE_CHANGES_SUBSCRIPTION = gql`
    subscription staff {
        staffChanges: peopleChanges {
            mutation
            updatedFields
            previousValues {
                id
                firstName
                lastName
                gender
                address
                birthDate
            }
            node {
                id
                firstName
                lastName
                gender
                address
                birthDate
            }
        }
    }
`

class Staffs extends Component {
    componentWillMount() {
        this.props.staffs.subscribeToMore({
            document: PEOPLE_CHANGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                const { data } = subscriptionData
                if(!data) {
                    return prev
                }

                if(data.staffsChanges.mutation === 'CREATED' && !existAlready(prev.staffs ,data.staffsChanges.node.id)) {
                    return {
                        staffs: [...prev.staffs, data.staffsChanges.node ]
                    }
                } else if(data.staffsChanges.mutation === 'DELETED') {
                    return {
                        staffs : removeFromList(prev.staffs, data.staffsChanges.previousValues)
                    }
                } else if(data.staffsChanges.mutation === 'UPDATED') {
                    return {
                        staffs : updateElement(prev.staffs, data.staffsChanges.node)
                    }
                }

            }
        })
    }

    render() {

        const CombinedComponents = masterDetailComp(StaffsMaster, StaffsDetails, StaffsDetailsMobile, this.props.staffs.people)

        return <CombinedComponents />
    }
}

const withData = graphql(STAFF_QUERY, { name: 'staffs' })(Staffs);

export default withData