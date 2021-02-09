/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('videoPage', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		adId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'ad_id'
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'title'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name'
		},
        image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image'
        },
        video: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'video'
		},
		content: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'content'
        },
        videoLink: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'video_link'
		},
		magazineId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'magazine_id'
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
        tableName: 'video_page',
      //  timestamps:false
	});
};
