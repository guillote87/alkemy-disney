module.exports = (sequelize, dataTypes) => {
    let alias = "User";
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
            validate:{
                isAlpha: {
                    msg: "El nombre solo puede contener caracteres alfanumericos"
                },
                len : {
                    args: [2 , 255],
                    msg: "El nombre debe tener minimo 2 caracteres"
                }
            }
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail:{
                    msg: "El mail debe ser un mail valido"
                }
            }
        },
        password: {
            type: dataTypes.STRING(250),
            allowNull: false,
        },
    
        created_at: dataTypes.DATE,
        updated_at: dataTypes.DATE,
        deleted_at: dataTypes.DATE
    };
    let config = {
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    }
    const User = sequelize.define(alias, cols, config);
  

    return User
}