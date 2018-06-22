"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
exports.databaseProvider = {
    provide: 'SequelizeInstance',
    useFactory: () => {
        const sequelize = new sequelize_typescript_1.Sequelize({
            username: 'alexandr',
            password: 'foxmedia',
            database: 'tepih',
            host: '127.0.0.1',
            dialect: 'postgres',
        });
        sequelize.addModels([
            models_1.Customer,
            models_1.Manufacturer,
            models_1.OrderItem,
            models_1.Order,
            models_1.Product,
        ]);
        return sequelize;
    },
};
//# sourceMappingURL=database.provider.js.map