import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('Customers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            surname: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('Customers');
    },
};
