/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('magazineIssues', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		issue_month: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'issue_month'
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image'
        },
        launch_date: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'launch_date'
        },
		magazine_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'magazine_id'
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
        tableName: 'magazine_issues',
        timestamps:false
	});
};
