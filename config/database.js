const Sequalize = require('sequelize');

const sequelize = new Sequalize(process.env.DB_NAME,process.env.USERNAME,process.env.PASSWORD,
  {

    dialect: 'mssql',
    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true,
     // timestamps: false
    
  
  },
    logging: true,
    host: process.env.SQL_URI,
    dialectOptions: {
      options: {
        connectTimeout: 800000,
        requestTimeout: 800000,
        cancelTimeout: 800000
      }
    },
    pool: {
      max: 100,
      min: 0,
      acquire: 100 * 1000,
      idle: 900000,
      maxIdleTime: 800000
    },
    define:{
 freezeTableName: true

    }
  });


module.exports = sequelize;

