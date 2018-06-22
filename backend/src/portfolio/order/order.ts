import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Customer, Order, OrderItem} from '../../../models';

@Resolver()
export class OrderResolver {
 constructor(
  @Inject('CustomerRepository')
  private readonly customer: typeof Customer,
  @Inject('OrderRepository')
  private readonly order: typeof Order,
  @Inject('OrderItemRepository')
  private readonly orderItem: typeof OrderItem,
   ){}

  @Query('orders')
  async getOrders(obj, args, context, info) {
      const orders = await this.order.findAll({
        include: [
            {model: this.customer, as: 'Customer'},
            {model: this.orderItem, as: 'OrderItem'},
        ],
        });
      return orders;
  }

  @Query('order')
  async getOrder(obj, args, context, info) {
    return await this.order.findById(args.id, {
      include: [
                {model: this.customer, as: 'Customer'},
                {model: this.orderItem, as: 'OrderItem'},
            ],
    });
  }

  @Mutation()
   async deleteOrder(obj, args){
    return await this.order.destroy({
      where: {id: args.id},
    });
  }

  @Mutation()
  async createOrder(obj, {input}){
      const order = await this.order.create(input);
      return order;
 }

 @Mutation()
 async updateOrder(obj, {input}){
   return  await this.order.upsert(input);
}
}
