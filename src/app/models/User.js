module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        nome : DataTypes.STRING,
        email : DataTypes.STRING,
        password_hash : DataTypes.STRING,
    });

    return User;
};