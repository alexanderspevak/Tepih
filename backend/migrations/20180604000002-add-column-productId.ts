import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.addColumn(
            'Order_items',
            'product_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete:'cascade',
                defaultValue:1,
                references: {
                    model: 'Products',
                    key: 'id',
                    as: 'product_id',
                },
            })
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.removeColumn(
            'Order_items',
            'product_id',
            
        );
    },
};
