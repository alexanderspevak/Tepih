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
        id
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
        manufacturerName
        manufacturer_id
      }
    }
  
  `
  export const GET_STATE =gql`
    {
      orderItems @client
    }

`




export const GET_LOCAL_MANUFACTURERS =gql`
{
  manufacturers @client{
    manufacturers
  }
}
`;



export const UPDATE_PRODUCTTABLE=gql`
mutation UpdateProductTable($values:[String!]){
  updateProductTable(value:$values)  @client
  }
`;




export const GET_MANUFACTURERS=gql`
{
  manufacturers{
    name
    id
  }
}`

export const UPDATE_PRODUCT=gql`
  mutation updateProduct($input:UpdateCreateProduct!){
    updateProduct(input:$input){
      name
      id
      description
      pic
      type
      size
      price
      unit
      color
      manufacturer_id
      manufacturerName
    }
  }
`

export const CREATE_PRODUCT=gql`
mutation updateProduct($input:UpdateCreateProduct!){
  createProduct(input:$input){
    name
    description
    pic
    type
    size
    price
    unit
    color
    manufacturer_id
    manufacturerName
  }
}
`

export const GET_LOCAL_ORDER_ITEMS=gql`
  query{
    orderItems @client{
      orderItems
    }
  }
    `

export const UPDATE_LOCAL_ORDER_ITEMS=gql`
  mutation updateOrderItems($input:String){
    updateOrderItems(input:$input) @client
}
`
export const DELETE_LOCAL_ORDER_ITEMS=gql`
mutation ClearOrderItems{
  clearOrderItems @client
}`

export const DELETE_LOCAL_ORDER_ITEM=gql`
  mutation deleteOrderItem($input:String!){
   deleteOrderItem(input:$input) @client
}
`
export const GET_LOCAL_ORDER_USER_DATA=gql`
  query{
    orderUserData @client{
      orderUserData   
    }
  }
    `
export const UPDATE_LOCAL_ORDER_USER_DATA=gql`
  mutation updateOrderUserData($input:String!){
   updateOrderUserData(input:$input) @client
}
`

export const CREATE_CUSTOMER_ORDER_ORDERITEM=gql`mutation CreateCustomerOrderOrderItem($input:OrderType){
  createCustomerOrderOrderItem(input:$input)
}
`
export const LOGIN=gql`mutation Login($login:String!,$password:String!){
  login(login:$login,password:$password)
}`

export const CUSTOMER_ORDER_ORDER_ITEM=gql`query{
	customers{
    id
    name
    surname
    address
    city
    phone
    email
    Order{
      delivery_date
      message
      id
      OrderItem{
        id
        quantity
        size
        amount
        status
        product_id
      }
    }
  }
}`