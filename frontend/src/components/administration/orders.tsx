import * as React from 'react';
// import {IRow} from '../../interface';
// import {Form,Modal,message} from 'antd';
// import {graphql,compose} from 'react-apollo'
import {CUSTOMER_ORDER_ORDER_ITEM} from '../../queries/queries';
import { Query } from 'react-apollo';
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
                    {({loading,error,data})=>{
                        if(loading) return null;
                        if(error) return `Error: ${error}`;
                        console.log('data',data)
                            const table=data.customers.map((customer:any)=>{
                                return (
                                            <tr key={customer.id}>
                                                <tr>
                                                    <td>
                                                        {customer.name}/{customer.surname}
                                                    </td>
                                                    <td>
                                                        {customer.phone}
                                                    </td>
                                                    <td>
                                                        {customer.email}
                                                    </td>
                                                    <td>
                                                        {customer.address}/{customer.city}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        hello
                                                    </td>
                                                </tr>
                                            </tr>
                                )
                                       
                        })
                        return ( <table>
                                    <tbody>
                                        {table}
                                    </tbody>
                                 </table>)
                    }}
                </Query>
            )
        }
        return null;

    }

}

export default Administration