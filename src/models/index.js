const fs = require("fs");
const path = require("path");
const dbConfig = require("../configs/db.config");

const { Sequelize } = require("sequelize"); // Updated to destructuring to import Sequelize directly
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
  }
);

const baseName = path.basename(__filename);
const db = {};

// Read all files in the current directory and import models
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== baseName && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    ); // Updated to use `require` and passing Sequelize and the sequelize instance
    db[model.name] = model;
  });

// Set up associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;