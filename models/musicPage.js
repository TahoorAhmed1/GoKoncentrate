/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('musicPage', {
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
        artistPhoto: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'artist_photo'
        },
        albumCoverPhoto: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'album_cover_photo'
        },
        music: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'music'
        },
        musicLink: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'music_link'
		},
		artistBio: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'artist_bio'
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
        tableName: 'music_page',
      //  timestamps:false
	});
};
