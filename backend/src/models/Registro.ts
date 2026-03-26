import { Model } from 'sequelize';

//classe abstrata
export default abstract class Registro extends Model {
    declare id: number;
    declare titulo: string;
    declare thumb: string | null;
    declare galeria: string | null;
}