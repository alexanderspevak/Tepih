import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('Admin', {
            login: {
                type: Sequelize.STRING,
                allowNull: false,
                unique:true
            },
            password:Sequelize.STRING
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('Admin');
    },
};
