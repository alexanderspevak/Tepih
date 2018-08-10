import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.changeColumn(
            'Order_items',
            'order_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'cascade',
                references: {
                    model: 'Orders',
                    key: 'id',
                    as: 'order_id',
                },
                });
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.changeColumn(
            'Order_items',
            'order_id',
             {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Orders',
                    key: 'id',
                    as: 'order_id',
                },
            });
        },
};
