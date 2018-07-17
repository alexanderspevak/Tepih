import {ApolloClient, HttpLink , InMemoryCache, ApolloLink} from 'apollo-boost';
import {withClientState} from 'apollo-link-state';
import gql from 'graphql-tag';

//import {UPDATE_STATE} from './components/products/queries'

const endpointURL = 'http://localhost:9000/graphql';

const cache=new InMemoryCache({
  dataIdFromObject:(o:any)=>o.id
});

const defaultState={

    productTable:{
      __typename:'productTable',
      productTable:['hello how are you']
    },

  
}

const stateLink=withClientState({
  cache:cache,
  defaults:defaultState,
  resolvers:{
    Mutation:{
      
      updateProductTable:(_:any,variables:any,{cache}:any)=>{
        const query=gql`
          query GetProductsTable{
            productTable @client{
              __typename
              productTable
            }
         
          }
        `;
      
        const previousState=cache.readQuery({query})
        const data={
         ...previousState,
         productTable:{
           ...previousState.productTable,productTable:variables.value
         }
        }
        cache.writeQuery({query,data})
      }
    }
  },

})



export const client = new ApolloClient({
    link: ApolloLink.from([
      stateLink,
      new HttpLink({uri: endpointURL})
    ]),
    cache

  });
  