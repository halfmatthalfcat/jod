SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS UserInfo;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE UserInfo(
  userId INT NOT NULL,
  phone VARCHAR(12),
  address1 VARCHAR(100),
  address2 VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(2),
  zipCode INT,
  PRIMARY KEY(UserId),
  FOREIGN KEY(UserId)
    REFERENCES `User`(UserId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE = INNODB DEFAULT CHARSET=utf8;