"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Products', 'price', Sequelize.STRING);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Products', 'price');
    }
};
