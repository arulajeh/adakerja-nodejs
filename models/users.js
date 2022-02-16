module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        userid: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            trim: true
        },
        state: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.DATEONLY
        },
    });
    return Users;
};