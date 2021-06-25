const Sequalize = require('sequelize');
const _ = require('lodash');

const sequelize = require('../config/database');

const userinfo = sequelize.define('userinfo', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: Sequalize.STRING,
    password: Sequalize.STRING,
    mobile: Sequalize.BIGINT,
    emailId: Sequalize.INTEGER


    });

module.exports = userinfo;