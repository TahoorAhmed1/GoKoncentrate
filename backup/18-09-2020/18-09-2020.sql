-- Create a table of content for privacy policy, terms and conditions
    CREATE TABLE content(
	id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	type INT(1) NOT NULL,
	content TEXT,
	title VARCHAR(255),
	description TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP    
);