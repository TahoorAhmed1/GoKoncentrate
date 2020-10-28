/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('content', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'content'
		},
		type: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'type'
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'title'
        },
        description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'description'
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
        tableName: 'content',
        timestamps:false
	});
};
