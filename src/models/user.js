module.exports = function userSchema(sequelize, DataType) {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userName: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid Email",
          },
        },
      },
      mobile: {
        type: DataType.STRING,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      token: {
        type: DataType.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "user",
    }
  );

  User.associate = function mapRelation(models) {
    User.hasMany(models.Transaction, { foreignKey: "userId" });
    User.hasOne(models.Wallet, { foreignKey: "userId" });
  };
  return User;
};
