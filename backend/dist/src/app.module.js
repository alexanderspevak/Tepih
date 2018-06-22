"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database.module");
const portfolio_module_1 = require("./portfolio/portfolio.module");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("@nestjs/graphql");
const cors = require("cors");
let AppModule = class AppModule {
    constructor(graphQLFactory) {
        this.graphQLFactory = graphQLFactory;
    }
    configure(consumer) {
        const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
        const schema = this.graphQLFactory.createSchema({ typeDefs });
        consumer
            .apply(cors({ origin: 'http://localhost:3000' })).forRoutes('/graphql')
            .apply(apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }))
            .forRoutes('/graphiql')
            .apply(apollo_server_express_1.graphqlExpress(req => ({ schema, rootValue: req })))
            .forRoutes('/graphql');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [graphql_1.GraphQLModule, database_module_1.DatabaseModule, portfolio_module_1.PortfolioModule],
        components: [],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [graphql_1.GraphQLFactory])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map