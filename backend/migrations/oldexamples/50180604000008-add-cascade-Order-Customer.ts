import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.changeColumn(
            'Orders',
            'customer_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'cascade',
                references: {
                    model: 'Customers',
                    key: 'id',
                    as: 'customer_id',
                },
                });
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.changeColumn(
            'Orders',
            'customer_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Customers',
                    key: 'id',
                    as: 'customer_id',
                },
            });
        },
};
