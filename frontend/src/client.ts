import {ApolloClient, HttpLink , InMemoryCache, ApolloLink} from 'apollo-boost';
import {withClientState} from 'apollo-link-state';
import {GET_LOCAL_ORDER_ITEMS, GET_LOCAL_ORDER_USER_DATA} from './queries/queries' ;

const endpointURL = 'http://localhost:9000/graphql';

const cache=new InMemoryCache({
  dataIdFromObject:(o:any)=>o.id
});
const defaultState={
  orderItems:{
    __typename:'OrderItems',
    orderItems:[]
  },
  orderUserData:{
    __typename:'OrderUserData',
    orderUserData:`{
      "address":"asdfasdf",
      "city":"asfsaf",
      "email":"asfsaf",
      "name":"dfsf",
      "phone":"aaa",
      "surname":"sdfsfd",
      "message":"dsfsdf",
      "date":"sdfsdf"
  }`
  }
}
const stateLink=withClientState({
  cache,
  defaults:defaultState,
  resolvers:{
    Mutation:{
      updateOrderItems:(_:any,variables:any,{cache}:any)=>{
        const query=GET_LOCAL_ORDER_ITEMS;
        const newItem=variables.input;
        const previousState=cache.readQuery({query});    
        const data={
         ...previousState,
         orderItems:{
           ...previousState.orderItems,
            orderItems:[...previousState.orderItems.orderItems,newItem]
         }  
        }
        cache.writeQuery({query,data})
        return null;
      },
      deleteOrderItem:(_:any,variables:any,{cache}:any)=>{
        const query=GET_LOCAL_ORDER_ITEMS;
        const previousState=cache.readQuery({query});  
       
        const oldState=previousState.orderItems.orderItems.map((item:string)=>{
          return JSON.parse(item)
        }) 
        const newState=oldState.filter((item:any)=>{
          return item.key!=variables.input
        })
        const data={
         ...previousState,
         orderItems:{
           ...previousState.orderItems,
            orderItems:newState.map((item:any)=>{
              return JSON.stringify(item)
            })
         }  
        }
        cache.writeQuery({query,data})
        return null
      },

      updateOrderUserData:(_:any,variables:any,{cache}:any)=>{
        const query=GET_LOCAL_ORDER_USER_DATA
        const previousState=cache.readQuery({query});
        console.log('client console',variables.input)
        console.log('client console',previousState)

        return null


      }
    },

  },

})



export const client = new ApolloClient({
    link: ApolloLink.from([
      stateLink,
      new HttpLink({uri: endpointURL})
    ]),
    cache

  });
  