import { Model } from 'sequelize';

//classe abstrata
export default abstract class Registro extends Model {
    declare id: number;
    declare titulo: string;
    declare slug: string;
    declare thumb: string | null;
}