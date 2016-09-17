SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Account;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE Account(
  AccountId INT AUTO_INCREMENT,
  UserId INT NOT NULL,
  AccountName VARCHAR(200) NOT NULL,
  PRIMARY KEY(AccountId),
  FOREIGN KEY(UserId)
    REFERENCES `User`(UserId)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE = INNODB DEFAULT CHARSET=utf8;