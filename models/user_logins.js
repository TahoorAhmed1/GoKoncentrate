/* jshint indent: 1 */

/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_logins', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'user_id'
        },
        auth_token: {
            type: DataTypes.TEXT(),
            allowNull: true,
            field: 'auth_token'
        },
        device_type: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            field: 'device_type',
            comment: '1: Android, 0: Ios',
            defaultValue:0

        },
        device_token: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: 'device_token',
            defaultValue:''
        },
        logged_out: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            field: 'logged_out',
            comment: "1: Yes, 0:No"
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        tableName:'user_logins',
        timestamps: false,
        underscored: true
    });
};
