/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
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
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'email'
		},
		email_otp: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'email_otp'
		},
		password: {
			type: DataTypes.STRING(200),
			allowNull: true,
			field: 'password',
			defaultValue:''
		},
		is_verified:{
			type: DataTypes.INTEGER(1),
			allowNull:true,
			field:'is_verified',
			defaultValue:0
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image'
		},
		fb_id:{
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'fb_id',
			defaultValue:''
		},
		google_id:{
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'google_id',
			defaultValue:''
		},
		apple_id:{
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'apple_id',
			defaultValue:''
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'address'
		},
		subscription: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'subscription'
		},
		subscription_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'subscription_id'
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
		gender: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'gender'
		},
		age: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'age'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
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
		tableName: 'users'
	});
};
