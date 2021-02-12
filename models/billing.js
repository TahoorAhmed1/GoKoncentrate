/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('billing', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		magazineBrandId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'magazine_brand_id'
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'user_id'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'status'
		},
		planType: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'plan_type'
		},
		paymentType: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'payment_type'
		},
		paymentStartDate: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'payment_start_date'
		},
		nextPaymentDate: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'next_payment_date'
		},
		price: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'price'
		},
		cardNumber: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'card_number'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'updated_at'
		}
	}, {
		tableName: 'billing'
	});
};
