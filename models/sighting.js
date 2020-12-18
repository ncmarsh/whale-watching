module.exports = function(sequelize, DataTypes) {
    const Sighting = sequelize.define("Sighting", {      
      city: {
          type: DataTypes.STRING,
          allowNull: false
      },
      specificLocation: {
        // type: DataTypes.GEOMETRY('POINT'),
          type: DataTypes.STRING,
                allowNull: false
      },
      // lat: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false
      // },
      // lng: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false
      // },
      whaleType: {
          type: DataTypes.STRING
      },      
      description: {
          type: DataTypes.TEXT,
          allowNull: false
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