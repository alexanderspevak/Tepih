import * as React from 'react';
import {IRow} from '../../interface';
import {Form,Modal, Button} from 'antd';
import {graphql,compose} from 'react-apollo'
import {GET_LOCAL_ORDER_ITEMS, UPDATE_LOCAL_ORDER_ITEMS} from '../../queries/queries'
import {Redirect} from 'react-router';
import uuidv1 from 'uuid/v1';

interface IProps {
    countBy?: number
    form?:any
    values: IRow
    mode:string,
    orderItems:any,
    onCancel(key:string,value:boolean,fn?:Function):void
    orderGoToBasket(query:string,params:Object):void
    orderGoToCatalogue(query:string,params:Object):void
    updateOrderItems(variables:any):void
  }
  
  interface IState {
    height?:number,
    width?:number,
    length?:number,
    quantity?:number,
    productName?:string,
    manufacturerName?:string,
    status?:String,
    ammount?:number|undefined,
    price?:string,
    redirect?:boolean,
    productId?:number,
    unit?:string,
    key?:any,
    product_id?:number
  
  }
class Buy extends React.Component<IProps,IState>{
    constructor(props:any){
        super(props)
        this.state={
            ammount:0,
            height:1,
            width:1,
            length:1    ,
            quantity:1,
            productName:'',
            manufacturerName:'',
            status:'open',
            redirect:false
        }

        this.orderGoToBasket=this.orderGoToBasket.bind(this)
        this.orderGoToCatalogue=this.orderGoToCatalogue.bind(this)
    }
    componentDidMount(){
        if(this.props.values.manufacturerName&&this.props.values.name&&this.props.values.unit){
            this.setState({
                manufacturerName:this.props.values.manufacturerName, 
                productName:this.props.values.name,
                unit:this.props.values.unit,
                key:uuidv1(),
                
            })
        }
        const unit=this.props.values.unit
        var price=this.props.values.price;
        var ammount=0;
        switch(unit){
            case 'm3':
            if(price){ammount=parseInt(price)/1000000}
            break;
            case 'm2':
            if(price){ammount=parseInt(price)/10000}
            this.setState({length:100});
            break;
            case 'm':
            if(price){ammount=parseInt(price)/100}
            this.setState({length:100,width:100});
            break;
            default:
            if(price){
                ammount=parseInt(price)
                this.setState({length:100,width:100,height:100});
            }else{
                ammount=0
            }
        }
        if(ammount){
            this.setState({ammount})
        }
        
    }
    public onChange(key:string,e:any):void{
        var value=e.target.value
        if(this.props.values.price){
           
            var price=parseInt(this.props.values.price)
        }
        if(value){
            value=parseInt(value)
            if(key==='height'||key==='width'||key==='length'||key==='quantity'){
                this.setState({ [key]: parseInt(value)},()=>{
       
                    const {height,width,length,quantity}={...this.state}
                        if(height&&width&&length&&quantity){
                            var arr=[height/100,width/100,length/100,quantity,price]
                        
                            var ammount=arr.reduce((accumulator:any,currentValue:any)=>{
                                return accumulator*currentValue
                            },1)
       
                            this.setState({ammount})
                            return;
            }})}else{
                this.setState({ [key]: e.target.value})
                return
            }
        }
    }
    orderGoToBasket(){
        console.log(this.state)
        const sendObj:any={...this.state}
        delete sendObj['redirect'];
        sendObj.size=this.props.values.size
        sendObj.product_id=this.props.values.id
        console.log('sendObject',sendObj)
        console.log('props',this.props.values)
        this.props.updateOrderItems({variables:{input:JSON.stringify(sendObj)}})
        this.setState({redirect:true});
    }

    orderGoToCatalogue(){
        const sendObj:any={...this.state}
        delete sendObj['redirect'];
        sendObj.size=this.props.values.size
        this.props.updateOrderItems({variables:{input:JSON.stringify(sendObj)}})
        this.props.onCancel('buyProduct',false)
    }
    render(){
        if(this.state.redirect){
            return <Redirect to="/basket"/>}
        const unitSelector=this.props.values.unit?this.props.values.unit.substring(1,2):'x';
        const selectOptionCM=Array.apply(null, {length: 301}).map(((Function.call)), Number).map((item:number)=>{
            if(item===0) return ;
            return (
                <option key={item} value={item}>
                    {item} 
                </option>
            )
        });
        const selectOptionKom=Array.apply(null, {length: 50}).map(((Function.call)), Number).map((item:number)=>{
            if(item===0) return ;
            return (
                <option key={item} value={item}>
                    {item}
                </option>
            )
        });
        return (
            <div>
            <Modal
                maskClosable={false}
                style={{ top: '5vh' }}
                width={'90%'}
                bodyStyle={{ minHeight: '80vh' }}
                title={'Hello'}
                visible={true}
                cancelText={'Zatvori'}
                okText={'Ok'}
                onOk={this.orderGoToBasket.bind(this)}
                onCancel={()=>this.props.onCancel('buyProduct',false)}
                footer={[
                    <Button key="orderGotoCatalogue" onClick={this.orderGoToCatalogue}>Naruči i vrati se u katalog</Button>,
                    <Button key="orderGotoBasket" type="primary"  onClick={this.orderGoToBasket}>
                      Naruči i završi kupovinu
                    </Button>,
                  ]}
            >
                <div>
                <table className="table-Buy">
                    <tbody>
                    <tr>
                        <td>               
                                <h4>Naziv:</h4>
                                <h2> {this.props.values.name}</h2>
                        </td>
                        <td>
                                <h4>Opis:</h4>
                                <h2> {this.props.values.description}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <div className="Buy">
                                <h4>Proizvođač:</h4>
                                <h3> {this.props.values.manufacturerName}</h3>
                            </div>
                        </td>
                        <td>
                             <div className="Buy">
                                <h4>Boja:</h4>
                                <h3> {this.props.values.color}</h3>
                            </div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        
                        {
                           ( 
                           <div style={{textAlign:"center"}}>
                            <h4 >Količina:</h4>
                                    <select  onChange={this.onChange.bind(this,'quantity')}>
                                        {selectOptionKom}
                                    </select>

                           </div>
                        )
                        }
                        {
                            this.props.values.unit=='m'?( 
                                <div style={{textAlign:"center"}}>
                                <h4 > Veličina (CM):</h4>
                                  <select  onChange={this.onChange.bind(this,'height')}>
                                      {selectOptionCM}
                                  </select>
                              </div>
       
                           ):(  
                                <div></div>
                        
                           )
                        }
                        {
                            unitSelector=='3'?(
                            <div style={{textAlign:"center"}}>
                                 <h4 > Veličina (CM):</h4>
                            <select onChange={this.onChange.bind(this,'height')}>
                                {selectOptionCM}
                            </select>
                                <h4>x</h4>
                            <select onChange={this.onChange.bind(this,'width')}>
                                {selectOptionCM}
                            </select>
                                <h4>x</h4>
                            <select onChange={this.onChange.bind(this,'length')}>
                                {selectOptionCM}
                            </select>
                            </div>                
                          ):unitSelector=='2'?(
                              <div style={{textAlign:"center"}}>
                                   <h4 > Veličina (CM):</h4>
                            <select onChange={this.onChange.bind(this,'height')}>
                                {selectOptionCM}
                            </select>
                            <h4>x</h4>
                            <select onChange={this.onChange.bind(this,'width')}>
                                {selectOptionCM}
                            </select>
                              </div>
                           ):null 

                        }
                        </td>
                        <td>
                            <h2> Cena:</h2>
                            <h2>{this.props.values.price} dinara</h2>
                           
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <h1>Suma:</h1>
                            <h1>{this.state.ammount}</h1>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </Modal>
            
            </div>
        )
    }
}
const FormBuy=Form.create()(Buy);
export default compose(
    graphql(GET_LOCAL_ORDER_ITEMS,{
        props:({data: { orderItems }}:any)=> orderItems
    }),
    graphql(UPDATE_LOCAL_ORDER_ITEMS,{name:'updateOrderItems'})
)(FormBuy)