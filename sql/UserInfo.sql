SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS UserInfo;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE UserInfo(
  UserId INT NOT NULL,
  Phone VARCHAR(12),
  Address1 VARCHAR(100),
  Address2 VARCHAR(100),
  City VARCHAR(100),
  State VARCHAR(2),
  ZipCode INT,
  PRIMARY KEY(UserId),
  FOREIGN KEY(UserId),
    REFERENCES `User`(UserId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET=utf8;