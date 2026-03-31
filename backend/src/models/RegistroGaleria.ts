import { DataTypes } from 'sequelize';
import sequelize from '../db/conn';
import Registro from './Registro';

class RegistroGaleria extends Registro {
  declare resumo: string;
  declare galeria: string;
}

RegistroGaleria.init(
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
      allowNull: false,
    },
    galeria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RegistroGaleria',
    tableName: 'registros_galerias',
  }
);

export default RegistroGaleria;
