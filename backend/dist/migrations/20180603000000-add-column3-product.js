"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Products', 'unit', Sequelize.STRING);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Products', 'unit');
    },
};
//# sourceMappingURL=20180603000000-add-column3-product.js.map