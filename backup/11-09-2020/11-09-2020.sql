-- Create a stored procedure to verify the user
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpVerifyUser`(adminId INT(3))
BEGIN
	SELECT * FROM `admin` WHERE id = adminId AND delete_status = 0;
END