module.exports = function(sequelize, DataTypes) {
    const Sighting = sequelize.define("Sighting", {      
      city: {
          type: DataTypes.STRING,
          allowNull: false
      },
      // specificLocation: {        
      //     type: DataTypes.STRING,
      //           allowNull: false
      // },
      whaleType: {
        type: DataTypes.STRING
      }, 
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false
      },     
      pictureName: {
          type: DataTypes.STRING          
      },
      pictureUrl: {
          type: DataTypes.STRING          
      }
    });

    Sighting.associate = function(models) {
        // We're saying that a Sighting should belong to a User
        // A Sighting can't be created without a User due to the foreign key constraint
        Sighting.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
    };
    return Sighting;
}