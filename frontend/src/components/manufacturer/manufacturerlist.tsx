import { Select } from 'antd';
import * as React from 'react';
//import WrappedUser from './user';
import { Query} from 'react-apollo';
import {GET_MANUFACTURERS} from '../../queries/queries';

interface IProps{
    defaultValue:any,

    onChange(key:string, e:any):void

}

interface IState{
    item:string
}


class ManufacturerList extends React.Component<IProps, IState> {
    
        products:any=null;
        constructor(props: any){
            super(props);
            this.state={
                item:'lhello'
            }
            this.onChange=this.onChange.bind(this);
        }

        onChange(e:any){
            const item=JSON.parse(e);
            this.props.onChange('manufacturer_id',item.id);
        }
    
        public render() { 
            return (
               
                <div>
                    <Query query={GET_MANUFACTURERS}>
                        {({loading,error,data})=>{
                            if(loading) return null;
                            if(error) return `Error: ${error}`;
                                let selectItems=data.manufacturers.map((item:{id:number, name:string})=>{
                                    return( 
                                        <Select.Option value={JSON.stringify(item)} key={item.id}>
                                                {item.name}
                                        </Select.Option>
                                        )
                                })
                                return (
                                <Select defaultValue={this.props.defaultValue} onChange={this.onChange}>
                                    {selectItems}
                                </Select>
                                );
    
                        }}
                    </Query>
    

                </div>
                )
        }
    
    }
    
    export default ManufacturerList