import { Col, Form, Input, Modal ,Row} from 'antd';
import * as React from 'react';
import {Mutation} from 'react-apollo';
import ManufacturerList from '../manufacturer/manufacturerlist';
import WrappedProductSize from './productsize'
import {UPDATE_PRODUCT,CREATE_PRODUCT,GET_PRODUCTS} from '../../queries/queries'
import {IRow} from '../../interface';



interface IProps {
  countBy?: number;
  form?:any;
  values: IRow,
  mode:string,
  onCancel(key:string,value:boolean,fn?:Function):void;
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

    public componentWillMount(){
        const values=this.props.values
        const pic= values && values.pic && values.pic.props && values.pic.props.src.slice(1)
        
        this.setState({
            name:values.name,
            type:values.type,
            price:values.price,
            unit:values.unit,
            size:values.size,
            color:values.color,    
            description:values.description,
            pic,
            manufacturer_id:values.manufacturer_id,
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

    public handleSubmit(updateCreateProduct:Function,e:React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:Error, values :any) => {
          if (!err) {
                updateCreateProduct({variables:{input:this.state}})
                console.log('itprops onCancel')
            this.props.onCancel('showProduct',false)
          } else{
            console.log('err')
     
          }
        });
      }

  public render() {
    if(this.props.mode==='update'){
        var mutationQuery=UPDATE_PRODUCT
    }else{
        mutationQuery=CREATE_PRODUCT
    }
    const { getFieldDecorator } = this.props.form;
    return (
        <Mutation 
            mutation={mutationQuery}
            /* update={(cache,{data}) => {
                    const products:{products:object[]}|null=cache.readQuery({query:GET_PRODUCTS});
                    console.log('what is data here????',data)
                    if(products){
                        products.products.push(data.createProduct)
                        cache.writeQuery({query:GET_PRODUCTS,data:products})
                    }
                if(this.props.mode=='create'){
                    console.log('hello create')
                }
    
            }} */
            refetchQueries={[{query:GET_PRODUCTS}]}
        >
            {
            (updateCreateProduct,{data})=>(
                <Modal
                    maskClosable={false}
                    style={{ top: '5vh' }}
                    width={'90%'}
                    bodyStyle={{ minHeight: '80vh' }}
                    title={'Hello'}
                    visible={true}
                    cancelText={'Close'}
                    okText={'Save changes'}
                    onOk={this.handleSubmit.bind(this,updateCreateProduct)}
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
                                    <ManufacturerList defaultValue={this.props.values.manufacturerName} onChange={this.onChange}/>
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
                                        <WrappedProductSize onChange={this.onChange} size={this.state.size}/>   
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