import * as React from 'react';
import {IRow} from '../../interface';
import {Form,Modal} from 'antd';

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
  


class Buy extends React.Component<IProps,IState>{
    constructor(props:any){
        super(props)
        this.state={}
    }

    handleSubmit(){
        console.log('handle submit works')
        this.props.onCancel('buyProduct',false)
    }
    render(){
        console.log('thsi.props',this.props)
        return (
            <div>
                hello munchamllowwsdf asdf asdfkj asdfj adsf
                
            <Modal
                maskClosable={false}
                style={{ top: '5vh' }}
                width={'90%'}
                bodyStyle={{ minHeight: '80vh' }}
                title={'Hello'}
                visible={true}
                cancelText={'Zatvori'}
                okText={'Ok'}
                onOk={this.handleSubmit.bind(this)}
                onCancel={()=>this.props.onCancel('showProduct',false)}
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

                                <h4>new row</h4>
                                <h3> {this.props.values.type}</h3>
                            </div>

                        </td>
                        <td>
                            
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

const WrappedBuy=Form.create()(Buy);
export default WrappedBuy