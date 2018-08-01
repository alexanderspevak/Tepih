import {ApolloClient, HttpLink , InMemoryCache, ApolloLink} from 'apollo-boost';
import {withClientState} from 'apollo-link-state';
import gql from 'graphql-tag';
//import gql from 'graphql-tag';

//import {UPDATE_STATE} from './components/products/queries'

const endpointURL = 'http://localhost:9000/graphql';

const cache=new InMemoryCache({
  dataIdFromObject:(o:any)=>o.id
});

const defaultState={
  orderItems:{
    id:'orderItems',
    __typename:'OrderItems',
    orderItems:[JSON.stringify({hello:'hello'})]
  }
}

const stateLink=withClientState({
  cache,
  defaults:defaultState,
  resolvers:{
    Mutation:{
      updateOrderItems:(_:any,variables:any,{cache}:any)=>{
        const query=gql`
        query{
          orderItems @client{
            orderItems
          }
        }`;

        
        const newItem=variables.input;
        
        const previousState=cache.readQuery({query})       

        client.writeFragment({
          id: 'orderItems',
          fragment: gql`
            fragment orderItemsFragment on orderItems {
              orderItems
            }
          `,
          data: {
            orderItems:[...previousState.orderItems.orderItems, newItem
            ]
          },
        });
        const currentState=cache.readQuery({query});
        console.log('what is current state',currentState)
        
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
  