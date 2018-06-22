import {ApolloClient, HttpLink , InMemoryCache, ApolloLink} from 'apollo-boost';
import {withClientState} from 'apollo-link-state';
import gql from 'graphql-tag';
//import {UPDATE_STATE} from './components/products/queries'

const endpointURL = 'http://localhost:9000/graphql';

const cache=new InMemoryCache();

const defaultState={
  currentItem: {
    __typename:'currenProduct',
    orderItems:'hello',
  }
}

const stateLink=withClientState({
  cache:cache,
  defaults:defaultState,
  resolvers:{
    Mutation:{
      updateOrderItem:(_:any,{value}:any,{cache}:any)=>{
        const query=gql`
          query GetCurrentItem{
            currentItem @client{
              orderItems
            }
          }
        `
        const previousState=cache.readQuery({query:query})
        console.log('what is previous state', previousState)
        console.log('what is value', value)
        const data={
            currentItem:{
              ...previousState.currentItem,
              orderItems:value
            }
        }
        cache.writeData({query,data})

        console.log('last console',cache.readQuery({query:query}))
        //return data;
      }
    }
  }
})

export const client = new ApolloClient({
    link: ApolloLink.from([
      stateLink,
      new HttpLink({uri: endpointURL})
    ]),
    cache
  });
  