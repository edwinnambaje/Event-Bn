import express from 'express';
import UserController from '../controllers/user.controller';
import signupValidate from '../middlewares/signup.validate';
import loginValidate from '../middlewares/login.validate';
import isAuthenticated from '../helpers/verifyToken';
import checkRole from '../middlewares/checkRole';
import passwordValidate from '../middlewares/password.validate';

const router = express.Router();
router.post('/register', signupValidate, UserController.register);
router.post('/login', loginValidate, UserController.login);
router.get('/profile', isAuthenticated, UserController.getProfile);
router.get(
  '/all',
  isAuthenticated,
  checkRole('admin'),
  UserController.getAllUsers,
);
router.get('/:id', isAuthenticated, checkRole('admin'), UserController.getUser);
router.put(
  '/change-password',
  isAuthenticated,
  passwordValidate,
  UserController.changePassword,
);
router.delete(
  '/:id',
  isAuthenticated,
  checkRole('admin'),
  UserController.deleteUser,
);
router.put('/profile', isAuthenticated, UserController.updateProfile);
export default router;
