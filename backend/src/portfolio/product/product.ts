import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Manufacturer, Product, OrderItem} from '../../../models';

@Resolver()
export class ProductResolver {
 constructor(
  @Inject('ProductRepository')
  private readonly product: typeof Product,
  @Inject('ManufacturerRepository')
  private readonly manufacturer: typeof Manufacturer,
  @Inject('OrderItemRepository')
  private readonly orderItem: typeof OrderItem,
   ){}

  @Query('products')
  async getProducts(obj, args, context, info) {
     const product:any=await this.product.findAll({
      include: [
        {model: this.manufacturer, as: 'Manufacturer'},
        {model: this.orderItem, as: 'OrderItem'},
      ],
    });
    
    const products=product.map((item)=>{
      item.manufacturerName=item.get('Manufacturer').get('name');
      item.ManufacturerId=item.Manufacturer.Id;
      return item;
    })
    return products;
  }

  @Query('product')
  async getProduct(obj, args, context, info) {
    return await this.product.findById(args.id, {
      include: [
        {model: this.manufacturer, as: 'Manufacturer'},
        {model: this.orderItem, as: 'OrderItem'},
      ],
    });
  }

  @Mutation()
   async deleteProduct(obj, args){
     const product=this.product.findById(args.id)
     await this.product.destroy({
      where: {id: args.id},
    });
    console.log('what is product',product)
    return product
  }

  @Mutation()
  async createProduct(obj, {input}){
    const product = await this.product.create(input)
    .catch((err)=>console.log('did it catch error',err.message));
    return product;
 }

 @Mutation()
 async updateProduct(obj, {input}){
  const p =  await this.product.upsert(input, {returning:true});
  return p[0];
}
}