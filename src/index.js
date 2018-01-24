import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Routes } from './app/routes'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

const cache = new InMemoryCache()

persistCache({
    cache,
    storage: window.localStorage
})

export const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:4000' }),
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
