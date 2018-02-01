import React from 'react';  
import { Redirect } from 'react-router-dom'
// import axios from 'axios'

//graphql
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo'


// import moment from 'moment';

// query for the logged in user
const preloadQuery = gql`query {
    roles {
        id
        name
        description
        ratePerHour
    }

    people(orderBy: firstName_ASC) {
        id
        firstName
        lastName
        gender
        birthDate
        address
        phoneNumber
        email
        picture {
            id
            large
            medium
            thumbnail
        }
        role {
            id
            name
        }
    }
}`;

class Preloader extends React.Component {

    // componentDidMount() {

    //     const roles = [
    //         {
    //           id: "cjcsm3oxjd1kf0113sw0e5n01"
    //         },
    //         {
    //           id: "cjcsm68m9d3h00113yrsdjs8p"
    //         },
    //         {
    //           id: "cjcsm9vepd70h0113xhpt8l4w"
    //         },
    //         {
    //           id: "cjcudoqsy80hv0189grqbyd0n"
    //         },
    //         {
    //           id: "cjcueqgbg9f4f0189dtxxbq5q"
    //         },
    //         {
    //           id: "cjcueuc3x9hwg0189w5y24gdx"
    //         },
    //         {
    //           id: "cjcuf2xn29nrd0189y1z60vdl"
    //         },
    //         {
    //           id: "cjcuhrqwhc6hz01890reik4yh"
    //         },
    //         {
    //           id: "cjcwv8jurl2fm018959wzzsw7"
    //         },
    //         {
    //           id: "cjcwvb29nl4ge0189olj60d97"
    //         }
    //       ]

    //     axios.get('https://randomuser.me/api/?results=2')
    //         .then((res) => {
    //             const { results } = res.data

    //             results.map(async (r) => {
    //                 const user = {
    //                     firstName: r.name.first,
    //                     lastName: r.name.last,
    //                     gender: r.gender.toUpperCase(),
    //                     birthdate: moment(r.dob).format(),
    //                     address: `${r.location.street}, ${r.location.state}, ${r.location.city}`,
    //                     phoneNumber: r.cell,
    //                     email: r.email,
    //                     picLarge: r.picture.large,
    //                     picMedium: r.picture.medium,
    //                     picThumbnail: r.picture.thumbnail,
    //                     roleId: roles[Math.floor(Math.random() * roles.length)].id
    //                 }

    //                 console.log(user)

    //                 const CREATE_PERSON_MUTATION = gql`
    //                     mutation CreatePersonMutation(
    //                             $firstName: String!
    //                             $lastName: String!
    //                             $gender: Gender!
    //                             $birthdate: DateTime! 
    //                             $address: String!
    //                             $phoneNumber: String
    //                             $email: String
    //                             $roleId: ID!
    //                             $picLarge: String
    //                             $picMedium: String
    //                             $picThumbnail: String
    //                         ) {
    //                             createPerson(
    //                                 firstName: $firstName
    //                                 lastName: $lastName
    //                                 gender: $gender
    //                                 birthdate: $birthdate
    //                                 address: $address
    //                                 phoneNumber: $phoneNumber
    //                                 email: $email
    //                                 roleId: $roleId
    //                                 picLarge: $picLarge
    //                                 picMedium: $picMedium
    //                                 picThumbnail: $picThumbnail
    //                             ) {
    //                                 id
    //                             }
    //                         }
    //                 `

    //                 await this.props.client.mutate({
    //                     mutation: CREATE_PERSON_MUTATION,
    //                     variables: user
    //                 })

    //             })

    //             // console.log(res)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

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

export default graphql(preloadQuery, { name: 'preloadedData' })(withApollo(Preloader))