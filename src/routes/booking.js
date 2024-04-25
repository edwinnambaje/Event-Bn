import express from 'express';
import BookingController from '../controllers/booking.controller';
import isAuthenticated from '../helpers/verifyToken';
import checkRole from '../middlewares/checkRole';

const router = express.Router();

router.post('/create/:id', isAuthenticated, BookingController.createBooking);
router.get(
  '/single/:bookingId',
  isAuthenticated,
  BookingController.findBooking,
);
router.delete(
  '/delete/:bookingId',
  isAuthenticated,
  BookingController.cancelBooking,
);
router.get('/mybookings', isAuthenticated, BookingController.findMyBookings);
router.put(
  '/update/:bookingId',
  isAuthenticated,
  BookingController.updateBooking,
);
router.get(
  '/all',
  isAuthenticated,
  checkRole('admin'),
  BookingController.findAllBookings,
);

export default router;
