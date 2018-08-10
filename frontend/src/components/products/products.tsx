import { Button } from 'antd';
import * as React from 'react';
import * as queries from '../../queries/queries';
import WrappedProduct from './updateCreateProduct';
import WrappedBuy from '../buy/Buy';
import { Query , Mutation} from 'react-apollo';
import {Table} from 'antd';
import {DELETE_PRODUCT,  GET_PRODUCTS} from '../../queries/queries';
import Picmodal from './picmodal';
import {IRow} from '../../interface';


interface IProps {
  countBy?: number;
  form?:any;
  currentItem:any
  productTable:[string]
  manufacturers:[any]
  admin:boolean
  UPDATE_STATE({
      variables:{
          
      }
  }):void
  UPDATE_PRODUCTTABLE({
    variables:{

    }
  }):void

}
interface IState {
    filteredInfo:any,
    sortedInfo:any,
    show:{
        showUser:boolean,
        showPic:boolean,
        showProduct:boolean|IRow,
        createProduct:boolean,
        buyProduct:boolean|IRow
    }
    dataColumns:any
    products?:any
}

let items:any=null
class Products extends React.Component<IProps, IState> {
    products:any=null;
    constructor(props: any){
        super(props);
        this.state={
            filteredInfo: null,
            sortedInfo: null,
            show:{
                showUser:false,
                showPic:false,
                showProduct:false,
                createProduct:false,
                buyProduct:false
            },
            dataColumns:[]
        }
        this.onChange=this.onChange.bind(this);
    }

    handleChange = (pagination:any, filters:any, sorter:any) => {
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      }

   async componentDidMount() {
        this.setState({products:await queries.products()})
    }

    public onChange(key:string,value:string|boolean,fn?:Function):void{
        this.setState({show:{...this.state.show,[key]:value}})
        if(fn){fn()};
    }

    public render() { 

        type ProductData = {
            products:Array<{id:number}>
            }|null
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        type ColumnType = {
            key: string,
            title: string,
            dataIndex: string,
            render?: (text: any, row: any, index: any) => React.ReactElement<any>;
        }
    
       
        return ( 
            <div>
                <Query query={queries.GET_PRODUCTS}>
                    {({loading,error,data})=>{
                        if(loading) return null;
                        if(error) return `Error: ${error}`;
                        if(data&&data.products){
                            ///create objects for filters in table columns
                            const typeArray=data.products.map((product:any)=>{
                                return product.type
                            })
                            const uniqueTypeArray=typeArray.filter((type:string,pos:string)=>{
                                return typeArray.indexOf(type)===pos
                            })
                            var objTypeArray=uniqueTypeArray.map((type:string)=>{
                                return {text:type,value:type}
                            })
                            const manufacturerArray=data.products.map((product:any)=>{
                                return product.manufacturerName
                            })
                            const uniqueManufacturerArray=manufacturerArray.filter((manufacturer:string,pos:string)=>{
                                return manufacturerArray.indexOf(manufacturer)===pos
                            })
                            var objManufacturerArray=uniqueManufacturerArray.map((type:string)=>{
                                return {text:type,value:type}
                            })
                        } 
                        const columns =[{
                            title:'Naziv proizvoda',
                            dataIndex:'name',
                            key:'name'
                        } as ColumnType,
                        {
                            title:'Tip proizvoda',
                            dataIndex:'type',
                            key:'type',
                            filters:objTypeArray?objTypeArray:[],
                            filteredValue: this.state.filteredInfo?this.state.filteredInfo.type: null,
                            onFilter: (value:any, record:any) => record.type.includes(value), 
                        } as ColumnType,
                        {
                            title:'Cena',
                            dataIndex:'price',
                            key:'price'  
                        } as ColumnType,
                        {
                            title:'Jedinica mere    ',
                            dataIndex:'unit',
                            key:'unit'  
                        } as ColumnType,
                        {
                            title:'Veličina',
                            dataIndex:'size',
                            key:'size'  
                        } as ColumnType,
                        {
                            title:'Boja',
                            dataIndex:'color',
                            key:'color'  
                        } as ColumnType,
                        {
                            title:'Opis',
                            dataIndex:'description',
                            key:'description' 
                        } as ColumnType,
                        {
                            title:'Slika',
                            dataIndex:'pic',
                            key:'pic'  
                        } as ColumnType,
                        {
                            title:'Proizvođač',
                            dataIndex:'manufacturerName',
                            key:'Manufacturer',
                            filters:objManufacturerArray?objManufacturerArray:[],
                            filteredValue: this.state.filteredInfo?this.state.filteredInfo.Manufacturer:null,
                            onFilter: (value:any, record:any) => record.manufacturerName.includes(value), 
                        } as ColumnType
                        ]   
                
                        const BuyColumn = {
                            title:'',
                            dataIndex:'kupi',
                            key:'kupi', 
                            render: (text:any,row:any,index:any) => {
                                return(
                                    <Button onClick={()=>{
                                        this.onChange('buyProduct',row)}}>
                                        Naruči
                                    </Button>
                                )
                            }
                        } as ColumnType;
                        const editColumn = {
                            title:'Edit',
                            dataIndex:'edit',
                            key:'edit', 
                            render: (text:any,row:any,index:any) => {
                           
                                return(
                                    <Button onClick={()=>{
                                        
                                        this.onChange('showProduct',row)}}>
                                        edit
                                    </Button>
                                )
                            }
                        } as ColumnType;
                        if(this.props.admin){
                            columns.push(editColumn);
                            columns.push({
                            title:'Delete',
                            dataIndex:'delete',
                            key:'delete',
                            render:(text:any,row:any,index:any)=>{
                                return (
                                    <Mutation 
                                        mutation={DELETE_PRODUCT}
                                        update={(cache,{data}) => {
                                             const productData=cache.readQuery({query:GET_PRODUCTS})as ProductData
                                            if(productData){
                                                const resultData=productData.products.filter((item:any)=>item.id!=data.deleteProduct.id)
                                                productData.products=resultData
                                                cache.writeQuery({query:GET_PRODUCTS,data:productData})
                                            }
                                        }}
                                    >
                                        {
                                            (deleteProduct,{data})=>(
                                                <Button onClick={()=>{deleteProduct({variables:{value:row.id}})}}>
                                                     delete
                                                </Button>
                                            )
                                        }
                                    </Mutation>
                                )
                            }
                        })
                        }else{
                                columns.push(BuyColumn)
                        }
                            {items=data.products.map((item:any,index:number)=>{
                                
                                const newItem:any={}
                                newItem.key=item.id;
                                Object.keys(item).forEach((key)=>{
                                    if(key==='pic'){
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
                                return newItem;
                            })}
                            ;
                            return <Table dataSource={items} columns={columns} onChange={this.handleChange}/>;
                    }}
                </Query>
                 {this.state.show.showProduct&&
                    <WrappedProduct onCancel={this.onChange} values={this.state.show.showProduct} mode={"update"}/>
                 }
                 {this.state.show.createProduct&&
                    <WrappedProduct onCancel={this.onChange} values={this.state.show.showProduct} mode={"create"}/>
                 }
                 {this.state.show.buyProduct&&
                    <WrappedBuy onCancel={this.onChange} values={this.state.show.buyProduct} mode={"buy"}/>
                 }
                {this.props.admin&&<Button onClick={()=>{this.onChange('createProduct',true)}}>
                    Create Product
                </Button>}
                {this.state.show.showPic&&<Picmodal link={`/${this.state.show.showPic}`} onCancel={this.onChange}/>}
            </div>
            )
    }
}
export default Products;

