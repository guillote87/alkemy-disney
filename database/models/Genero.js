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
        tableName: "generos",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    }
    const Genero = sequelize.define(alias, cols, config);
        Genero.associate = (models)=>{
            Genero.belongsToMany(models.Pelicula,{
                through : "PeliculaGenero"
            })
    }
    return Genero
}