import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Customer} from '../../../models';
import {Order} from '../../../models';

@Resolver()
export class CustomerResolver {
 constructor(
  @Inject('CustomerRepository')
  private readonly customer: typeof Customer,
  @Inject('OrderRepository')
  private readonly order: typeof Order,
   ){}

  @Query('customers')
  async getCustomers(obj, args, context, info) {
      const customer = await this.customer.findAll({include: [
     {model: this.order, as: 'Order' },
    ]});
      return customer;
  }

  @Query('customer')
  async getCustomer(obj, args, context, info) {
    return await this.customer.findById(args.id, {
      include: [{model: this.order, as: 'Order'}],
    });
  }

  @Mutation()
   async deleteCustomer(obj, args){
    return await this.customer.destroy({
      where: {id: args.id},
    });
  }

  @Mutation()
  async createCustomer(obj, {input}){
    const customer = await this.customer.create(input);
    return customer;
 }

 @Mutation()
 async updateCustomer(obj, {input}){
   return  await this.customer.upsert(input);
}
}
