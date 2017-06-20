-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: wxapp
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `addressId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `username` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `provinceName` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `postalCode` int(11) DEFAULT NULL,
  `cityName` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `countyName` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `detailInfo` text COLLATE utf8_unicode_ci,
  `nationalCode` int(11) DEFAULT NULL,
  `telNumber` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isDefault` int(11) DEFAULT '0',
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `bookId` int(11) NOT NULL,
  `bookName` text COLLATE utf8_unicode_ci NOT NULL,
  `brefInfo` text COLLATE utf8_unicode_ci,
  `imgUrl` text COLLATE utf8_unicode_ci,
  `userId` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookCart`
--

DROP TABLE IF EXISTS `bookCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookCart` (
  `cartId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `bookId` int(11) DEFAULT NULL,
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookCart`
--

LOCK TABLES `bookCart` WRITE;
/*!40000 ALTER TABLE `bookCart` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookCart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookOrder`
--

DROP TABLE IF EXISTS `bookOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookOrder` (
  `bookOrderId` int(11) NOT NULL AUTO_INCREMENT,
  `bookId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `mailNumber` tinytext COLLATE utf8_unicode_ci,
  `mailNumberReturn` tinytext COLLATE utf8_unicode_ci,
  `orderState` int(11) DEFAULT NULL,
  `shipperCode` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipperCodeReturn` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`bookOrderId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookOrder`
--

LOCK TABLES `bookOrder` WRITE;
/*!40000 ALTER TABLE `bookOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invite`
--

DROP TABLE IF EXISTS `invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invite` (
  `inviteId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `code` tinytext COLLATE utf8_unicode_ci,
  `type` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`inviteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite`
--

LOCK TABLES `invite` WRITE;
/*!40000 ALTER TABLE `invite` DISABLE KEYS */;
/*!40000 ALTER TABLE `invite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderTable`
--

DROP TABLE IF EXISTS `orderTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderTable` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `addressId` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=943574761 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderTable`
--

LOCK TABLES `orderTable` WRITE;
/*!40000 ALTER TABLE `orderTable` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` tinytext COLLATE utf8_unicode_ci,
  `type` int(11) DEFAULT NULL,
  `inviteUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'冷暖心',0,1),(5,'yanjing123',1,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'wxapp'
--

--
-- Dumping routines for database 'wxapp'
--
/*!50003 DROP PROCEDURE IF EXISTS `addCart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addCart`(
	  IN r_userId INTEGER,
    IN r_bookId INTEGER,
    OUT success BOOLEAN
)
BEGIN
	DECLARE t_userId INTEGER DEFAULT -1;
	DECLARE t_bookId INTEGER DEFAULT -1;
  DECLARE t_cartId INTEGER DEFAULT -1;
    #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;

    select userId into t_userId from user where userId = r_userId LIMIT 1;
    select bookId into t_bookId from book where bookId = r_bookId  LIMIT 1;
    select cartId into t_cartId from bookCart where userId = r_userId and bookId = r_bookId LIMIT 1 FOR UPDATE;
    #确保每次提交的只有一份数据
	if (t_userId!=-1&&t_bookId!=-1)&&t_cartId=-1 THEN
		insert into bookCart(userId,bookId) values(r_userId,r_bookId);
      #提交事务或者回滚
	if t_error = 1 then
		ROLLBACK;
        SET success = false;
	else
         COMMIT;
		 SET success = true;
	end if;

  else
      #释放独占锁
      COMMIT;
      SET success = false;

  end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `changeDefaultAddress` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `changeDefaultAddress`(
    IN r_userId INTEGER,
	  IN r_prevAddressId INTEGER,
    IN r_curAddressId INTEGER,
    OUT success BOOLEAN
)
BEGIN
	DECLARE t_prevId INTEGER DEFAULT -1;
	DECLARE t_curId INTEGER DEFAULT -1;
    #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;

    select addressId into t_prevId from address where addressId = r_prevAddressId and userId = r_userId LIMIT 1 FOR UPDATE;
    select addressId into t_curId from address where addressId = r_curAddressId and userId = r_userId LIMIT 1;

    #SELECT t_userId, t_type;
	if t_prevId!=-1&&t_curId!=-1 THEN
     update address set isDefault = 0  where addressId = r_prevAddressId;
	   update address set isDefault = 1 where addressId = r_curAddressId;
      #提交事务或者回滚
	if t_error = 1 then
		ROLLBACK;
        SET success = false;
	else
         COMMIT;
		 SET success = true;
	end if;

  else
      #释放独占锁
      COMMIT;
      SET success = false;

  end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteOwnAddress` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteOwnAddress`(
  IN r_userId INTEGER,
  IN r_newDefaultId INTEGER,
  IN r_addressId INTEGER,
  OUT success BOOLEAN
)
BEGIN
DECLARE t_prevId INTEGER DEFAULT -1;
	DECLARE t_curId INTEGER DEFAULT -1;
    #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;

    select addressId into t_prevId from address where addressId = r_addressId and userId = r_userId LIMIT 1 FOR UPDATE;
    select addressId into t_curId from address where addressId = r_newDefaultId and userId = r_userId LIMIT 1;

    #SELECT t_userId, t_type;
	if t_prevId!=-1&&t_curId!=-1 THEN
     delete from address where addressId = t_prevId;
	 update address set isDefault = 1 where addressId = t_curId;
      #提交事务或者回滚
	if t_error = 1 then
		ROLLBACK;
        SET success = false;
	else
         COMMIT;
		 SET success = true;
	end if;

  else
      #释放独占锁
      COMMIT;
      SET success = false;

  end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCode` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCode`(
   IN r_inviteId INTEGER,
   IN r_userId INTEGER,
   IN r_code TINYTEXT,
   IN r_type INTEGER,
   IN r_key INTEGER,
   OUT success BOOLEAN
)
BEGIN
	DECLARE t_userId INTEGER DEFAULT -1;
    #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;

    select userId into t_userId  from user where userId = r_userId and type = r_type;

	if t_userId !=-1 THEN
    if r_key = 4 THEN
		  insert into invite(inviteId,userId,code,type) values(r_inviteId,r_userId,r_code,2);
    else
      insert into invite(inviteId,userId,code,type) values(r_inviteId,r_userId,r_code,1);
    end if;
        #提交事务或者回滚
		if t_error = 1 then
			ROLLBACK;
			SET success = false;
		else
			 COMMIT;
			 SET success = true;
		end if;
    else
      #释放独占锁
      COMMIT;
      SET success = false;
    end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(
	IN r_username char(20),
    IN r_code TINYTEXT,
    OUT r_userId INTEGER,
    OUT r_type INTEGER
)
BEGIN
    DECLARE t_type INTEGER DEFAULT -1;
    DECLARE t_userId INTEGER DEFAULT -1;
	DECLARE t_inviteId INTEGER DEFAULT -1;
    #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;
    #解决并发数据不一致，可以使用写独占锁或者CAS机制,这里使用写独占锁
    SELECT userId,type,inviteId INTO t_userId,t_type,t_inviteId FROM invite WHERE invite.code= r_code LIMIT 1 for update;
    #SELECT t_userId, t_type;
	if t_type!=-1 THEN
      insert into user(nickname,type,inviteUserId)  values(r_username,t_type,t_userId);
      select userId,type into t_userId,t_type from user where nickname = r_username;
      #最后删除，防止由于锁造成的失败
	  delete from invite where inviteId = t_inviteId;
      #提交事务或者回滚
	if t_error = 1 then
		ROLLBACK;
        SET r_userId =-1;
		SET r_type =-1;
	else
         COMMIT;
		 SET r_userId = t_userId;
         SET r_type = t_type;
	end if;

  else
      #释放独占锁
      COMMIT;
      SET r_userId =-1;
	  SET r_type =-1;
  end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `submitOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `submitOrder`(
	  IN r_userId INTEGER,
    IN r_addressId INTEGER,
    IN r_time  DATETIME,
    IN r_bookId INTEGER,
    IN r_orderId INTEGER,
    OUT success BOOLEAN
)
BEGIN
    DECLARE t_cartId INTEGER DEFAULT -1;
    DECLARE t_orderId INTEGER DEFAULT -1;
    #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;

    select cartId into t_cartId from bookCart where userId = r_userId and bookId = r_bookId LIMIT 1 FOR UPDATE;

	if t_cartId!=-1 THEN
      select orderId into t_orderId from orderTable where orderId = r_orderId;
      if t_orderId =-1 THEN
          insert into orderTable(orderId,userId,time,addressId) values(r_orderId,r_userId,r_time,r_addressId);
      end if;
      insert into bookOrder(bookId,orderId,orderState) values(r_bookId,r_orderId,0);
      update book set state = 0  where bookId = r_bookId;
	    delete from bookCart where cartId = t_cartId;

      #提交事务或者回滚
	if t_error = 1 then
		ROLLBACK;
    SET success = false;
	else
    COMMIT;
		SET success = true;
	end if;

  else
      #释放独占锁
      COMMIT;
      SET success = false;

  end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `successReturn` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `successReturn`(
	IN r_bookOrderId INTEGER,
  OUT success BOOLEAN
)
BEGIN
    #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;
    #解决并发数据不一致，可以使用写独占锁或者CAS机制,这里使用写独占锁
    update bookOrder set orderState = 3 where bookOrderId = r_bookOrderId;
    update book,bookOrder set book.state = 2 where book.bookId = bookOrder.bookId and bookOrder.bookOrderId = r_bookOrderId;

    #提交事务或者回滚
	if t_error = 1 then
		ROLLBACK;
        SET success = false;
	else
         COMMIT;
		 SET success = true;
	end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `writeMailNumber` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `writeMailNumber`(
	  IN r_direction INTEGER,
    IN r_mailNumber TINYTEXT,
    IN r_bookOrderId INTEGER,
    IN r_shipperCode VARCHAR(45),
    OUT success BOOLEAN
)
BEGIN
   #定义发生异常时回滚
    DECLARE t_error INTEGER DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

    #开启事务
    START TRANSACTION;
    # direction 1 => 寄回 ; direction 0=> 借出
    # orderState 0:待借出 1：借出 2：寄回 3：交易完成
    # state : 0 ：借出 1：寄回 2：可借阅
    if r_direction = 1 then
		    update bookOrder set mailNumberReturn = r_mailNumber,shipperCodeReturn = r_shipperCode, orderState = 2 where bookOrderId = r_bookOrderId;
        update book,bookOrder set book.state = 1 where book.bookId = bookOrder.bookId and bookOrder.bookOrderId = r_bookOrderId;
    else
        update bookOrder set mailNumber = r_mailNumber,shipperCode = r_shipperCode, orderState = 1 where bookOrderId = r_bookOrderId;
    end if;

    #提交事务或者回滚
	if t_error = 1 then
		ROLLBACK;
    SET success = false;
	else
     COMMIT;
		 SET success = true;
   end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-17 17:03:02
