module.exports = (sequelize, Sequelize) => {
  const Chat_histories = sequelize.define("chat_histories", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return Chat_histories;
};