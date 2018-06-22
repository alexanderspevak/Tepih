"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            manufacturer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Manufacturer',
                    key: 'id',
                    as: 'manufacturer_id',
                },
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            size: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            color: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            pic: {
                type: Sequelize.STRING,
                allowNull: true,
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Products');
    },
};
//# sourceMappingURL=20180530150248-create-product.js.map