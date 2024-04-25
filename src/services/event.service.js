import models from '../database/models';

const Event = models.Event;

class EventService {
  static async createEvent(data) {
    const { name, description, location, date, time, availableTickets, price } =
      data;
    const existingEvent = await Event.findOne({
      where: { name },
    });
    if (existingEvent) {
      return { message400: 'Event already exists' };
    }
    const event = await Event.create({
      name,
      description,
      location,
      date,
      time,
      availableTickets,
      price,
    });
    return { data: event };
  }
}
export default EventService;
