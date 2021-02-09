/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ads', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		subAdminId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'sub_admin_id'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'status'
		},
		video: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'video'
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
		price: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'price'
		},
		advertiserType: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'advertiser_type'
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'content'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at'
		}
	}, {
		tableName: 'ads'
	});
};
