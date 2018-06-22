"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Order_items', 'product_id');
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Order_items', 'product_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'cascade',
            references: {
                model: 'Products',
                key: 'id',
                as: 'product_id'
            }
        });
    }
};
