SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Tag;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE Tag(
  tagId INT AUTO_INCREMENT,
  tagName VARCHAR(50) NOT NULL,
  tagColor VARCHAR(6) NOT NULL,
  PRIMARY KEY(TagId)
) ENGINE = INNODB DEFAULT CHARSET=utf8;