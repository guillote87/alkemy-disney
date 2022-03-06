'use strict';

const { User } = require('../models')
const { Movie } = require('../models')
const {Character} = require('../models');
const {Genre} = require('../models');

const bcrypt = require('bcrypt')
const authConfig = require('../config/auth');

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

          name: "Walt",
          email: "Walt@disney.com",
          password: bcrypt.hashSync("123456", +authConfig.rounds)

        }),

      //Carga inicial Characters
      Character.create(
        {
          name: "Pato Donald",
          age: 2,
          weight: 15,
          history: "Cuenta la historia que Walt Disney se inspiró en crearlo cuando escuchó al actor Clarence Nash recitar una poesía infantil con voz de pato y lo contrató en un corto protagonizado por Mickey Mouse. Un tiempo después Disney pidió a su equipo de animadores que creara un personaje que se adecuara a la voz.",
          image: "donald.jpg"
        }
      ),
      Character.create(
        {
          name: "Mickey Mouse",
          age: 2,
          weight: 15,
          history: "Creado el 18 de noviembre de 1928, este ratón tiene un origen disputado. La leyenda oficial explica que fue creado por Walt Disney durante un viaje en tren y que su nombre inicial fue Mortimer, pero que cambió a Mickey a petición de su esposa, Lillian.",
          image: "mickey.jpg"
        }),
      Character.create(
        {
          name: "Ariel",
          age: 18,
          weight: 60,
          history: "En las profundidades del mar, vivía una sirenita llamada Ariel. A ella le fascinaba explorar su mundo súbmarino junto con su amigo Flounder, pero soñaba en vivir en la superficie. Ariel siempre estaba en busca de tesoros de humanos.",
          image: "ariel.jpg"
        }),
      Character.create(
        {
          name: "Aladdin",
          age: 18,
          weight: 60,
          history: "Aladdin es un ingenioso joven que vive en una extrema pobreza, y que sueña con casarse con la bella hija del sultán, la princesa Yasmine.",
          image: "alladin.jpg"
        }),
      Character.create(
        {
          name: "Bestia",
          age: 30,
          weight: 160,
          history: "La Bestia es un personaje ficticio que aparece por primera vez en el 30.º largometraje animado de Walt Disney Animation Studios titulado Beauty and the Beast.",
          image: "bestia.jpg"
        }),

      //Carga de Movies

      Movie.create(
        {
          title: "La Bella y la Bestia",
          image: "bellaybestia.jpg",
          created: 1991,
          rating: 3
        }),
      Movie.create(
        {
          title: "Aladdin",
          image: "aladdin.jpg",
          created: 1992,
          rating: 7
        }),
      Movie.create(
        {
          title: "La sirenita",
          image: "sirenita.jpg",
          created: 1989,
          rating: 5
        }),
      Movie.create(
        {
          title: "Chef Donald",
          image: "chefdonald.jpg",
          created: 1941,
          rating: 7
        }),
      Movie.create(
        {
          title: "Los 3 caballeros",
          image: "los3caballeros.jpg",
          created: 1944,
          rating: 4
        }),
      Movie.create(
        {
          title: "Fantasia",
          image: "fantasia.jpg",
          created: 1940,
          rating: 7
        }),

      // Carga de genres

      Genre.create(
        {
          name: "Aventuras",
          image: "aventuras.jpg",
        }),
      Genre.create(
        {
          name: "Deportes",
          image: "deporte.jpg",
        }),
      Genre.create(
        {
          name: "Misterio",
          image: "misterio.jpg",
        }),   
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
