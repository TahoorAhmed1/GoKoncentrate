-- Create a stored procedure to update the FAQ
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateFaq`(contentText TEXT)
BEGIN
	UPDATE content SET content = contentText WHERE `type` = 4;
END -- DONE

-- Create a stored procedure to fetch the subscriptions.
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpFetchAllSubscriptions`()
BEGIN
	SELECT * FROM subscriptions WHERE delete_status = 0 AND `status` = 1;
END --DONE

-- Create a stored procedure to update subscription details of the user.
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpUpdateSubscriptionDetails`(userId INT(3), subsId INT(3))
BEGIN
	UPDATE subscriptions SET `status` = 0 WHERE id = subsId;
    UPDATE users SET subscription = 0 WHERE id = userId;
END -- DONE