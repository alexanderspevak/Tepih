"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Products', 'name', Sequelize.STRING);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Products', 'name');
    },
};
//# sourceMappingURL=20180601100000-add-column-product.js.map