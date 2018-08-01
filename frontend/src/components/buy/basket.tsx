import * as React from 'react';
// import {IRow} from '../../interface';
import {Form,Modal} from 'antd';
import {graphql,compose} from 'react-apollo'
import {GET_LOCAL_ORDER_ITEMS,GET_PRODUCTS,DELETE_LOCAL_ORDER_ITEM} from '../../queries/queries';
import {Redirect} from 'react-router';
import WrappedUser from '../user/user';


interface IProps {
    orderItems:[string],
    GET_PRODUCTS:any,
    data:any,
  
    deleteOrderItem(variables:any):void
 }
  
interface IState {
    redirect?:boolean,
    data?:any
    showUser?:boolean,
 }

class Basket extends React.Component<IProps,IState>{
    constructor(props:any){
        super(props)
        this.state={
            redirect:false,
            data:[],
            showUser:false
        }
        this.showUser=this.showUser.bind(this);
        
    }

    static getDerivedStateFromProps(nextProps:any,prevState:any){
        if(nextProps.orderItems!=prevState.data){
            return {data: nextProps.orderItems.map((item: any)=>{
                const parsedItem=JSON.parse(item)
                switch(parsedItem.unit){
                    case 'komad':
                        parsedItem.defSize=''
                        break;
                    case 'm':
                        parsedItem.defSize=String(parsedItem.height)
                        break;
                    case 'm2':
                        parsedItem.defSize=parsedItem.height+'x'+parsedItem.width
                        break;
                    case 'm3':
                        parsedItem.defSize=parsedItem.height+'x'+parsedItem.width+'x'+parsedItem.length;
                }
                return parsedItem
            })}
        }
            return null
        }
    showUser(){
        this.setState({showUser:true})
    }

    handleSubmit(){

        this.setState({showUser:true})
 
    }

    onOkCancel(key:string,value:boolean|string){
        this.setState({[key]:value})
    }
    onClick(e:any){
        console.log(e)
        this.props.deleteOrderItem({variables:{input:e}})
    }
    render(){
        let amount=0;
        if(this.state.redirect){
            return(<Redirect to="/products"/>)
        }
        return (
            <div>
                <Modal
                maskClosable={false}
                style={{ top: '5vh' }}
                width={'90%'}
                bodyStyle={{ minHeight: '80vh' }}
                title={'Hello'}
                visible={true}
                cancelText={'Vrati se u katalog'}
                okText={'Naruči'}
                onOk={this.onOkCancel.bind(this,'showUser',true)}
                onCancel={this.onOkCancel.bind(this,'redirect',true)}
            >
                        <table>
                            <tbody>
                                <tr>
                                    <th>Naziv proizvoda:</th>
                                    <th>Proizvođač:</th>
                                    <th>Veličina proizvoda</th>
                                    <th>Definisana veličina:</th>
                                    <th>Količina:</th>
                                    <th>Cena:</th>
                                    <th>obriši</th>
                                </tr>
                                    {this.state.data.map((item:any)=>{
                                        amount=amount+item. amount;
                                        return(
                                            <tr key={item.key}>
                                            <td>
                                                {item.productName}
                                            </td>
                                            <td>
                                                {item.manufacturerName}
                                            </td>
                                            <td>
                                                {item.unit=='komad'?item.size:''}
                                            </td>
                                            <td>
                                                {item.defSize}
                                            </td>
                                            <td>
                                                {item.quantity}
                                            </td>
                                            <td>
                                                {item.amount}
                                            </td>
                                            <td>
                                                <button key={item.key} onClick={this.onClick.bind(this,item.key)}>
                                                    x
                                                </button>
                                            </td>
                                            
                                        </tr>
                                        )
                                
                                    })}
                            </tbody>
                        </table>
                        Cena ukupno:{amount}
                </Modal>
                {this.state.showUser&&<WrappedUser onCancel={this.onOkCancel.bind(this      )}/>}
            </div>
        )
    }
}
const WrappedBasket=Form.create()(Basket)
export default  compose(
    graphql(GET_LOCAL_ORDER_ITEMS,{props:({data: { orderItems }}:any)=> orderItems}),
    graphql(GET_PRODUCTS,{props:(data)=>data}),
    graphql(DELETE_LOCAL_ORDER_ITEM,{name:'deleteOrderItem'})
)(WrappedBasket);