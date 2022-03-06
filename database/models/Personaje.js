module.exports = (sequelize, dataTypes) => {
    let alias = "Personaje";
    let cols = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: dataTypes.INTEGER(11),
        },
       
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        edad: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        peso: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        historia: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
      
        created_at: dataTypes.DATE,
        updated_at: dataTypes.DATE,
        deleted_at: dataTypes.DATE
    };
    let config = {
        tableName: "personajes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    }

    const Personaje = sequelize.define(alias, cols, config);
    Personaje.associate = (models) => {
        Personaje.belongsToMany(models.Pelicula, {
            through: "PeliculaPersonaje" 
        })
    }
    return Personaje
}