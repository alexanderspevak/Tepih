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
    return await this.product.findAll({
      include: [
        {model: this.manufacturer, as: 'Manufacturer'},
        {model: this.orderItem, as: 'OrderItem'},
      ],
    });
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
    return await this.product.destroy({
      where: {id: args.id},
    });
  }

  @Mutation()
  async createProduct(obj, {input}){
    const product = await this.product.create(input)
    .catch((err)=>console.log('did it catch error',err.message));
    return product;
 }

 @Mutation()
 async updateProduct(obj, {input}){
   return  await this.product.upsert(input).catch((err)=>err);
}
}