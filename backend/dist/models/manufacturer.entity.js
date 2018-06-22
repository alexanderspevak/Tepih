"use strict";
module.exports = (sequelize, DataTypes) => {
    var manufacturer = sequelize.define('manufacturer', {
        name: DataTypes.STRING
    });
    manufacturer.associate = function (models) {
    };
    return manufacturer;
};
//# sourceMappingURL=manufacturer.entity.js.map