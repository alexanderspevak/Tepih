import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Product, Order, OrderItem, Customer, Manufacturer} from '../../../models';

@Resolver()
export class OrderItemResolver {
 constructor(
  @Inject('ProductRepository')
  private readonly product: typeof Product,
  @Inject('OrderRepository')
  private readonly order: typeof Order,
  @Inject('OrderItemRepository')
  private readonly orderItem: typeof OrderItem,
  @Inject('CustomerRepository')
  private readonly customer: typeof Customer,
  @Inject('ManufacturerRepository')
  private readonly manufacturer: typeof Manufacturer,
   ){}

  @Query('orderItems')
  async getOrderItems(obj, args, context, info) {
      const orderItems = await this.orderItem.findAll({
        include: [
            {model: this.order, as: 'Order', include: [
                {model: this.customer, as: 'Customer'},
            ]},
            {model: this.product, as: 'Product', include: [
                {model: this.manufacturer, as: 'Manufacturer'},
            ]},
        ],
        });
      return orderItems;
  }

  @Query('orderItem')
  async getOrderItem(obj, args, context, info) {
    return await this.orderItem.findById(args.id, {
        include: [
            {model: this.order, as: 'Order', include: [
                {model: this.customer, as: 'Customer'},
            ]},
            {model: this.product, as: 'Product', include: [
                {model: this.manufacturer, as: 'Manufacturer'},
            ]},
        ],
        });
  }

  @Mutation()
   async deleteOrderItem(obj, args){
    return await this.orderItem.destroy({
      where: {id: args.id},
    });
  }

  @Mutation()
  async createOrderItem(obj, {input}){
      const orderItem = await this.orderItem.create(input);
      return orderItem;
 }

 @Mutation()
 async updateOrderItem(obj, {input}){
   return  await this.orderItem.upsert(input);
}
}
