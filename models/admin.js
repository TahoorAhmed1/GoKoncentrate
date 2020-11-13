/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'email'
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'password'
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'status'
		},
		role: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'role'
		},
		module_id: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'module_id'
		},
		magazine_id: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'magazine_id'
		},
		real_password: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'real_password'
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
		tableName: 'admin',
		timestamps:false
	});
};
