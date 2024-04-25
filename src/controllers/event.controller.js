import model from '../database/models';
import EventService from '../services/event.service';

const { Event, User, Booking } = model;

class EventController {
  static async createEvent(req, res) {
    try {
      const { message400, data } = await EventService.createEvent(req.body);
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
  static async getEvents(req, res) {
    try {
      const events = await Event.findAll({
        where: {
          isAvailable: true,
        },
      });
      return res.status(200).json({
        status: 'success',
        data: events,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async getEvent(req, res) {
    try {
      const { eventId } = req.params;
      const event = await Event.findOne({
        where: { eventId },
      });
      if (!event) {
        return res.status(404).json({
          status: 'fail',
          message: 'Event not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: event,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async updateEvent(req, res) {
    try {
      const { eventId } = req.params;
      const { title, description, location, date, time } = req.body;
      if (title) {
        await Event.update({ title }, { where: { eventId } });
      }
      if (description) {
        await Event.update({ description }, { where: { eventId } });
      }
      if (location) {
        await Event.update({ location }, { where: { eventId } });
      }
      if (date) {
        await Event.update({ date }, { where: { eventId } });
      }
      if (time) {
        await Event.update({ time }, { where: { eventId } });
      }
      const event = await Event.findOne({
        where: { eventId },
      });
      return res.status(200).json({
        status: 'success',
        data: event,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async toggleAvailability(req, res) {
    try {
      const { eventId } = req.params;
      const event = await Event.findOne({ where: { eventId } });
      if (!event) {
        return res.status(404).json({
          status: 'fail',
          message: 'Event not found',
        });
      }
      const updatedEvent = await event.update({ available: !event.available });
      return res.status(200).json({
        status: 'success',
        data: updatedEvent,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async deleteEvent(req, res) {
    try {
      const { eventId } = req.params;
      const event = await Event.findOne({
        where: { eventId },
      });
      if (!event) {
        return res.status(404).json({
          status: 'fail',
          message: 'Event not found',
        });
      }
      await Event.destroy({ where: { eventId } });
      return res.status(200).json({
        status: 'success',
        message: 'Event deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async getEventAttendees(req, res) {
    try {
      const { id } = req.params;
      const event = await Event.findOne({
        where: { eventId: id },
      });
      if (!event) {
        return res.status(404).json({
          status: 'fail',
          message: 'Event not found',
        });
      }
      const bookings = await Booking.findAll({
        where: { eventId: id },
        include: [
          {
            model: User,
            attributes: ['userId', 'firstName', 'lastName', 'email'],
          },
        ],
      });
      const attendees = bookings.map((booking) => booking.user);
      return res.status(200).json({
        status: 'success',
        data: attendees,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
}
export default EventController;
