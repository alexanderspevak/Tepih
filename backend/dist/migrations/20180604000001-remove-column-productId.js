"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Order_items', 'product_id');
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Order_items', 'product_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'cascade',
            references: {
                model: 'Products',
                key: 'id',
                as: 'product_id',
            },
        });
    },
};
//# sourceMappingURL=20180604000001-remove-column-productId.js.map