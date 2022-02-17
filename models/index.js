const config = require('../config/config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users")(sequelize, Sequelize);
db.chat_histories = require("./chat_histories")(sequelize, Sequelize);
db.users.hasMany(db.chat_histories, { foreignKey: 'userid' });
db.chat_histories.belongsTo(db.users, { foreignKey: 'userid' });
module.exports = db;