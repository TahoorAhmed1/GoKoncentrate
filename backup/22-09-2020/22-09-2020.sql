-- Create a stored procedure to fetch the magazines
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchMagazines`()
BEGIN
	SELECT * FROM magazines WHERE delete_status = 0 ORDER BY id;
END -- DONE

-- Create a stored procedure to insert the magazine
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpSaveMagazine`(magazineName VARCHAR(100), magazineImage VARCHAR(255), brandId INT(3))
BEGIN
	INSERT INTO magazines(name, image, brand_id) VALUES (magazineName, magazineImage, brandId);
END -- DONE

-- Create a stored procedure to edit the magazine details
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchMagazineById`(magazineId INT(3))
BEGIN
	SELECT * FROM magazines WHERE id = magazineId AND delete_status = 0;
END -- DONE

-- Create a table for magazine pages.
CREATE TABLE magazine_pages(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    page_no INT(3) NOT NULL,
    order_no INT(3) NOT NULL,
    content TEXT,
    content_type VARCHAR(60),
    magazine_id INT(3) NOT NULL,
    delete_status BOOLEAN default FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_MAGAZINE_ID FOREIGN KEY(magazine_id) REFERENCES magazines(id)
); -- DONE

-- Create a stored procedure to Fetch pages content
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchPagesContent`(magazineId INT(3))
BEGIN
	SELECT * FROM magazine_pages WHERE magazine_id = magazineId AND delete_status = 0 ORDER BY id DESC LIMIT 1;
END -- DONE

-- Create a stored procedure to SpSaveMagazinePage
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpSaveMagazinePage`(magazinePageNo INT(3), magazineOrderNo INT(3), magazineContent TEXT, magazineType VARCHAR(60), magazineId INT(3))
BEGIN
	INSERT INTO magazine_pages(page_no, order_no, content, content_type, magazine_id) VALUES(magazinePageNo, magazineOrderNo, magazineContent, magazineType, magazineId);
END -- DONE

-- Create a stored procedure to save the maagzine details
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateMagazine`(magazineId INT(3), magazineName VARCHAR(100), magazineImage VARCHAR(255), brandId INT(3))
BEGIN
	UPDATE magazines SET name = magazineName, image = magazineImage, brand_id = brandId WHERE id = magazineId AND delete_status = 0;
END -- DONE

-- create a stored procedure to fetch pages by its ID
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchMagazinePageById`(magazineId INT(3))
BEGIN
	SELECT * FROM magazine_pages WHERE magazine_id = magazineId AND delete_status = 0;
END -- DONE