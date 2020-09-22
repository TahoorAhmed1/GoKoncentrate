-- Create a table of content for privacy policy, terms and conditions
    CREATE TABLE content(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	type INT(1) NOT NULL,
	content TEXT,
	title VARCHAR(255),
	description TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP    
); -- DONE

-- Create a stored procedure to view the privacy policy
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchPrivacyPolicy`()
BEGIN
	SELECT * FROM content WHERE `type` = 2;
END -- DONE

-- Create a stored procedure to update the privacy policy
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePrivacyPolicy`(privacyPolicy TEXT)
BEGIN
	UPDATE content SET content = privacyPolicy WHERE `type` = 2;
END -- DONE

-- Create a stored procedure to fetch the contents.
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchContents`(contentType INT(1))
BEGIN
	SELECT * FROM content WHERE `type` = contentType;
END-- DONE

-- Create a stored procedure to update the terms and conditions.
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateTermsAndConditions`(termsContent TEXT)
BEGIN
	UPDATE content SET content = termsContent WHERE `type` = 1;
END -- DONE

-- Create a stored procedure to update the About us
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpupdateAboutUs`(aboutusContent TEXT)
BEGIN
	UPDATE content SET content = aboutusContent WHERE `type` = 3;
END -- DONE

-- Create a stored procedure to fetch the all users.
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpViewOnlyUsersData`()
BEGIN
	SELECT * FROM users WHERE delete_status = 0;
END -- DONE