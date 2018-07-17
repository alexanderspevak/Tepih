"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Order_items', 'ammount', {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'cascade',
            defaultValue: 0
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Order_items', 'ammount');
    }
};
