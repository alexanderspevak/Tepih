import { Col, Form, Input, Modal ,Row} from 'antd';
import * as React from 'react';


interface IProps {
  countBy?: number;
  form?:any;
  onCancel(key:string):void;
  handleSubmit(query:string,params:Object):void
}

interface IState {
  name?: string;
  surname?:string;
  phone?:string,
  email?:string,
  address?:string,
  city?:string,

}

class User extends React.Component<IProps, IState> {
    constructor(props: any){
        super(props);
        this.onChange=this.onChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);

        this.state={
            address:'',
            city:'',
            email:'',
            name:'',
            phone:'',
            surname:'',
        }
        
    }

    public onChange(key:string,e:any):void{
        this.setState({ [key]: e.target.value})
        console.log(this.props)
    }

    public handleSubmit(e:React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:Error, values :any) => {
          if (!err) {
            console.log('Received values of form: ', values);
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
      onCancel={()=>this.props.onCancel('showUser')}
    >

    
        <Form layout="vertical">
            <Row>
                <Col md={11}>
                    <Form.Item label={'Name'}>
                         {getFieldDecorator('Name', {
                                rules: [{
                                message: 'The input is not valid E-mail!',
                                setFieldsValue:this.state.name
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
                </Col>
             </Row>
        </Form>
    </Modal>
    );
  }
}
const WrappedUser=Form.create()(User);
export default  WrappedUser;