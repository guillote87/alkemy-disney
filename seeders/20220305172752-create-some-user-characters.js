'use strict';

const { User } = require('../database/models/User')
const bcrypt = require('bcrypt')
const authConfig = require('../database/config/auth');
const Personaje = require('../database/models/Personaje');
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      User.create(
        {
          name: "Guillermo",
          email: "guillermo27@gmail.com",
          password: bcrypt.hashSync("123456", +authConfig.rounds)
        }),
      User.create(
        {

          name: "Jesica",
          email: "jesicacomas@hotmail.com.ar",
          password: bcrypt.hashSync("123456", +authConfig.rounds)

        }),

      Personaje.create(
        {
          nombre: "Pato Donald",
          edad: 2,
          peso: 15,
          historia: "Se creo en el año 1984",
          image: "patoDonald.jpg"
        }
      ),
      Personaje.create(
        {
          nombre: "Mickey Mouse",
          edad: 2,
          peso: 15,
          historia: "El raton mas famoso del mundo",
          image: "mickey.jpg"
        })

    ]
    )
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('personajes', null, {}),
      queryInterface.bulkDelete('usuarios', null, {})
    ])
    
    
    
  }
};
