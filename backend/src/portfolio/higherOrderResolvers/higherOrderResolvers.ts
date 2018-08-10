import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Customer, Order, OrderItem} from '../../../models';

@Resolver()
export class HigherOrderResolver {
 constructor(
  @Inject('CustomerRepository')
  private readonly customer: typeof Customer,
  @Inject('OrderRepository')
  private readonly order: typeof Order,
  @Inject('OrderItemRepository')
  private readonly orderItem: typeof OrderItem,
   ){}

 @Mutation()
 createCustomerOrderOrderItem(obj, input){
    return this.customer.create(input.input.customer)
    .then((customer) => {
        input.input.order.customer_id = customer.id;
        return  this.order.create(input.input.order);
    })
    .then((order) => {
        console.log('multiple orderItems', input.input.orderItem);
        input.input.orderItem.map((orderItem) => {
            orderItem.order_id = order.id;
            return this.orderItem.create(orderItem);
        });
        return true;
    })
    .catch((err) => {
        return err;
    });

}
}