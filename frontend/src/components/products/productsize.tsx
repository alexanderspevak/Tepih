import { Select, Form } from 'antd';
import * as React from 'react';
//import WrappedUser from './user';



interface IProps{
    onChange(key:string,value:string|undefined):void
    form?:any
}

interface IState{
    unit?:string
    height?:string
    length?:string
    width?:string
    size?:string
}


class ProductSize extends React.Component<IProps, IState> {
    
        products:any=null;
        constructor(props: any){
            super(props);
            this.state={
                unit:'PC',
                length:'0',
                height:'0',
                width:'0',
                size:''
            }
            this.onSelectUnit=this.onSelectUnit.bind(this);
            this.onChangeSize=this.onChangeSize.bind(this);
        }
        onSelectUnit(e:string){
            this.setState({unit:e})
            this.props.onChange('unit',e)
            console.log('what is e',e)
            switch (e){
                case 'PC':
                console.log('case pc')
                this.setState({size:''}, ()=>{
                    console.log('what is size in state',this.state.size)
                    this.props.onChange('size',this.state.size)})
                break;
                case 'M':
                this.setState({size:this.state.height},()=>{
                    console.log('what is size in state',this.state.size)
                    this.props.onChange('size',this.state.size)})
                break;
                case 'M2':
                console.log('case m2')
                this.setState({size:this.state.height+'x'+this.state.width},()=>this.props.onChange('size',this.state.size))
                break;
                case 'M3':
                this.setState({size:this.state.height+'x'+this.state.width+'x'+this.state.length},()=>this.props.onChange('size',this.state.size))
                break;
                default:
                console.log('non existent')
            }
        }
        onChangeSize(key:string,e:string){
            console.log('what is e',e)
            this.setState({[key]:e},()=>{
                switch (this.state.unit){
                    case 'PC':
                    this.setState({size:''}, ()=>this.props.onChange('size',this.state.size))
                    case 'M':
                    this.setState({size:this.state.height},()=>this.props.onChange('size',this.state.size))
                    case 'M2':
                    this.setState({size:this.state.height+'x'+this.state.width},()=>this.props.onChange('size',this.state.size))
                    case 'M3':
                    this.setState({size:this.state.height+'x'+this.state.width+'x'+this.state.length},()=>this.props.onChange('size',this.state.size))
                }
            }
            )
        }
        onChangeWidth(e:string){
            this.setState({width:e})
        }
        onChangeLength(e:string){
            this.setState({length:e})
        }
        public render() { 
            const {getFieldDecorator}=this.props.form;

            const S1=Array.apply(null, {length: 301}).map(((Function.call)), Number).map((item:number)=>{
                if(item===0) return;
                return (
                    <Select.Option key={item} value={item}>
                        {item} cm
                    </Select.Option>
                )
            });
            return (
                <div>
                        <Select onChange={this.onSelectUnit} defaultValue={this.state.unit}>
                            <Select.Option key={"PC"} value={"PC"}>
                                PC
                            </Select.Option>
                            <Select.Option key={"PC"} value={"M"}>
                                M
                            </Select.Option>
                            <Select.Option key={"PC"} value={"M2"}>
                                M2
                            </Select.Option>
                            <Select.Option key={"PC"} value={"M3"}>
                                M3
                            </Select.Option>
                        </Select>
                       {
                            (this.state.unit==='M'||this.state.unit==='M2'||this.state.unit==='M3')&&( 
                                <div>
                                    <Form.Item label="Height">
                                        {getFieldDecorator('height', {
                                            initialValue:this.state.height,
                                            rules: [ {
                                            required: true, message: 'Please write height',
                                            }],
                                            })(
                                            <Select onChange={this.onChangeSize.bind(this,'height')}>
                                                {S1}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                            )
                        }
                        {   
                           ( (this.state.unit==='M2'||this.state.unit==='M3'))&&( 
                               
                        <div>
                                    <Form.Item label="Width">
                                        {getFieldDecorator('width', {
                                            initialValue:this.state.width,
                                            rules: [ {
                                            required: true, message: 'Please write width',
                                            }],
                                            })(
                                            <Select onChange={this.onChangeSize.bind(this,'width')}>
                                                {S1}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                            ) 
                        }
                        {   
                            (this.state.unit==='M3')&&( 
                                <div>
                                <Form.Item label="Length">
                                    {getFieldDecorator('length', {
                                        initialValue:this.state.length,
                                        rules: [ {
                                        required: true, message: 'Please write length',
                                        }],
                                        })(
                                        <Select onChange={this.onChangeSize.bind(this,'length')}>
                                            {S1}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            ) 
                        }
                </div>
                )
        }
    }
    const WrappedProductSize=Form.create()(ProductSize);
    export default WrappedProductSize;