import express from 'express';
import EventController from '../controllers/event.controller';
import isAuthenticated from '../helpers/verifyToken';
import checkRole from '../middlewares/checkRole';
import eventValidate from '../middlewares/event.validate';
import upload from '../helpers/multer';

const router = express.Router();
router.post(
  '/create',
  isAuthenticated,
  checkRole('admin'),
  upload.single('image'),
  eventValidate,
  EventController.createEvent,
);
router.get('/all', EventController.getEvents);
router.get('/single/:eventId', EventController.getEvent);
router.put(
  '/update/:eventId',
  isAuthenticated,
  checkRole('admin'),
  EventController.updateEvent,
);
router.delete(
  '/delete/:eventId',
  isAuthenticated,
  checkRole('admin'),
  EventController.deleteEvent,
);
router.get(
  '/attendees/:id',
  isAuthenticated,
  checkRole('admin'),
  EventController.getEventAttendees,
);
export default router;
