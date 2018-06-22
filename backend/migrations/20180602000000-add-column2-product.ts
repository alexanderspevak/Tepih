import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.addColumn(
            'Products',
            'price',
            Sequelize.STRING);
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.removeColumn(
            'Products',
            'price',
        );
    },
};
