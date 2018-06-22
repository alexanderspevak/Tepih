import {client} from '../client';
import gql from 'graphql-tag';



export async function products():Promise<{}> {
    const query = gql`{
      products {
        name
        description
        id
      }
    }`;
    const data = await client.query({query, fetchPolicy:'no-cache'})
    return data;
  }

  export const DELETE_PRODUCT=gql`
    mutation deleteProduct($value:Int!) {
      deleteProduct(id:$value) {
        name
      }
    }
    `

  export const GET_PRODUCTS =gql`
    {
      products{
        id
        type
        name
        unit
        price
        description
        color
        size
        pic
        Manufacturer{
          name
          id
        }
      }
    }
  
  `
  export const GET_STATE =gql`
    {
      currentItem @client{
        orderItems
      }
    }

`

export const UPDATE_STATE=gql`
    mutation UpdateOrderItem($value:String!) {
      updateOrderItem(value:$value) @client{
        orderItems 
      }
    }
`

export const GET_MANUFACTURERS=gql`
{
  manufacturers{
    name
    id
  }
}`

export const UPDATE_PRODUCT=gql`
  mutation updateProduct($input:UpdateCreateProduct!){
    updateProduct(input:$input)
  }
`