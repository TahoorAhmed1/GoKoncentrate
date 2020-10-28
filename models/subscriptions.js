/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subscriptions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'user_id'
		},
		plan_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'plan_id'
		},
		end_date: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'end_date'
		},
		active_time_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'active_time_id'
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
        tableName: 'subscriptions',
        timestamps:false
	});
};
