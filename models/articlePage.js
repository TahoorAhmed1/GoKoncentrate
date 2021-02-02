/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('articlePage', {
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
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name'
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'title'
		},
		articleDescription: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'article_description'
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
        tableName: 'article_page',
       // timestamps:false
	});
};
