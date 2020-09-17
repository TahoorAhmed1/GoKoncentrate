-- Create a stored procedure to save the magazine brand
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpSaveMagazineBrand`(brandName VARCHAR(100), brandImage VARCHAR(255))
BEGIN
	INSERT INTO magazines_brand(`name`, image) VALUES (brandName, brandImage);
END

-------------------------------------------------------

