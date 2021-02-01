/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('photoPage', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'title'
		},
		magazineId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'magazine_id'
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image'
		},
		pageNo: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'page_no'
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
		tableName: 'photo_page'
	});
};
