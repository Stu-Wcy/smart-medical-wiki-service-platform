-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: medical_wiki
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_appointment_slot`
--

DROP TABLE IF EXISTS `t_appointment_slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_appointment_slot` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '涓婚敭ID',
  `created_by` bigint DEFAULT NULL COMMENT '鍒涘缓浜篒D',
  `created_time` datetime(6) DEFAULT NULL COMMENT '鍒涘缓鏃堕棿',
  `deleted` bit(1) DEFAULT b'0' COMMENT '鏄?惁鍒犻櫎',
  `updated_by` bigint DEFAULT NULL COMMENT '鏇存柊浜篒D',
  `updated_time` datetime(6) DEFAULT NULL COMMENT '鏇存柊鏃堕棿',
  `schedule_id` bigint NOT NULL COMMENT '鎺掔彮ID',
  `slot_number` int NOT NULL COMMENT '鍙锋簮搴忓彿',
  `appointment_time` datetime NOT NULL COMMENT '棰勭害鏃堕棿',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '鐘舵?(0-鍙??绾?1-宸查?绾?2-宸插彇娑?3-宸插畬鎴?',
  `user_id` bigint DEFAULT NULL COMMENT '棰勭害鐢ㄦ埛ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '棰勭害鐢ㄦ埛濮撳悕',
  `user_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '棰勭害鐢ㄦ埛鎵嬫満鍙',
  `appointment_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '棰勭害鍙',
  `cancel_reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '鍙栨秷鍘熷洜',
  `cancel_time` datetime(6) DEFAULT NULL COMMENT '鍙栨秷鏃堕棿',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_schedule_slot` (`schedule_id`,`slot_number`) USING BTREE,
  UNIQUE KEY `uk_appointment_no` (`appointment_no`) USING BTREE,
  KEY `idx_user_status` (`user_id`,`status`) USING BTREE,
  KEY `idx_appointment_time` (`appointment_time`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  CONSTRAINT `fk_slot_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `t_schedule` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_slot_user` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='棰勭害鍙锋簮琛';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-13 19:45:06
