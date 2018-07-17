import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.addColumn(
            'Order_items',
            'ammount',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete:'cascade',
                defaultValue:0,

            })
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.removeColumn(
            'Order_items',
            'ammount',
            
        );
    },
};
