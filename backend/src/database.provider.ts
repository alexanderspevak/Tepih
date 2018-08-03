import { Sequelize } from 'sequelize-typescript';
import { connection } from 'common';
import {
    Customer,
    Manufacturer,
    OrderItem,
    Order,
    Product,
} from '../models';

export const databaseProvider = {
    provide: 'SequelizeInstance',
    useFactory: () => {

        const sequelize = new Sequelize({
            username: 'alexander',
            password: 'foxmedia',
            database: 'tepih',
            host: '127.0.0.1',
            dialect: 'postgres',
          });
        sequelize.addModels([
            Customer,
            Manufacturer,
            OrderItem,
            Order,
            Product,
          ]);

        // sequelize.sync({ force: false });
        return sequelize;
    },
};
