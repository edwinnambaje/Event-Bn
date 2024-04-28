import model from '../database/models';

const { Booking, Event, User } = model;

class BookingController {
  static async createBooking(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.user;
      const { tickets } = req.body;
      const event = await Event.findOne({
        where: { eventId: id },
      });
      if (!event) {
        return res.status(404).json({
          status: 'fail',
          message: 'Event not found',
        });
      }
      const existingBooking = await Booking.findOne({
        where: { eventId: id, userId },
      });
      if (existingBooking) {
        return res.status(400).json({
          status: 'fail',
          message: 'You have already booked this event',
        });
      }
      if (tickets > event.availableTickets) {
        return res.status(400).json({
          status: 'fail',
          message: 'Not enough tickets available',
        });
      }
      const { price } = event;
      const totalPrice = price * tickets;
      const booking = await Booking.create({
        userId,
        eventId: id,
        tickets,
        totalPrice,
      });
      event.availableTickets -= tickets;
      await event.save();
      return res.status(201).json({
        status: 'success',
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async findMyBookings(req, res) {
    try {
      const { userId } = req.user;
      const bookings = await Booking.findAll({
        where: { userId },
        include: [Event, User],
      });
      return res.status(200).json({
        status: 'success',
        data: bookings,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async findBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { userId } = req.user;
      const booking = await Booking.findOne({
        where: { bookingId, userId },
      });
      if (!booking) {
        return res.status(404).json({
          status: 'fail',
          message: 'Booking not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async cancelBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { userId } = req.user;
      const booking = await Booking.findOne({
        where: { bookingId, userId },
        include: Event,
      });
      if (!booking) {
        return res.status(404).json({
          status: 'fail',
          message: 'Booking not found',
        });
      }
      const { Event: event, tickets } = booking;
      await Booking.destroy({
        where: { bookingId },
      });
      event.availableTickets += tickets;
      await event.save();
      return res.status(200).json({
        status: 'success',
        message: 'Booking cancelled successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async cancelBookingByAdmin(req, res) {
    try {
      const { bookingId } = req.params;
      const booking = await Booking.findOne({
        where: { bookingId },
        include: Event,
      });
      if (!booking) {
        return res.status(404).json({
          status: 'fail',
          message: 'Booking not found',
        });
      }
      const { Event: event, tickets } = booking;
      await Booking.destroy({
        where: { bookingId },
      });
      event.availableTickets += tickets;
      await event.save();
      return res.status(200).json({
        status: 'success',
        message: 'Booking cancelled successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async updateBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { userId } = req.user;
      const booking = await Booking.findOne({
        where: { bookingId, userId },
      });
      if (!booking) {
        return res.status(404).json({
          status: 'fail',
          message: 'Booking not found',
        });
      }
      const { tickets } = req.body;
      const event = await Event.findOne({
        where: { eventId: booking.eventId },
      });
      if (!event) {
        return res.status(404).json({
          status: 'fail',
          message: 'Event not found',
        });
      }
      if (tickets > event.availableTickets) {
        return res.status(400).json({
          status: 'fail',
          message: 'Not enough tickets available',
        });
      }
      const { price } = event;
      const totalPrice = price * tickets;
      booking.tickets = tickets;
      booking.totalPrice = totalPrice;
      await booking.save();
      return res.status(200).json({
        status: 'success',
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
  static async findAllBookings(req, res) {
    try {
      const bookings = await Booking.findAll({
        include: [Event, User],
      });
      return res.status(200).json({
        status: 'success',
        data: bookings,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default BookingController;
