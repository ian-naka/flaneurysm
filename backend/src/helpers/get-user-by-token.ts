// helpers/getUserByToken.ts
import jwt from 'jsonwebtoken';
import User from '../models/User';

const getUserByToken = async (token: string) => {
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        const userId = decoded.id;
        const user = await User.findByPk(userId);

        return user;
    } catch (error) {
        return null;
    }
}

export default getUserByToken;