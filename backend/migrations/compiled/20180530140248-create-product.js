"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            manufacturer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Manufacturers',
                    key: 'id',
                    as: 'manufacturer_id'
                }
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            size: {
                type: Sequelize.STRING,
                allowNull: true
            },
            color: {
                type: Sequelize.STRING,
                allowNull: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            pic: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Products');
    }
};
