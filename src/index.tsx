import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

import './index.css'

import {App} from './App'

const client = new ApolloClient({
    // uri: 'https://flyby-gateway.herokuapp.com/',
    uri: "https://71z1g.sse.codesandbox.io/",
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
