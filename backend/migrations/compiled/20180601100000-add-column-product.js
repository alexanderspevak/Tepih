"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Products', 'name', Sequelize.STRING);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Products', 'name');
    }
};
