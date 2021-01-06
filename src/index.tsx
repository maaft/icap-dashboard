import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';

const makeHttpLink = (remote: boolean) => {
  const uri = remote
    ? 'https://www.invictusicap.de/query'
    : 'http://localhost:8080/graphql';
  return new HttpLink({ uri });
};

const makeWsLink = (remote: boolean) =>
  new WebSocketLink({
    uri: remote
      ? `wss://www.invictusicap.de/query`
      : `ws://localhost:8080/graphql`,
    options: {
      lazy: true,
      reconnect: true,
    },
  });

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  console.error(
    '[GraphQL error]: Error on GQL and Operation (see message): ',
    operation
  );
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const makeSplitLink = (remote: boolean) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    makeWsLink(remote),
    makeHttpLink(remote)
  );

const makeClient = (remote: boolean) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: makeHttpLink(remote),
  });

const clientLocal = makeClient(false);
const clientRemote = makeClient(true);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new RetryLink().split(
    (operation) => operation.getContext().Online,
    makeSplitLink(true),
    makeSplitLink(false)
  ),
});

ReactDOM.render(
  <ApolloProvider client={clientRemote}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
