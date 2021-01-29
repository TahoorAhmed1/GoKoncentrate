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
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'title'
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