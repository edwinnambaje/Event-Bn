import express from 'express';
import users from './user';
import events from './event';
import bookings from './booking';

const routes = express();

routes.use('/api/v1/user', users);
routes.use('/api/v1/event', events)
routes.use('/api/v1/booking', bookings)

export default routes;
