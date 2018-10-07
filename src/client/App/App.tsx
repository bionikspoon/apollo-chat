import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as Loadable from 'react-loadable'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import FullPageLoading from '../FullPageLoading'
import { client } from '../setupApollo'

const AsyncHome = Loadable({
  loader: () => import('../pages/Home'),
  loading: FullPageLoading,
})

const AsyncChat = Loadable({
  loader: () => import('../pages/Chat'),
  loading: FullPageLoading,
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={AsyncHome} />
          <Route path="/chat" component={AsyncChat} />
          {process.env.NODE_ENV !== 'production' ? (
            <Route path="/loading" component={FullPageLoading} />
          ) : null}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}
