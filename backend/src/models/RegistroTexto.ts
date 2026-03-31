import { DataTypes } from 'sequelize';
import sequelize from '../db/conn';
import Registro from './Registro';

class RegistroTexto extends Registro {
  declare descricao: string;
}

RegistroTexto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    thumb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RegistroTexto',
    tableName: 'registros_textos',
  }
);

export default RegistroTexto;
