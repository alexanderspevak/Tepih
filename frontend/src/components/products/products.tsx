import { Button } from 'antd';
import * as React from 'react';
//import WrappedUser from './user';
import * as queries from '../../queries/queries';
import WrappedProduct from './updateCreateProduct';
import { Query } from 'react-apollo';
import {Table} from 'antd';
import {graphql,compose, Mutation} from 'react-apollo';
import {GET_STATE,UPDATE_STATE, DELETE_PRODUCT} from '../../queries/queries';
import Picmodal from './picmodal';


interface IProps {
  countBy?: number;
  form?:any;
  currentItem:any
  admin:boolean
  UPDATE_STATE({
      variables:{
          
      }
  }):void
}

interface IState {
    show:any
    dataColumns:any
    products?:any
}
let items:any=null


class Products extends React.Component<IProps, IState> {

    products:any=null;
    constructor(props: any){
        super(props);
        this.state={
            show:{
                showUser:false,
                showPic:null,
                showProduct:false
            },
            dataColumns:[]
            
        }
        this.onChange=this.onChange.bind(this);
    }
    

   async componentDidMount() {

    const editColumn = {
        title:'Edit',
        dataIndex:'edit',
        key:'edit', 
        render: (text:any,row:any,index:any) => {
 
            return(
                <div onClick={()=>this.onChange('showProduct',row)}>
                    edit
                </div>
            )
        }
    } as ColumnType;

        this.setState({products:await queries.products()})
        if(this.props.admin){
           columns.push(editColumn);

        columns.push({
            title:'Delete',
            dataIndex:'delete',
            key:'delete',
            render:(text:any,row:any,index:any)=>{
                console.log('show row data',row)
                return (
                    <Mutation mutation={DELETE_PRODUCT}>
                        {
                            (deleteProduct,{data})=>(
                                <button onClick={()=>{deleteProduct({variables:{value:row.id}})}}>
                                     delete
                                </button>

                            )


                        }
                    </Mutation>
                )
            }
        })
        }
        this.setState({dataColumns:columns})
    }

    

 
    public onChange(key:string,value:string|boolean,fn?:Function):void{
        this.setState({show:{...this.state.show,[key]:value}})
        if(fn){fn()};
    }



    // public handleSubmit(query:string,params:Object):void{
    //         this.setState({showUser:false});
    // }

    // public onClick(){
    //     this.setState({showUser:!this.state.showUser})

    //     this.props.UPDATE_STATE({
    //         variables:{
    //             value:'hello munchmalow'
    //         }
    //     }
    //     )
    // }
    
    public render() { 
        return (
           
            <div>
                <Query query={queries.GET_PRODUCTS}>
                    {({loading,error,data})=>{
                        if(loading) return null;
                        if(error) return `Error: ${error}`;
                            console.log('what is data',data)
                            {items=data.products.map((item:any,index:number)=>{
                                const newItem:any={}
                                newItem.key=item.id;
                                Object.keys(item).forEach((key)=>{
                                    if(key==='Manufacturer') 
                                    {
                                        newItem.Manufacturer=item.Manufacturer.name
                                        newItem.ManufacturerId=item.Manufacturer.id
                                    }
                                    else if(key==='pic'){
                                        newItem[key]=<img 
                                            src={`/${item[key]}`} 
                                            alt={item[key]} 
                                            style={{height:"70px", width:"70px"}} 
                                            onClick={()=>{
                                                this.onChange('showPic', item[key])
                                                }}          
                                            />
                                    }else
                                    {
                                        newItem[key]=item[key]
                                    }
                                    
                                })
                                newItem.edit='edit';
                                newItem.delete='delete';
                                return newItem;
                            })}

                            return <Table dataSource={items} columns={this.state.dataColumns}/>;
                    }}
                </Query>,

                 {this.state.show.showProduct&&
                    <WrappedProduct onCancel={this.onChange} values={this.state.show.showProduct}/>
                 /* <WrappedUser
                     onCancel={this.onChange}   
                     //handleSubmit={this.handleSubmit}
                 /> */


                 }
                {/* <Button onClick={()=>{this.onChange('showUser',true)}}>
                    Show User Modal
                </Button> */}
                <Button onClick={()=>{this.onChange('showProduct',true)}}>
                    Show products
                </Button>
                {this.state.show.showPic&&<Picmodal link={`/${this.state.show.showPic}`} onCancel={this.onChange}/>}
                {this.props.currentItem.orderItems}
                <input onChange={(e)=>{this.props.UPDATE_STATE({
                     variables:{
                         value:e.target.value
                    },
                    })}
                    }
                >
                </input>
            </div>
            )
    }

}


export default compose(
    graphql(UPDATE_STATE,{name:'UPDATE_STATE'}),
    graphql(GET_STATE,{
        props:({data:currentItem})=>{
            return currentItem;
        }
    })
)(Products);

type ColumnType = {
    key: string,
    title: string,
    dataIndex: string,
    render?: (text: any, row: any, index: any) => React.ReactElement<any>;
}

const columns =[{
    title:'Name',
    dataIndex:'name',
    key:'name',
} as ColumnType,
{
    title:'Type',
    dataIndex:'type',
    key:'type'  
} as ColumnType,
{
    title:'Price',
    dataIndex:'price',
    key:'price'  
} as ColumnType,
{
    title:'Unit',
    dataIndex:'unit',
    key:'unit'  
} as ColumnType,
{
    title:'Size',
    dataIndex:'size',
    key:'size'  
} as ColumnType,
{
    title:'Color',
    dataIndex:'color',
    key:'color'  
} as ColumnType,
{
    title:'Description',
    dataIndex:'description',
    key:'description' 
} as ColumnType,
{
    title:'Picture',
    dataIndex:'pic',
    key:'pic'  
} as ColumnType,
{
    title:'Manufacturer',
    dataIndex:'Manufacturer',
    key:'Manufacturer'  
} as ColumnType
]