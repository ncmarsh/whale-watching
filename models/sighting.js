module.exports = function(sequelize, DataTypes) {
    const Sighting = sequelize.define("Sighting", {
      
      city: {
          type: DataTypes.STRING,
          allowNull: false
      },
      specificLocation: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.TEXT,
          allowNull: false
      }
    });
    return Sighting;
}