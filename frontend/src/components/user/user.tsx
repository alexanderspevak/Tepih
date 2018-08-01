import { Col, Form, Input, Modal ,Row, DatePicker} from 'antd';
import {GET_LOCAL_ORDER_USER_DATA, UPDATE_LOCAL_ORDER_USER_DATA} from '../../queries/queries'
import {graphql,compose} from 'react-apollo'
import locale from 'antd/lib/date-picker/locale/sr_RS';
import * as React from 'react';


interface IProps {
  countBy?: number;
  form?:any;
  orderUserData:string,
  onCancel(key:string,value:boolean):void;
  handleSubmit(query:string,params:Object):void
  updateOrderUserData({variables:{}}):void
}
interface IState {
  name?: string;
  surname?:string;
  phone?:string,
  email?:string,
  address?:string,
  city?:string,
  message?:string,
  date?:string
}
class User extends React.Component<IProps, IState> {
    constructor(props: any){
        super(props);
        this.onChange=this.onChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            name:'aaaaa'
        }   
    }
    public onChange(key:string,e:any):void{
        console.log('what is e',e)
        if(e&&e.target){
            let currentState=JSON.parse(this.props.orderUserData)
            currentState[key]=e.target.value
            this.props.updateOrderUserData({variables:{input:currentState}})
        }else if(e){
            let currentState=JSON.parse(this.props.orderUserData)
            currentState[key]=JSON.stringify(e._d)
            this.props.updateOrderUserData({variables:{input:currentState}})
        }

    }

    static getDerivedStateFromProps(nextProps:any,prevState:any){
        if(nextProps.orderUserData){
            const nextState=JSON.parse(nextProps.orderUserData)
            console.log('nextState',nextState)
            if(nextState!=prevState){
                console.log('setstate')
                return nextState
        }
        }
    }
    public handleSubmit(e:React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:Error, values :any) => {
          if (!err) {
            this.props.handleSubmit('user',this.state);
          }else{
          }
        });
      }
  public render() {
    
    const { getFieldDecorator } = this.props.form;
    return (
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
                    {console.log('this.state',this.state.name)}
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
    );
  }
}
const WrappedUser=Form.create()(User);
export default  compose(
    graphql(GET_LOCAL_ORDER_USER_DATA,{
        props:({data: { orderUserData }}:any)=> orderUserData
    }),
    graphql(UPDATE_LOCAL_ORDER_USER_DATA,{name:'updateOrderUserData'})
)(WrappedUser);