import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Query, Resolver, ResolveProperty, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {Admin} from '../../../models';
import * as _ from 'lodash';

@Resolver()
export class AdminResolver {
 constructor(
  @Inject('AdminRepository')
  private readonly admin: typeof Admin,

   ){}
  @Mutation()
  async register(obj, args, context){
      args.password = await bcrypt.hash(args.password, 12);
      const admin = await this.admin.create(args);
      return admin;
 }

 @Mutation()
 async login(obj, args, context){
   const user   = await this.admin.findOne({where: {login: args.login}} );
   if (!user){
     throw new Error('Nepostojeci korisnik');
   }
   const valid = await bcrypt.compare(args.password, user.password);
   if (!valid){
    throw new Error('pogresna lozinka');
   }

   const token = jwt.sign({login: _.pick(user, ['login'] )}, context.secret, {
      expiresIn: '20y',
   });
   return token;
 }
}
