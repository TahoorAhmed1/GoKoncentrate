-- Create a table of admin
CREATE TABLE admin (
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `status` BOOLEAN DEFAULT FALSE,
    role INT(3) NOT NULL,
    image VARCHAR(255),
    delete_status BOOLEAN DEFAULT FALSE
);

-- Create a stored procedure to check login details
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpCheckLoginDetails`(emaill VARCHAR(60), passwordd VARCHAR(255))
BEGIN
	SELECT * FROM `admin` WHERE email = emaill AND delete_status = 0;
END