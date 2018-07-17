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

export const GET_PRODUCTTABLE =gql`
{
  productTable @client{
    productTable
  }
}
`;


export const GET_LOCAL_MANUFACTURERS =gql`
{
  manufacturers @client{
    manufacturers
  }
}
`;

export const UPDATE_LOCAL_MANUFACTURERS=gql`
mutation UpdateLocalManufacturers($values:[Any]) {
  updateLocalManufacturers(value:$values)  @client
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