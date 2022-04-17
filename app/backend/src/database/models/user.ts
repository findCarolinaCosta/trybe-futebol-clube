import { DataTypes, Model } from 'sequelize';
import db from '.';

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

class User extends Model<IUser> implements IUser {
  id: number;

  username: string;

  role: string;

  email: string;

  password: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
