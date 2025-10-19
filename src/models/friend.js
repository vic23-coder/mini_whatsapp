import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const Friend = sequelize.define('Friend', {
    
    
    user_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    friend_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'declined'),
        defaultValue: 'pending',
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'friendId']
        }
    ]
});

export default Friend;