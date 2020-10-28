/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('magazinesBrand', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name'
        },
        image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image'
		},
		delete_status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'delete_status'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'status'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updateAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'update_at'
		}
	}, {
        tableName: 'magazines_brand',
        timestamps:false
	});
};
