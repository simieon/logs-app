'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tbl_roles',
      [
        {
          id: 1,
          name: 'superadmin'
        },
        {
          id: 2,
          name: 'admin',
        },
        {
          id: 3,
          name: 'user',
        }
      ],
      {}
    )
    const hashedPassword = await bcrypt.hash('adminadmin', 12)
    await queryInterface.bulkInsert(
      'tbl_users',
      [
        {
          id: 1,
          name: 'admin',
          email: 'admin@doofenschmirtz.inc',
          password: hashedPassword,
        },
      ],
      {}
    )
    await queryInterface.bulkInsert(
      'tbl_user_roles',
      [
        {
          id: 1,
          user_id: 1,
          role_id: 1,
        }, 
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_user_roles', null, {});

    await queryInterface.bulkDelete('tbl_users', null, {});

    await queryInterface.bulkDelete('tbl_roles', null, {});
  }
};
