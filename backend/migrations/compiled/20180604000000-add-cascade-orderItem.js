"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('Order_items', 'product_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'cascade',
            references: {
                model: 'Products',
                key: 'id',
                as: 'product_id'
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('Order_items', 'product_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
                as: 'product_id'
            }
        });
    }
};
