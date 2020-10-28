/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('magazineAnalytics', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		magazineId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'magazine_id'
        },
        userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'user_id'
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
        tableName: 'magazine_analytics',
        timestamps:false
	});
};
