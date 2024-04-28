import dotenv from 'dotenv';
import UserService from '../services/user.service';
import bcrypt from 'bcrypt';
import models from '../database/models';
import { Jwt } from '../helpers/jwt';

const { User } = models;
dotenv.config();

class UserController {
  static async register(req, res) {
    try {
      const { data, message400 } = await UserService.register(req.body);
      if (message400) {
        return res.status(400).json({
          status: 'fail',
          message: message400,
        });
      }
      return res.status(201).json({
        status: 'success',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async login(req, res) {
    try {
      const { identifier, password } = req.body;
      let user;
      if (!isNaN(identifier)) {
        user = await User.findOne({
          where: { phoneNumber: identifier },
        });
      } else {
        user = await User.findOne({
          where: { email: identifier },
        });
      }
      if (!user) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'Account does not exist' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Incorrect Credentials' });
      }
      const token = Jwt.generateToken({
        phoneNumber: user.phoneNumber,
        userId: user.userId,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      const decodedToken = Jwt.verifyToken(token);
      const { exp } = decodedToken.value;
      const expInMilliseconds = exp * 1000;
      const expirationDate = new Date(expInMilliseconds);
      const formattedExpiration = expirationDate.toLocaleString();
      return res.status(200).json({
        status: 'success',
        data: {
          identifier: identifier,
          token,
          user,
          expiration: formattedExpiration,
          message: 'Login Successful',
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async getProfile(req, res) {
    try {
      const { userId } = req.user;
      const user = await User.findOne({
        where: { userId },
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async changePassword(req, res) {
    try {
      const { userId } = req.user;
      const { oldPassword, newPassword } = req.body;
      const user = await User.findOne({
        where: { userId },
      });
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Incorrect Password' });
      }
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return res.status(400).json({
          status: 'fail',
          message: 'New password cannot be the same as the old password',
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update({ password: hashedPassword }, { where: { userId } });
      return res.status(200).json({
        status: 'success',
        message: 'Password Updated Successfully',
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async getUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({
        where: { userId },
        attributes: { exclude: ['password'] },
      });
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async updateProfile(req, res) {
    try {
      const { userId } = req.user;
      const { firstName, lastName, email, phoneNumber } = req.body;
      if (lastName) {
        await User.update({ lastName }, { where: { userId } });
      }
      if (firstName) {
        await User.update({ firstName }, { where: { userId } });
      }
      if (email) {
        await User.update({ email }, { where: { userId } });
      }
      if (phoneNumber) {
        await User.update({ phoneNumber }, { where: { userId } });
      }
      const user = await User.findOne({
        where: { userId },
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({
        where: { userId },
      });
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }
      await User.destroy({ where: { userId } });
      return res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { firstName, lastName, email, phoneNumber } = req.body;
      await User.update(
        { firstName, lastName, email, phoneNumber },
        { where: { userId } },
      );
      const user = await User.findOne({
        where: { userId },
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }
}
export default UserController;
