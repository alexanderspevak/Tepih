"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Order_items', 'product_id', {
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Order_items', 'product_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
                as: 'product_id',
            },
        });
    },
};
//# sourceMappingURL=20180604000000-add-cascade-orderItem.js.map