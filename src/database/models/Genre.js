module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        image:{
            type: dataTypes.STRING(50),
            allowNull: false,
        }
    };
    let config = {
        tableName: "genres",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    }
    const Genre = sequelize.define(alias, cols, config);
        Genre.associate = (models)=>{
            Genre.belongsToMany(models.Movie,{
                through : "MovieGenre"
            })
    }
    return Genre
}