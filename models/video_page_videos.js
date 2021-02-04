/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('videoPageVideos', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		videoPageId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'video_page_id'
		},
		video: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'video'
		},
		videoLink: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'video_link'
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
		tableName: 'video_page_videos'
	});
};
