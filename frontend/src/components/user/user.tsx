import { Col, Form, Input, Modal ,Row, DatePicker} from 'antd';
import {GET_LOCAL_ORDER_USER_DATA, UPDATE_LOCAL_ORDER_USER_DATA,GET_LOCAL_ORDER_ITEMS,CREATE_CUSTOMER_ORDER_ORDERITEM, UPDATE_LOCAL_ORDER_ITEMS, DELETE_LOCAL_ORDER_ITEMS} from '../../queries/queries'
import {graphql,compose} from 'react-apollo';
import {Redirect} from 'react-router';
import locale from 'antd/lib/date-picker/locale/sr_RS';
import * as React from 'react';


interface IProps {
  countBy?: number
  form?:any
  orderUserData:string
  onCancel(key:string,value:boolean):void
  handleSubmit(query:string,params:Object):void
  updateOrderUserData({variables:{}}):void
  createCustomerOrderOrderItems({variables:{input:{}}}):Promise<boolean>
  updateOrderItems(variables:any):void
  deleteOrderItems():void
  orderItems:any
}

interface IState {
  redirect?:boolean,
  name?: string;
  surname?:string;
  phone?:string,
  email?:string,
  address?:string,
  city?:string,
  message?:string,
  date?:string,
  visible?:boolean
}
class User extends React.Component<IProps, IState> {
    constructor(props: any){
        super(props);
        this.onChange=this.onChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            redirect:false
        }   
    }
    public onChange(key:string,e:any):void{
        if(e&&e.target){
            let currentState=JSON.parse(this.props.orderUserData)
            currentState[key]=e.target.value
            this.props.updateOrderUserData({variables:{input:currentState}})
        }else if(e&&e._d){
            let currentState=JSON.parse(this.props.orderUserData)
            let date=e._d;
            date=date.toString()
            currentState.date=date;
            this.props.updateOrderUserData({variables:{input:currentState}})
        }
    }
    static getDerivedStateFromProps(nextProps:any,prevState:any){
        if(nextProps.orderUserData){
            const nextState=JSON.parse(nextProps.orderUserData)
            if(nextState!=prevState){
                return nextState
        }
        }
    }
    public handleSubmit(e:React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:Error, values :any) => {
          if (!err) {
                let customer:any={}
                    customer.name=this.state.name;
                    customer.surname=this.state.surname;
                    customer.phone=this.state.phone;
                    customer.email=this.state.email;
                    customer.address=this.state.address
                    customer.city=this.state.city
                let order:any={};
                    order.message=this.state.message
                    order.delivery_date=this.state.date
                if(!order.delivery_date){
                    order.delivery_date='';
                }
                let orderItem=this.props.orderItems.map((item:any)=>{
                    var itemObj=JSON.parse(item);
                    itemObj.status='open';
                    switch(itemObj.unit){
                        case "m3":
                        itemObj.size=itemObj.height+'x'+itemObj.width+'x'+itemObj.length
                        break;
                        case "m2":
                        itemObj.size=itemObj.height+'x'+itemObj.width;
                        break;
                        case "m":
                        itemObj.size=itemObj.height;
                        break;
                    }
                    itemObj.amount=Math.ceil(itemObj.amount);
                    delete itemObj.height
                    delete itemObj.width
                    delete itemObj.length
                    delete itemObj.key
                    delete itemObj.manufacturerName
                    delete itemObj.productName
                    delete itemObj.unit
                    return itemObj;
                })

                console.log('orderItem product id',orderItem)
                const redirect=this.props.createCustomerOrderOrderItems({variables:{input:{customer,order,orderItem}}})
                redirect
                .then((val:any)=>{
                    if(val.data.createCustomerOrderOrderItem){
                        this.setState({redirect:true},()=>{
                            console.log('delete basket')
                            this.props.deleteOrderItems()
                        })
                        
                        this.onChange('message',"");
                        this.onChange("date", "Wed Aug 08 1900 17:33:10 GMT+0200 (Central European Summer Time)");
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
          }else{
          }
        });
      }
  public render() {
      
    if(this.state.redirect){
        return <Redirect to="/hvala"/>
    }

    const { getFieldDecorator } = this.props.form;
    return (
    <div>
        <Modal
            maskClosable={false}
            style={{ top: '5vh' }}
            width={'90%'}
            bodyStyle={{ minHeight: '80vh' }}
            title={'Hello'}
            visible={true}
            cancelText={'Close'}
            okText={'Save changes'}
            onOk={this.handleSubmit}
            onCancel={()=>this.props.onCancel('showUser',false)}
        >
            <Form layout="vertical">
                <Row>
                    <Col md={11}>
                        <Form.Item label={'Name'}>

                            {getFieldDecorator('Name', {
                                    initialValue:this.state.name,
                                    rules: [{
                                        message: 'The input is not valid E-mail!',
                                        setFieldsValue:this.state.name,
                                
                                        }, {
                                        required: true, message: 'Please write name',   
                                    }],
                            })(
                            <Input
                                onChange={this.onChange.bind(this,'name')}
                                placeholder={'Name'}
                            />
                            )}
                        </Form.Item>                    
                        <Form.Item label={'Phone'}>
                            {getFieldDecorator('Phone', {
                                    initialValue:this.state.phone,
                                    rules: [{
                                        message: 'Phone required"',
                                        setFieldsValue:this.state.phone
                                    }, {
                                    required: true, message: 'Please write phone',
                                }],
                            })(
                            <Input
                                onChange={this.onChange.bind(this,'phone')}
                                placeholder={'Phone'}
                            />
                            )}
                        </Form.Item>
                        <Form.Item label={'Address'}>
                            {getFieldDecorator('Address', {
                                    initialValue:this.state.address,
                                    rules: [{
                                        message: 'Input Address',
                                        setFieldsValue:this.state.address
                                    }, {
                                    required: true, message: 'Please write address',
                                }],
                            })(
                            <Input
                                onChange={this.onChange.bind(this,'address')}
                                placeholder={'Address'}
                            />
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={11} offset={1}>
                        <Form.Item label={'Surname'}>
                                {getFieldDecorator('Surname', {
                                    initialValue:this.state.surname,
                                    rules: [{
                                        message: 'Please input your surname',
                                        setFieldsValue:this.state.surname
                                    }, {
                                    required: true, message: 'Please input your surname',
                                }],
                            })(
                            <Input
                                onChange={this.onChange.bind(this,'surname')}
                                placeholder={'Surname'}
                            />
                            )}
                        </Form.Item>
                        <Form.Item label={'Email'}>
                            {getFieldDecorator('Email', {
                                    initialValue:this.state.email,
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                        setFieldsValue:this.state.email
                                    }, {
                                    required: true, message: 'Please input your email',
                                }],
                            })(
                            <Input
                                onChange={this.onChange.bind(this,'email')}
                                placeholder={'Email'}
                            />
                            )}
                        </Form.Item>
                        <Form.Item label={'City'}>
                            {getFieldDecorator('City', {
                                    initialValue:this.state.city,
                                    rules: [{
                                        message: 'Please input your city',
                                        setFieldsValue:this.state.city
                                    }, {
                                    required: true, message: 'Please input your city',
                                }],
                            })(
                            <Input
                                onChange={this.onChange.bind(this,'city')}
                                placeholder={'City'}
                            />
                            )}
                        </Form.Item>
                        <DatePicker 
                            onChange={this.onChange.bind(this,'date')} 
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime
                            locale={locale}
                        />
                    </Col>
                </Row>
                <Row>
                <Form.Item label={'Poruka:'}>
                            {getFieldDecorator('Message', {
                                    initialValue:this.state.message,
                                    rules: [{
                                        message: 'Poruka za prodavca',
                                        setFieldsValue:this.state.message
                                    }, {
                                    required: false
                                }],
                            })(
                            <Input.TextArea
                                onChange={this.onChange.bind(this,'message')}
                                placeholder={'Poruka'}
                            />
                            )}  
                        </Form.Item>
                </Row>
            </Form>
        </Modal>
    </div>
    );
  }
}
const WrappedUser=Form.create()(User);
export default  compose(
    graphql(GET_LOCAL_ORDER_USER_DATA,{
        props:({data: { orderUserData }}:any)=> orderUserData
    }),
    graphql(GET_LOCAL_ORDER_ITEMS,{
        props:({data: { orderItems }}:any)=> orderItems
    }),
    graphql(UPDATE_LOCAL_ORDER_ITEMS,{name:'updateOrderItems'}),
    graphql(UPDATE_LOCAL_ORDER_USER_DATA,{name:'updateOrderUserData'}),
    graphql(CREATE_CUSTOMER_ORDER_ORDERITEM,{name:'createCustomerOrderOrderItems'}),
    graphql(DELETE_LOCAL_ORDER_ITEMS,{name:'deleteOrderItems'})
)(WrappedUser);