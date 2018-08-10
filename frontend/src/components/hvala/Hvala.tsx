import * as React from 'react';
import {GET_LOCAL_ORDER_ITEMS, UPDATE_LOCAL_ORDER_ITEMS} from '../../queries/queries';

import {graphql,compose} from 'react-apollo'
import {Modal} from 'antd';
import {Redirect} from 'react-router';

interface IProps{
    orderItems:[string],
    updateOrderItems(variables:any):void
}
interface IState{
    redirect:boolean
}


class Hvala extends React.Component<IProps, IState> {
    constructor(props:any){
        super(props);
        this.state={
            redirect:false
        }
    }

    render(){
        if (this.state.redirect){
            return(<Redirect to="/"/>)
        }
        return(
            <Modal
                maskClosable={false}
                style={{ top: '5vh' }}
                width={'90%'}
                bodyStyle={{ minHeight: '80vh' }}
                title={'Hvala na kupovini !'}
                visible={true}
                okText={'Nazad na glavnu stranicu'}
                onOk={()=>{this.setState({redirect:true})}}
                
        >
            <img src="pedja.jpeg" alt="" style={{width:"80%" }}/>
        </Modal>
        )
    }
}

export default  compose(graphql(GET_LOCAL_ORDER_ITEMS,{
    props:({data: { orderItems }}:any)=> orderItems
}),
graphql(UPDATE_LOCAL_ORDER_ITEMS,{name:'updateOrderItems'})

 ) (Hvala);