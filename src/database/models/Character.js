module.exports = (sequelize, dataTypes) => {
    let alias = "Character";
    let cols = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: dataTypes.INTEGER(11),
        },
       
        name: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        age: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        weight: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        history: {
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
        tableName: "characters",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    }

    const Character = sequelize.define(alias, cols, config);
    Character.associate = (models) => {
        Character.belongsToMany(models.Movie, {
            through: "MovieCharacter" 
        })
    }
    return Character
}