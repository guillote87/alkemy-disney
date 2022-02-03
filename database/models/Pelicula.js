module.exports = (sequelize, dataTypes) => {
    let alias = "Pelicula";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
        },
        imagen: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        titulo: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        creada: {
            type: dataTypes.INTEGER(20),
            allowNull: false,
        },
        rating:{
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
      

    };
    let config = {
        tableName: "peliculas",
        timestamps: false,
    }
    const Pelicula = sequelize.define(alias, cols, config);

          Pelicula.associate = (models) => {
            Pelicula.belongsToMany(models.Personaje, {
              through: "PeliculaPersonaje" 
          })
    }

    return Pelicula;
}