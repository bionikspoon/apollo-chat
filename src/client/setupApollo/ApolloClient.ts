// copied from https://github.com/apollographql/apollo-link/blob/master/packages/apollo-link/src/link.ts

export * from 'apollo-client'
export * from 'apollo-link'
export * from 'apollo-cache-inmemory'

import { ApolloLink, Observable, Operation, split } from 'apollo-link'
import { ErrorLink, onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { ClientStateConfig, withClientState } from 'apollo-link-state'
import { WebSocketLink } from 'apollo-link-ws'

import { ApolloCache } from 'apollo-cache'
import { CacheResolverMap, InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

import { getMainDefinition } from 'apollo-utilities'

interface IPresetConfig {
  request?: (operation: Operation) => Promise<void>
  uri?: string
  credentials?: string
  headers?: any
  fetch?: GlobalFetch['fetch']
  fetchOptions?: HttpLink.Options
  clientState?: ClientStateConfig
  onError?: ErrorLink.ErrorHandler
  cacheRedirects?: CacheResolverMap
  cache?: ApolloCache<any>
}

// Yes, these are the exact same as the `IPresetConfig` interface. We're
// defining these again so they can be used to verify that valid config
// options are being used in the `DefaultClient` constructor, for clients
// that aren't using Typescript. This duplication is unfortunate, and at
// some point can likely be adjusted so these items are inferred from
// the `IPresetConfig` interface using a Typescript transform at compilation
// time. Unfortunately, TS transforms with rollup don't appear to be quite
// working properly, so this will have to be re-visited at some point.
// For now, when updating the properties of the `IPresetConfig` interface,
// please also update this constant.
const PRESET_CONFIG_KEYS = [
  'request',
  'uri',
  'credentials',
  'headers',
  'fetch',
  'fetchOptions',
  'clientState',
  'onError',
  'cacheRedirects',
  'cache',
]

export default class DefaultClient<TCache> extends ApolloClient<TCache> {
  constructor(config: IPresetConfig = {}) {
    if (config) {
      const diff = Object.keys(config).filter(
        key => PRESET_CONFIG_KEYS.indexOf(key) === -1
      )

      if (diff.length > 0) {
        // tslint:disable-next-line no-console
        console.warn(
          'ApolloBoost was initialized with unsupported options: ' +
            `${diff.join(' ')}`
        )
      }
    }

    const {
      request,
      uri,
      credentials,
      headers,
      fetch,
      fetchOptions,
      clientState,
      cacheRedirects,
      onError: errorCallback,
    } = config

    let { cache } = config

    if (cache && cacheRedirects) {
      throw new Error(
        'Incompatible cache configuration. If providing `cache` then ' +
          'configure the provided instance with `cacheRedirects` instead.'
      )
    }

    if (!cache) {
      cache = cacheRedirects
        ? new InMemoryCache({ cacheRedirects })
        : new InMemoryCache()
    }

    const stateLink = clientState
      ? withClientState({ ...clientState, cache })
      : false

    const errorLink = errorCallback
      ? onError(errorCallback)
      : onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
              // tslint:disable-next-line no-console
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ` +
                  `${locations}, Path: ${path}`
              )
            )
          }
          if (networkError) {
            // tslint:disable-next-line no-console
            console.log(`[Network error]: ${networkError}`)
          }
        })

    const requestHandler = request
      ? new ApolloLink(
          (operation, forward: any) =>
            new Observable(observer => {
              let handle: any
              Promise.resolve(operation)
                .then(oper => request(oper))
                .then(() => {
                  handle = forward(operation).subscribe({
                    complete: observer.complete.bind(observer),
                    error: observer.error.bind(observer),
                    next: observer.next.bind(observer),
                  })
                })
                .catch(observer.error.bind(observer))

              return () => {
                if (handle) {
                  handle.unsubscribe()
                }
              }
            })
        )
      : false

    const httpLink = new HttpLink({
      credentials: credentials || 'same-origin',
      fetch,
      fetchOptions: fetchOptions || {},
      headers: headers || {},
      uri: uri || '/graphql',
    })

    const wsLink = new WebSocketLink({
      options: { reconnect: true },
      uri: `${location.origin.replace(/^http/, 'ws')}${uri || '/graphql'}`,
    })

    const webLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as {
          kind: string
          operation: string
        }
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )

    const link = ApolloLink.from([
      errorLink,
      requestHandler,
      stateLink,
      webLink,
    ].filter(x => !!x) as ApolloLink[])

    super({ cache, link } as any)
  }
}
