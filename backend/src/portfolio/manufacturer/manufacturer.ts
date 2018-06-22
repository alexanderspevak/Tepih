import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Manufacturer} from '../../../models';
import {Product} from '../../../models';

@Resolver()
export class ManufacturerResolver {
 constructor(
  @Inject('ManufacturerRepository')
  private readonly manufacturer: typeof Manufacturer,
  @Inject('ProductRepository')
  private readonly product: typeof Product,
   ){}

  @Query('manufacturers')
  async getManufacturers(obj, args, context, info) {
    const manufacturer = await this.manufacturer.findAll({include: [
     {model: this.product, as: 'Product' },
    ]});
    return manufacturer;
  }

  @Query('manufacturer')
  async getManufacturer(obj, args, context, info) {
    return await this.manufacturer.findById(args.id, {
      include: [{model: this.product, as: 'Product'}],
    });
  }

  @Mutation()
   async deleteManufacturer(obj, args){
    return await this.manufacturer.destroy({
      where: {id: args.id},
    });
  }

  @Mutation()
  async createManufacturer(obj, args){
    const manufacturer = await this.manufacturer.create({name: args.name});
    return manufacturer;
 }

 @Mutation()
 async updateManufacturer(obj, args){
   const manufacturer = await this.manufacturer.upsert(
     {
     id: args.id,
     name: args.name,
   },
   );
}
}
