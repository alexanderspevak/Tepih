import { Module, NestModule, MiddlewareConsumer, ArgumentsHost, Request, Response} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from './database.module';
import {PortfolioModule} from './portfolio/portfolio.module';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import {AuthModule} from './auth.module';
import { ManufacturerProvider } from 'portfolio/portfolio.provider';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';

@Module({
  imports: [ GraphQLModule, DatabaseModule, PortfolioModule],
  components: [],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule implements NestModule{
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer){
    const secret = '4wsdfsadf654sdf64sadf654';

    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    consumer
    .apply(cors({origin: 'http://localhost:3000'})).forRoutes('/graphql')
    .apply(AuthModule).forRoutes(AppController)
    .apply(graphiqlExpress({ endpointURL: '/graphql' }))
    .forRoutes('/graphiql')
    .apply(graphqlExpress(req => ({ schema,
      rootValue: req,
      context: {
        secret,
        user : req.headers.authentication,
    } })))
    .forRoutes('/graphql')
;
  }
}
