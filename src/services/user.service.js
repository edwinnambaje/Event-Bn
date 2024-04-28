import model from '../database/models';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
dotenv.config();

const User = model.User;

class UserService {
  static async register(data) {
    const { username, email, phoneNumber, password } = data;
    const foundUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phoneNumber }],
      },
    });
    if (foundUser) {
      return { message400: 'User already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
    return { data: user };
  }
}
export default UserService;
