SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS TagGroup;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE TagGroup(
  tagGroupId INT AUTO_INCREMENT,
  tagGroupName VARCHAR(100) NOT NULL,
  PRIMARY KEY(tagGroupId)
) ENGINE = INNODB DEFAULT CHARSET=utf8;

INSERT INTO TagGroup
(tagGroupName) VALUES ("Unsorted");