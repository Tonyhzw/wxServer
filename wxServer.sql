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
  `nickname` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `inviteUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'冷暖心',2,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'wxapp'
--

--
-- Dumping routines for database 'wxapp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-16 14:29:44
