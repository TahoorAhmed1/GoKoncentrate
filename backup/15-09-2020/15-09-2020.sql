-- Create a stored procedure to update the details of the user.
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateDetails`(adminId INT(3), userName VARCHAR(50), userEmail VARCHAR(60), userImage VARCHAR(255))
BEGIN
	UPDATE `admin` SET `name` = userName, email = userEmail, image = userImage WHERE id = adminId AND delete_status = 0;
END

-- Create a stored procedure to update the password
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdatePassword`(adminId INT(3), adminPassword VARCHAR(255))
BEGIN
	UPDATE `admin` SET `password` = adminPassword WHERE id = adminId AND delete_status = 0;
END