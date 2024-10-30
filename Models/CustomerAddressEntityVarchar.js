const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustomerAddressEntityVarchar', {
    value_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Value ID"
    },
    attribute_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "Attribute ID",
      references: {
        model: 'eav_attribute',
        key: 'attribute_id'
      }
    },
    entity_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "Entity ID",
      references: {
        model: 'customer_address_entity',
        key: 'entity_id'
      }
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Value"
    }
  }, {
    sequelize,
    tableName: 'customer_address_entity_varchar',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "value_id" },
        ]
      },
      {
        name: "CUSTOMER_ADDRESS_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "entity_id" },
          { name: "attribute_id" },
        ]
      },
      {
        name: "CUSTOMER_ADDRESS_ENTITY_VARCHAR_ATTRIBUTE_ID",
        using: "BTREE",
        fields: [
          { name: "attribute_id" },
        ]
      },
      {
        name: "CUSTOMER_ADDRESS_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_VALUE",
        using: "BTREE",
        fields: [
          { name: "entity_id" },
          { name: "attribute_id" },
          { name: "value" },
        ]
      },
    ]
  });
};
