import * as React from 'react';
import {Fragment} from 'react';
import OrderItemRows from './orderItemRows';

interface IProps{
    customer?:any,
    showOrderItem?:boolean
}
interface IState{
    showOrderItem?:boolean,
    showClosed?:false
}

class Rows extends React.Component<IProps,IState>{
    constructor(props:any){
        super(props)
        this.state={
            showOrderItem:false,
            showClosed:false
        }
    }
    onClick(key:string,e:React.FormEvent<HTMLInputElement>){
        this.setState({[key]:!this.state[key]})
    }
    render(){
        const openPositionArray= this.props.customer.Order[0].OrderItem.map((item:any)=>{
                if(item.status==='open'){
                    return item.amount
                }else{
                    return 0;
                }
            })
            const openPosition=openPositionArray.reduce((accumulator:number,currentValue:number)=>{
                if(typeof currentValue==='number'){
                  return  accumulator+currentValue;
                }else{
                    return accumulator+0;
                }
            },0);
        const orderItemArray=this.props.customer.Order[0].OrderItem.map((item:any)=>{
            return (<OrderItemRows key={item.id} orderItem={item} showClosed={this.state.showClosed}/>)
        })
        return (
      <Fragment>
            <tr>
                <td>
                    <button onClick={this.onClick.bind(this,'showOrderItem')}>Expand</button>
                </td>
                <td>
                    {openPosition}
                </td>
                <td>
                    {this.props.customer.name}/{this.props.customer.surname}
                </td>
                <td>
                    {this.props.customer.phone}
                </td>
                <td>
                    {this.props.customer.email}
                </td>
                <td>
                    {this.props.customer.address}/{this.props.customer.city}
                </td>
                <td>
                    {this.props.customer.Order[0].message}
                </td>
                <td>
                    {this.props.customer.Order[0].delivery_date}
                </td>
                <td>

                </td>
            </tr>
            
          {this.state.showOrderItem&&(
          <Fragment>
          <tr>
              <td>
                  <button onClick={this.onClick.bind(this,'showClosed')}>
                        Pokazi zatvorene porudzbine
                  </button>
            </td>
              
              </tr>
              <tr>
                  <td>
                      Pokazi sve porudzbine
                  </td>
                  <td>
                      Ime proizvoda:
                  </td>
                  <td>
                      Proizvodac:
                  </td>
                  <td>
                      Kolicina:
                  </td>
                  <td>
                     Velicina:
                  </td>
                  <td>
                     Suma:
                  </td>
                  <td>
                     Status:
                  </td>
              </tr>
            {orderItemArray}
        </Fragment>
            )}
        </Fragment>
        )
}
}
export default Rows;