import React, { Component } from 'react';
import { masterDetailComp } from '../masterDetail/masterDetailHOC'
import StaffsMaster from './StaffsMaster'
import StaffsDetails from './StaffsDetails'
import StaffsDetailsMobile from './StaffsDetailsMobile'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const STAFF_QUERY = gql`
    query {
        people {
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

class Staffs extends Component {
    render() {

        const CombinedComponents = masterDetailComp(StaffsMaster, StaffsDetails, StaffsDetailsMobile, this.props.staffs.people)

        return <CombinedComponents />
    }
}

const withData = graphql(STAFF_QUERY, { name: 'staffs' })(Staffs);

export default withData