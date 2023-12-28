module.exports = function walletSchema(sequelize, DataType) {

const Wallet = sequelize.define('Wallet', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    balance: {
        type: DataType.STRING,
        allowNull: true,
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
    },
    userId: {
        type: DataType.INTEGER,   // foreign key
        allowNull: false,
    },
}, {
    timestamps: true,
    underscored: true,
    tableName: 'wallet',
});

Wallet.associate = function mapRelation(models) {
    Wallet.belongsTo(models.User, { foreignKey: 'userId' });
}

return Wallet;
};
// module.exports = { Wallet }
