import React from 'react';  
import { Redirect } from 'react-router-dom'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

// query for the logged in user
const preloadQuery = gql`query {
    roles {
        id
        name
        description
        ratePerHour
    }

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
}`;

class Preloader extends React.Component {
    render() {
        if(this.props.preloadedData.loading) {
            return(
                <div className="loaderContainer">
                    <div className="loader">
                        <div className="one"></div>
                        <div className="two"></div>
                    </div>
                </div>
            )
        } else {
            return(<Redirect to='/dash/staffs' />)
        }

    }
}

export default graphql(preloadQuery, { name: 'preloadedData' })(Preloader)