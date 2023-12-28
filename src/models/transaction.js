module.exports = function transactionSchema(sequelize, DataType) {

  const Transaction = sequelize.define(
    "Transaction",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      amount: {
        type: DataType.STRING,
        allowNull: true,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
      },
      transactedTo: {
        type: DataType.STRING,
        allowNull: false,
      },
      userId: {
        type: DataType.INTEGER, // Foreign key
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "transaction",
    }
  );

  Transaction.associate = function mapRelation(models) {
    Transaction.belongsTo(models.User, { foreignKey: "userId" });
    // Transaction.belongsTo(User);
  };
  // Transaction.belongsTo(User, { foreignKey: 'userId' })

  return Transaction;
  // module.exports = { Transaction }
};
