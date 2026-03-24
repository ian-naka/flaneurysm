import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/conn';

//estrutura da tabela user
class User extends Model {
  declare id: number;
  declare nome: string;
  declare email: string;
  declare senha: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', //nome da tabela no banco
  }
);

export default User;