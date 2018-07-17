import { Select, Form } from 'antd';
import * as React from 'react';
//import WrappedUser from './user';



interface IProps{
    onChange(key:string,value:string|undefined):void
    form?:any
    size?:string
}

interface IState{
    unit?:string
    height?:number
    length?:number
    width?:number
    size?:string
}


class ProductSize extends React.Component<IProps, IState> {
    
        products:any=null;
        constructor(props: any){
            super(props);
            this.state={
                unit:'mera',
                length:0,
                height:0,
                width:0,
                size:''
            }
            this.onSelectUnit=this.onSelectUnit.bind(this);
            this.onChangeSize=this.onChangeSize.bind(this);
        }

        componentWillMount(){
            console.log('this.propssize',this.props.size)
            if(this.props.size&&this.props.size!=''){
                const arr:string[]=this.props.size.split('x')
                console.log('what is arr')
                switch (arr.length){
                    case 3:
                        this.setState({length:parseInt(arr[2])})
                    case 2:
                        this.setState({width:parseInt(arr[1])});
                    case 1:
                        this.setState({height:parseInt(arr[0])})
                }
            }

        }

        onSelectUnit(e:string){
         
            this.setState({unit:e},() =>{

                switch (e){
                    case 'mera':
                    let {width,length,height}=this.state;
                    
                    if(height&&height>0&&width&&width>0){
                        var heightWidth='x'
                    }else{
                        heightWidth=''
                    }
                    if(height&&height>0&&width&&width>0){
                        var heightWidth='x'
                    }else{
                        heightWidth=''
                    }
                    if(height&&height>0&&length&&length>0&&width==0){
                        var heightLength='x'
                    }else{
                        heightLength=''
                    }
                    if(width&&width>0&&length&&length>0){
                        var widthLength='x'
                    }else{
                        widthLength=''
                    }
                    if(height&&height>0){
                        var heightParse=height+''
                        console.log('hwat is heighParse',heightParse)
                    }else{
                        heightParse=''
                    }
                    if(width&&width>0){
                        var widthParse=width+''
                    }else{
                        widthParse=''
                    }
                    if(length&&length>0){
                        var lengthParse=length+''
                    }else{
                        lengthParse=''
                    }
                      
                    const sizeState=heightParse+heightWidth+widthParse+widthLength+heightLength+lengthParse;
                    this.setState({size:sizeState}, 
                        ()=>{
                            this.props.onChange('size',this.state.size)})
                
                    break;
                    case 'm':
                    this.setState({size:''},()=>{
                        console.log('what is size in state',this.state.size)
                        this.props.onChange('size',this.state.size)})
                    break;
                    case 'm2':
                    this.setState({size:''},()=>this.props.onChange('size',this.state.size))
                    break;
                    case 'm3':
                    this.setState({size:''},()=>this.props.onChange('size',this.state.size))
                    break;
                    default:
                    console.log('non existent')
                }
            }
        
        )
            this.props.onChange('unit',e)
        }
        onChangeSize(key:string,e:string){
            console.log('what is e type', typeof e)
            this.setState({[key]:e},()=>{
                console.log('what is unit',this.state.unit)
                switch (this.state.unit){
                    case 'mera':
                    
                    let {width,length,height}=this.state;
                    
                    if(height&&height>0&&width&&width>0){
                        var heightWidth='x'
                    }else{
                        heightWidth=''
                    }
                    if(height&&height>0&&width&&width>0){
                        var heightWidth='x'
                    }else{
                        heightWidth=''
                    }
                    if(height&&height>0&&length&&length>0&&width==0){
                        var heightLength='x'
                    }else{
                        heightLength=''
                    }
                    if(width&&width>0&&length&&length>0){
                        var widthLength='x'
                    }else{
                        widthLength=''
                    }
                    if(height&&height>0){
                        var heightParse=height+''
                        console.log('hwat is heighParse',heightParse)
                    }else{
                        heightParse=''
                    }
                    if(width&&width>0){
                        var widthParse=width+''
                    }else{
                        widthParse=''
                    }
                    if(length&&length>0){
                        var lengthParse=length+''
                    }else{
                        lengthParse=''
                    }
                      
                    const sizeState=heightParse+heightWidth+widthParse+widthLength+heightLength+lengthParse;
                    this.setState({size:sizeState}, 
                        ()=>{
                            this.props.onChange('size',this.state.size)})
                    break; 
                    case 'm':
                    this.setState({size:''},()=>this.props.onChange('size',this.state.size))
                    break;
                    case 'm2':
              
                    this.setState({size:''},()=>{
        
                        this.props.onChange('size',this.state.size)})
                    break;
                    case 'm3':
                    this.setState({size:''},()=>this.props.onChange('size',this.state.size))
                }
                this.props.onChange('size',this.state.size)
            }
            )
        }



        public render() { 
           
            const {getFieldDecorator}=this.props.form;

            const S1=Array.apply(null, {length: 301}).map(((Function.call)), Number).map((item:number)=>{
                //if(item===0) return;
                return (
                    <Select.Option key={item} value={item}>
                        {item} cm
                    </Select.Option>
                )
            });
            return (
                <div>
                        <Select onChange={this.onSelectUnit} defaultValue={this.state.unit}>
                            <Select.Option key={'mera'} value={'mera'}>
                                merna jedinica
                            </Select.Option>
                            <Select.Option key={"m"} value={"m"}>
                                m
                            </Select.Option>
                            <Select.Option key={"m2"} value={"m2"}>
                                m2
                            </Select.Option>
                            <Select.Option key={"m3"} value={"m3"}>
                                m3
                            </Select.Option>
                        </Select>
                       {
                            (this.state.unit==='mera')&&( 
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
                           ( (this.state.unit==='mera'))&&( 
                               
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
                            (this.state.unit==='mera')&&( 
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