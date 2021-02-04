/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('musicPageAudio', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		musicId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'music_id'
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
		tableName: 'music_page_audio'
	});
};
