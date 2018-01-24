import React from 'react';  

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

// query for the logged in user
export let preloadQuery = gql`query {
    roles {
        id
        name
        description
        ratePerHour
    }
}`;

export function preloadInitialData(Component) {

  class ComponentWithInitialData extends React.Component {
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
            return(<Component {...this.props} />)
        }

    }
  }

  return graphql(preloadQuery, { name: 'preloadedData' })(ComponentWithInitialData)
}