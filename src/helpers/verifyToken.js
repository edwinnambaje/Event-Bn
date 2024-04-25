import { User } from '../database/models';
import { Jwt } from './jwt';

async function isAuthenticated(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'Missing Authentication Token' });
    }
    const token = authorization.split(' ')[1];
    try {
      const decodedToken = Jwt.verifyToken(token);
      const { email } = decodedToken.value;
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'User not found' });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        status: 'fail',
        message: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', error: error.message });
  }
}

export default isAuthenticated;
