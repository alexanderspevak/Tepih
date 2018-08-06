import * as bcrypt from 'bcrypt';
import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Admin} from '../../../models';


@Resolver()
export class AdminResolver {
 constructor(
  @Inject('AdminRepository')
  private readonly admin: typeof Admin,

   ){}
  @Mutation()
  async register(obj, args,context){
      console.log('mutates admin',context)
      args.password=await bcrypt.hash(args.password,12);
    const admin= await this.admin.create(args);
    return admin;
 }
}
