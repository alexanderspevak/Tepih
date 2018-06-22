"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Products', 'price', Sequelize.STRING);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Products', 'price');
    },
};
//# sourceMappingURL=20180602000000-add-column2-product.js.map