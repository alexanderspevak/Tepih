import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.changeColumn(
            'Products',
            'manufacturer_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'cascade',
                references: {
                    model: 'Manufacturers',
                    key: 'id',
                    as: 'manufacturer_id',
                },
                });
        },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.changeColumn(
            'Products',
            'manufacturer_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Manufacturers',
                    key: 'id',
                    as: 'manufacturer_id',
                },
            });
        },
};
