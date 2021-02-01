/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('photoPageImages', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		photoPageId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'photo_page_id'
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image'
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
		tableName: 'photo_page_images'
	});
};
