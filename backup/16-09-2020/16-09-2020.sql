-- CREATE A TABLE For magazines Brand
CREATE TABLE magazines_brand(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	delete_status BOOLEAN DEFAULT FALSE,
	`status` BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP    
    
);

-- Create a table for plans
CREATE TABLE plans(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
    monthly_price INT(3),
    yearly_price INT(3),
    monthly_id INT(3) DEFAULT 1,
    yearly_id INT(3) DEFAULT 12,
	delete_status BOOLEAN DEFAULT FALSE,
	`status` BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP    
    
);

-- Create a table for subscription
CREATE TABLE subscriptions(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT(3) NOT NULL,
    plan_id INT(3) NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    active_time_id INT(3),
	delete_status BOOLEAN DEFAULT FALSE,
	`status` BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,    
    CONSTRAINT FK_PLAN_ID FOREIGN KEY(plan_id) REFERENCES plans(id)
);

-- Create a table for users
CREATE TABLE users(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    image VARCHAR(255),
    subscription BOOLEAN DEFAULT FALSE,
    subscription_id INT(3) NOT NULL,
	delete_status BOOLEAN DEFAULT FALSE,
	`status` BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,    
    CONSTRAINT FK_SUBSCRIPTION_ID FOREIGN KEY(subscription_id) REFERENCES subscriptions(id)
);

-- Add a forign key in subscriptions table for user_id
ALTER TABLE subscriptions
ADD CONSTRAINT FK_USER_ID FOREIGN KEY(user_id) REFERENCES users(id);

-- Create a table of magazine
CREATE TABLE magazines(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	brand_id INT(3) NOT NULL,
	delete_status BOOLEAN DEFAULT FALSE,
	`status` BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP     
);

-- Alter table magazines
ALTER TABLE magazines
ADD CONSTRAINT FK_BRAND_ID FOREIGN KEY(brand_id) REFERENCES magazines_brand(id);

--ALter table magazines
ALTER TABLE magazines
ADD COLUMN image VARCHAR(255);

-- Create a stored procedure to fetch the dashboard data
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchDashboardData`()
BEGIN
	DECLARE total_users INT(3);
    DECLARE total_magazines INT(3);
    DECLARE total_magazines_brand INT(3);
	SELECT (SELECT COUNT(*) FROM users WHERE delete_status = 0) INTO total_users;
    SELECT (SELECT COUNT(*) FROM magazines WHERE delete_status = 0) INTO total_magazines;
    SELECT (SELECT COUNT(*) FROM magazines_brand WHERE delete_status = 0) INTO total_magazines_brand;
    SELECT total_users, total_magazines, total_magazines_brand;
END

-- Create a stored procedure to fetch the Magazines Brands
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchMagazinesBrand`()
BEGIN
	SELECT * FROM magazines_brand WHERE delete_status = 0;
END

-- Alter table Magazines Brand
ALTER TABLE magazines_brand
ADD COLUMN image VARCHAR(255);

-- Create a stored procedure to fetch details by ID
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchDetailsById`(fetchId INT(3), tbl VARCHAR(255))
BEGIN
	IF tbl = 'magazines_brand' THEN
		SELECT * FROM magazines_brand WHERE id = fetchId AND delete_status = 0;
	ELSEIF tbl = 'users' THEN
		SELECT * FROM users WHERE id = fetchId AND delete_status = 0;
	ELSEIF tbl = 'magazines' THEN
		SELECT * FROM magazines WHERE id = fetchId AND delete_status = 0;
    END IF;
END

-- Create a stored procedure to update the magazines brand details
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateMagazineBrand`(brandId INT(3), brandName VARCHAR(100), brandImage VARCHAR(255))
BEGIN
	UPDATE magazines_brand SET `name` = brandName, image = brandImage WHERE id = brandId AND delete_status = 0;
END

-- Create a stored procedure to Delete data
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpDeleteData`(dataId INT(3), tbl VARCHAR(255))
BEGIN
	IF tbl = 'magazines_brand' THEN
		UPDATE magazines_brand SET delete_status = 1 WHERE id = dataId;
	ELSEIF tbl = 'users' THEN
		UPDATE users SET delete_status = 1 WHERE id = dataId;
	ELSEIF tbl = 'magazines' THEN
		UPDATE magazines SET delete_status = 1 WHERE id = dataId;
    END IF;
END

-- Create a stored procedure to fetch the magazines by its brand
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchMagazinesByBrandId`(brandId INT(3))
BEGIN
	SELECT * FROM magazines WHERE brand_id = brandId AND delete_status = 0;
END

-- Create a stored procedure to update the status
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateStatus`(dataId INT(3), tbl VARCHAR(255))
BEGIN
	DECLARE data_status INT(3);
	IF tbl = 'magazines_brand' THEN
		SELECT `status` FROM magazines_brand WHERE id = dataId INTO data_status;
        IF data_status = 1 THEN
			UPDATE magazines_brand SET `status` = 0 WHERE id = dataId;
		ELSE
			UPDATE magazines_brand SET `status` = 1 WHERE id = dataId;
        END IF;
        SELECT `status` FROM magazines_brand WHERE id = dataId INTO data_status;
	ELSEIF tbl = 'users' THEN
		SELECT `status` FROM users WHERE id = dataId INTO data_status;
        IF data_status = 1 THEN
			UPDATE users SET `status` = 0 WHERE id = dataId;
		ELSE
			UPDATE users SET `status` = 1 WHERE id = dataId;
        END IF;
        SELECT `status` FROM users WHERE id = dataId INTO data_status;
	ELSEIF tbl = 'magazines' THEN
		SELECT `status` FROM magazines WHERE id = dataId INTO data_status;
        IF data_status = 1 THEN
			UPDATE magazines SET `status` = 0 WHERE id = dataId;
		ELSE
			UPDATE magazines SET `status` = 1 WHERE id = dataId;
        END IF;
        SELECT `status` FROM magazines WHERE id = dataId INTO data_status;
	END IF;
    SELECT data_status;
END