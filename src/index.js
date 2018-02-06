import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  // link: createHttpLink({uri: 'http://localhost:8081/graphql'}),
  link: createHttpLink({uri: 'https://stormy-chamber-42667.herokuapp.com/https://api-entendre.herokuapp.com/graphql'}),
  cache: new InMemoryCache()
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  ), document.getElementById('root'));
registerServiceWorker();
