import * as React from 'react';
// import {IRow} from '../../interface';
// import {Form,Modal,message} from 'antd';
// import {graphql,compose} from 'react-apollo'
import {CUSTOMER_ORDER_ORDER_ITEM} from '../../queries/queries';
import { Query } from 'react-apollo';
import Rows from './customerRows';
//import {Redirect} from 'react-router';
interface IProps{
    admin:boolean
}
interface IState{
}
class Administration extends React.Component<IProps,IState>{
    render(){
        if(!this.props.admin){
            return(
                <div>Nemate ovlašćenja</div>
            )
        }else{
            return (
                <Query query={CUSTOMER_ORDER_ORDER_ITEM}>
                    {({loading,error,data}:any )=>{
                        if(loading) return null;
                        if(error) return `Error: ${error}`;
                        console.log('data',data)
                        if(data && data.customers){
                            const table=data.customers.map((customer:any,index:number)=>{
                                // const orderData=customer.map((order:any)=>{
                                //     return order
                                // })
                                return (
                                    <Rows customer={customer} key={customer.id}/>
                                )
                                       
                        })
                        return ( <table>
                                    <tbody>
                                        {table}
                                    </tbody>
                                 </table>)
                    }
                    return <div>Nemate porudzbine</div>
                }

                        }
                        
                           
                </Query>
            )
        }
        return null;

    }

}

export default Administration