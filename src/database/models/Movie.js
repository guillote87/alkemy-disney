module.exports = (sequelize, dataTypes) => {
    let alias = "Movie";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        created: {
            type: dataTypes.INTEGER(20),
            allowNull: false,
        },
        rating: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },


    };
    let config = {
        tableName: "movies",
        timestamps: false,
    }
    const Movie = sequelize.define(alias, cols, config);
    Movie.associate = (models) => {
        Movie.belongsToMany(models.Genre, {
            through: "MovieGenre"
        })
        Movie.belongsToMany(models.Character, {
            through: "MovieCharacter"
        })
    
    }
return Movie;
}

