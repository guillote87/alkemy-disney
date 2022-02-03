module.exports = (sequelize, dataTypes) => {
    let alias = "Genero";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        image:{
            type: dataTypes.STRING(50),
            allowNull: false,
        }
    };
    let config = {
        tableName: "genero",
        timestamps: false,
    }
    const Genero = sequelize.define(alias, cols, config);

    Genero.associate = (models) => {
        Genero.hasMany(models.Pelicula, {
            as: 'pelicula',
             foreignKey: 'genero'
          
        })
    }

    return Genero;
}