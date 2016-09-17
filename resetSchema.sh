#!/usr/bin/env bash
mysql -u jod -pjod -h 192.168.99.100 jod < ./sql/Account.sql
mysql -u jod -pjod -h 192.168.99.100 jod < ./sql/Budget.sql
mysql -u jod -pjod -h 192.168.99.100 jod < ./sql/BudgetItem.sql
mysql -u jod -pjod -h 192.168.99.100 jod < ./sql/Tag.sql
mysql -u jod -pjod -h 192.168.99.100 jod < ./sql/Tags.sql
mysql -u jod -pjod -h 192.168.99.100 jod < ./sql/User.sql
mysql -u jod -pjod -h 192.168.99.100 jod < ./sql/UserInfo.sql