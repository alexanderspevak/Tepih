import { Col, Form, Input, Modal ,Row} from 'antd';
import * as React from 'react';
import {Mutation} from 'react-apollo';
import ManufacturerList from '../manufacturer/manufacturerlist';
import WrappedProductSize from './productsize'
import {UPDATE_PRODUCT,GET_PRODUCTS} from '../../queries/queries'



interface IProps {
  countBy?: number;
  form?:any;
  values:any
  onCancel(key:string,value:boolean):void;
  handleSubmit(query:string,params:Object):void
}

interface IState {
  name?: string;
  type?:string;
  price?:string,
  unit?:string,
  size?:string,
  color?:string,
  description?:string
  pic?:string
  manufacturer_id?:number|string
  id?:number|null

}

class Product extends React.Component<IProps, IState> {
    constructor(props: any){
        super(props);
        this.onChange=this.onChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);

        this.state={
            id:null,
            name:'',
            type:'',
            price:'',
            unit:'',
            size:'',
            color:'',
            description:'',
            pic:'',
            manufacturer_id:'',
  
        }
        
    }

    public componentDidMount(){
        const values=this.props.values
        const pic=values.pic.props.src.slice(1)
        this.setState({
            name:values.name,
            type:values.type,
            price:values.price,
            unit:values.unit,
            size:values.size,
            color:values.color,    
            description:values.description,
            pic,
            manufacturer_id:values.ManufacturerId,
            id:values.id,
        })
    }

    public onChange(key:string,e:any):void{
        if(e.target){
            this.setState({ [key]: e.target.value})
            return
        }

        this.setState({ [key]:e})
    }

    public handleSubmit(updateProduct:Function,e:React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:Error, values :any) => {
          if (!err) {
            console.log('what is state',this.state)
            updateProduct({variables:{input:this.state}})

          }else{
            console.log('err')
     
          }
        });
      }

  public render() {
      
    const { getFieldDecorator } = this.props.form;
    return (
        <Mutation 
            mutation={UPDATE_PRODUCT}
            update={(cache,{data:{updateProduct}})=>{
                console.log('cachereadQuery',cache.readQuery({query:GET_PRODUCTS}))
                const {products}:any=cache.readQuery({query:GET_PRODUCTS});
                console.log('what are products',products[0]);
                console.log('update products',products.concat([updateProduct]))
                cache.writeQuery({
                    query:GET_PRODUCTS,
                    data:{products:products.concat([updateProduct])}
                })
            }}
        
        >
            {
            (updateProduct,{data})=>(
                <Modal
                    maskClosable={false}
                    style={{ top: '5vh' }}
                    width={'90%'}
                    bodyStyle={{ minHeight: '80vh' }}
                    title={'Hello'}
                    visible={true}
                    cancelText={'Close'}
                    okText={'Save changes'}
                    onOk={this.handleSubmit.bind(this,updateProduct)}
                    onCancel={()=>this.props.onCancel('showProduct',false)}
                >

                
                    <Form layout="vertical">
                        <Row>
                            <Col md={11}>
                                <Form.Item label={'Name'}>
                                    {getFieldDecorator('Name', {
                                            initialValue:this.state.name,
                                            rules: [{
                                            message: 'Name can not be empty',
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

                                <Form.Item label={'Type'}>

                                    {getFieldDecorator('Type', {
                                            initialValue:this.state.type,
                                            rules: [{
                                            message: 'Type required"',
                    
                                            }, {
                                            required: true, message: 'Please write type',
                                        }],
                                    })(
                                    <Input
                                        onChange={this.onChange.bind(this,'type')}
                                        placeholder={'Type'}
                                    />
                                    )}
                                </Form.Item>
                                <Form.Item label={'Manufacturer'}>
                                    <ManufacturerList defaultValue={this.props.values.Manufacturer} onChange={this.onChange}/>
                                </Form.Item>

                                <Form.Item label={'Picture'}>
                                    {getFieldDecorator('Picture', {
                                            initialValue:this.state.pic,
                                            rules: [ {
                                            required: false, 
                                        }],
                                    })(
                                    <Input
                                        onChange={this.onChange.bind(this,'pic')}
                                        placeholder={'Picture'}
                                    />
                                    )}
                                </Form.Item>
                                <Form.Item label={'Price'}>
                                    {getFieldDecorator('Price', {
                                            initialValue:this.state.price,
                                            rules: [{
                                            message: 'Price can not be empty',
                                            }, {
                                            required: true, message: 'Please write price',
                                            
                                        }],
                                    })(
                                    <Input
                                        onChange={this.onChange.bind(this,'price')}
                                        placeholder={'Price'}
                                    />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col md={11} offset={1}>
                                <Form.Item label={'Size'}>
                                        {getFieldDecorator('Size', {
                                            initialValue:this.state.size,
                                            rules: [{
                                            message: 'Please input size',
                                            }, {
                                            required: true, message: 'Please write size',
                                        }],
                                    })(
                                        <WrappedProductSize onChPictureange={this.onChange}/>   
                                    )}
                                </Form.Item>
                                <Form.Item label={'Colors'}>
                                    {getFieldDecorator('Colors', {
                                            initialValue:this.state.color,
                                            rules: [{
                                            message: 'The input is not valid E-mail!',
                                            }, {
                                            required: false, message: 'Please input your email',
                                        }],
                                    })(
                                    <Input
                                        onChange={this.onChange.bind(this,'color')}
                                        placeholder={'Colors'}
                                    />
                                    )}Picture
                                </Form.Item>
                                <Form.Item label={'Description'}>
                                    {getFieldDecorator('Description', {
                                            initialValue:this.state.description,
                                            rules: [{
                                            message: 'Please type description',
                                            }, {
                                            required: false, message: 'Please input city',
                                        }]
                                    })(
                                    <Input
                                        onChange={this.onChange.bind(this,'description')}
                                        placeholder={'DescriptioPicturen'}
                                    />
                                    )}
                                </Form.Item>
                                
                            </Col>
                        </Row>
                    </Form>
                    
                </Modal>
            )}
        </Mutation>
    );
  }
}
const WrappedProduct=Form.create()(Product);
export default  WrappedProduct;