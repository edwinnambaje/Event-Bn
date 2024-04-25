/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Events',
      [
        {
          eventId: 'e84b625d-41ea-4464-9282-1e0a490d1901',
          name: 'Event 1',
          description: 'Description 1',
          date: '2024-12-25',
          time: '17:20:30',
          location: 'Kigali Convention Center',
          availableTickets: 1000,
          price: 4000,
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventId: 'e84b625d-41ea-4464-9282-1e0a490d1902',
          name: 'Event 2',
          description: 'Description 2',
          date: '2024-07-25',
          time: '15:00:00',
          location: 'Kigali Arena',
          availableTickets: 2000,
          price: 2000,
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventId: 'e84b625d-41ea-4464-9282-1e0a490d1903',
          name: 'Event 3',
          description: 'Description 3',
          date: '2024-05-25',
          time: '16:20:30',
          location: 'Kigali Stadium',
          availableTickets: 3000,
          price: 6000,
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Events', null, {});
  },
};
