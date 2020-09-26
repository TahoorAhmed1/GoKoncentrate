CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateCkPage`(pageContent TEXT, pageId INT(3))
BEGIN
	UPDATE pages SET content = pageContent WHERE id = pageId;
END