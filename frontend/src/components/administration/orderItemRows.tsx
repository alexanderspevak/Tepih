import * as React from 'react';
import {Fragment} from 'react';
import {GET_PRODUCT,UPDATE_ORDER_ITEM,CUSTOMER_ORDER_ORDER_ITEM} from '../../queries/queries'
//import {client} from '../../client'; 
import {Query,graphql,compose} from 'react-apollo';
import {IOrderItem} from '../../interface'


interface IProps{
    orderItem:IOrderItem,
    switch?:boolean
    showClosed?:boolean
    openCloseOrderItem(param:{variables:{input:IOrderItem}}):void
}
interface IState{
    switch?:boolean
}
class OrderItemRows extends React.Component<IProps,IState>{
    constructor(props:any){
        super(props)
        this.state={
            switch:false
        }
    }
    openCloseOrderItem(){
        let orderItem:IOrderItem= JSON.parse(JSON.stringify(this.props.orderItem));
        delete orderItem.__typename
        console.log(orderItem)
        if(orderItem.status==='closed'){
            console.log('status',orderItem.status)
            orderItem.status='open'
        }else{
            console.log('sttus',orderItem.status)
            orderItem.status='closed'
        }
        this.props.openCloseOrderItem({variables:{input:orderItem}})
    }
    deleteOrderItem(){
    }
    render(){
        console.log('');
        console.log(this.props.showClosed||(this.props.orderItem.status==='open'))
        if(this.props.showClosed||(this.props.orderItem.status==='open')){
            return (
                <Fragment>
                    <Query query={GET_PRODUCT} variables={{id:this.props.orderItem.product_id}}>
                    {({ loading, error, data }:any) => {
                        if (loading){ return (
                            <tr>
                                <td>
                                    Loading...
                                </td>
                            </tr>
                            );}
                        if (error){
                            return (
                            <tr>
                                <td>
                                    `Error! ${error.message}`
                                </td>
                        </tr>
                            )
                        } 
                       const    orderItem=this.props.orderItem
                        return (
                      <tr>
                          <td>
                              <button 
                                onClick={this.openCloseOrderItem.bind(this)}>
                                    {orderItem.status=='open'?'Zatvori poziciju':'Otvori poziciju'}
                                </button>
                          </td>
                          <td>  
                             {data.product.name}
                          </td>
                          <td>
                             {data.product.manufacturerName}
                          </td>
                          <td>
                              {orderItem.quantity}
                          </td>
                          <td>
                             {orderItem.size}
                          </td>
                          <td>
                             {orderItem.amount}
                          </td>
                          <td>
                             {orderItem.status}
                          </td>
   
                      </tr>
                    
                    );
                    }}
                      </Query>
                      {this.state.switch&&<tr>
                          <td>
                                expandible row
                          </td>
                          <td>
                              row
                          </td>
          
                      </tr>
                      }
                  </Fragment>
                  )



        }else{
            return null;
        }
    }
}

export default compose(
    graphql(UPDATE_ORDER_ITEM,{name:'openCloseOrderItem',refetchQueries:[{guery:CUSTOMER_ORDER_ORDER_ITEM}]})
)(OrderItemRows)