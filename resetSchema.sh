#!/usr/bin/env bash
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/User.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/Budget.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/BudgetItem.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/Tag.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/TagMap.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/TagGroup.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/TagGroupMap.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/UserInfo.sql
mysql -u jod -pjod -h 127.0.0.1 jod < ./sql/Image.sql
