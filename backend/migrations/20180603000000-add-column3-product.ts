import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.addColumn(
            'Products',
            'unit',
            Sequelize.STRING);
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.removeColumn(
            'Products',
            'unit',
        );
    },
};
