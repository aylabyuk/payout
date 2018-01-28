import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Routes } from './app/routes'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import apolloLogger from 'apollo-link-logger'
import { setContext } from 'apollo-link-context'
import { persistCache } from 'apollo-cache-persist'
import { onError } from 'apollo-link-error'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const GqlServer = '192.168.0.110:4000'

const httpLink = createHttpLink({
    uri: `http://${GqlServer}/`
})

const wsLink = new WebSocketLink({
    uri: `ws://${GqlServer}/`,
    options: {
        reconnect: true
    }
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'Authorization': token ? token : null,
      }
    }
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
)

const link = ApolloLink.from([
    apolloLogger,
    authLink,
    errorLink,
    splitLink
])

const cache = new InMemoryCache()
persistCache({
    cache,
    storage: window.localStorage
})

export const client = new ApolloClient({
    link,
    cache
})

const Provider = () => {
    return(
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    )
}

ReactDOM.render(<Provider />, document.getElementById('root'));
registerServiceWorker();
