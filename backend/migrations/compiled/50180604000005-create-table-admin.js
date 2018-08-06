module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Admin', {
            login: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: Sequelize.STRING
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Admin');
    }
};
