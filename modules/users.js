const db = require('../models');
const moment = require('moment');

const getOrCreateUser = (userid) => {
  return db.users.findOrCreate({
    where: { userid: userid },
    defaults: { userid: userid, state: "start", name: "" }
  }).then(result => {
    return result[0].get({ plain: true });
  });
}

const getOneUser = (userid) => {
  return db.users.findOne({
    where: { userid }
  }).then(user => {
    return user ? user.get({ plain: true }) : null;
  });
}

const createUser = (userid) => {
  return db.users.create({
    userid,
    state: "start",
    name: ""
  });
}

const updateUser = (userid, data) => {
  return db.users.update(data, {
    where: { userid }
  });
}

const daysTillBirthday = (dob) => {
  const yearsTillToday = moment().diff(moment(dob, 'YYYY-MM-DD'), 'years');
  const nextBirthday = moment(dob, 'YYYY-MM-DD').add(yearsTillToday + 1, 'years').format('YYYY-MM-DD');
  const dayTillBirthday = moment(nextBirthday, 'YYYY-MM-DD').diff(moment(), 'days');
  return dayTillBirthday;
}

module.exports = {
  getOneUser,
  createUser,
  updateUser,
  daysTillBirthday,
  getOrCreateUser
}