import sequelize from "../config/db";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

const User = sequelize.define('User', {
    user_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    profilePictures: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role : {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
},
{
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            user.username = user.username.toLowerCase();
            user.email = user.email.toLowerCase();
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
    },
    beforeUpdate: async (user) => {
        if (user.changed('username')) {
            user.username = user.username.toLowerCase();
        }
        if (user.changed('email')) {
            user.email = user.email.toLowerCase();
        }
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
},
indexes: [
    {
        unique: true,
        fields: ['user_uuid']
    },
    {
        unique: true,
        fields: ['username']
    },
    {
        unique: true,
        fields: ['email']
    },
]
});

user.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

       



user.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export default User;