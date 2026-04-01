import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/conn';

//model singleton para armazenar as configurações dinâmicas da Dashboard
class DashboardConfig extends Model {
  declare id: number;
  declare heroTitulo: string;
  declare heroSubtitulo: string;
  declare heroImagem: string | null;
  declare highlightTitulo: string;
  declare highlightImagem: string | null;
  declare card1Titulo: string;
  declare card1Imagem: string | null;
  declare card2Titulo: string;
  declare card2Imagem: string | null;
}

DashboardConfig.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    heroTitulo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'TEXTO EM DESTAQUE',
    },
    heroSubtitulo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'subtitulo, descrição, data, bla bla bla',
    },
    heroImagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    highlightTitulo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'GRUPO DE FOTOS EM DESTAQUE',
    },
    highlightImagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card1Titulo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'TEXTO EM DESTAQUE MENOR 1',
    },
    card1Imagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card2Titulo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'TEXTO EM DESTAQUE MENOR 2',
    },
    card2Imagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'DashboardConfig',
    tableName: 'dashboard_config',
  }
);

export default DashboardConfig;
