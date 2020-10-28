/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userVisit', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		magazine_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'magazine_id'
        },
        user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'user_id'
		},
		page_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'page_id'
		},
		time_spent: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'time_spent'
        },
		created: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'created'
		},
		updated: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'updated'
		}
	}, {
        tableName: 'user_visit',
        timestamps:false
	});
};
