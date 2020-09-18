-- Create a stored procedure to save the magazine brand
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpSaveMagazineBrand`(brandName VARCHAR(100), brandImage VARCHAR(255))
BEGIN
	INSERT INTO magazines_brand(`name`, image) VALUES (brandName, brandImage);
END

-------------------------------------------------------

-- Create a stored procedure to view the users
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpViewUsers`()
BEGIN
	SELECT users.*,subscriptions.* FROM users LEFT JOIN subscriptions ON users.subscription_id = subscriptions.id AND users.delete_status = 0;
END --DONE

-- Drop forign key
ALTER TABLE subscriptions
DROP FOREIGN KEY FK_USER_ID; -- DONE

-- Create a stored procedure to update the user.
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateUser`(userId INT(3), userName VARCHAR(100), userEmail VARCHAR(100), userAddress VARCHAR(255), userImage VARCHAR(255))
BEGIN
	UPDATE users SET name = userName, email = userEmail, address = userAddress, image = userImage WHERE id = userId AND delete_status = 0;
END -- DONE

-- Create a stored procedure to fetch the subscriptions of the user by its id.
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchSubscriptions`(userId INT(3))
BEGIN
	SELECT * FROM subscriptions WHERE user_id = userId;
END -- DONE

--Drop column start_date of subscriptions.
ALTER TABLE subscriptions
DROP COLUMN start_date; --DONE

-- Add colum start date of table subscriptions
ALTER TABLE subscriptions
ADD COLUMN start_date TIMESTAMP; --DONE

-- Change datatype pf column start and end date of subscription table from timestamp to date. -- DONE