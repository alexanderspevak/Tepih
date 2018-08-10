import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.addColumn(
            'Order_items',
            'amount',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'cascade',
                defaultValue: 0,

            });
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.removeColumn(
            'Order_items',
            'amount',
        );
    },
};
