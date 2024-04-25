export default function checkRole(role) {
  return (req, res, next) => {
    try {
      const { role: userRole } = req.user;
      if (userRole !== role) {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden: You do not have the required role',
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: err.message,
      });
    }
  };
}