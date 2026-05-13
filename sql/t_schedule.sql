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
-- Table structure for table `t_schedule`
--

DROP TABLE IF EXISTS `t_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '涓婚敭ID',
  `created_by` bigint DEFAULT NULL COMMENT '鍒涘缓浜篒D',
  `created_time` datetime(6) DEFAULT NULL COMMENT '鍒涘缓鏃堕棿',
  `deleted` bit(1) DEFAULT b'0' COMMENT '鏄?惁鍒犻櫎',
  `updated_by` bigint DEFAULT NULL COMMENT '鏇存柊浜篒D',
  `updated_time` datetime(6) DEFAULT NULL COMMENT '鏇存柊鏃堕棿',
  `doctor_id` bigint NOT NULL COMMENT '鍖荤敓ID',
  `hospital_id` bigint NOT NULL COMMENT '鍖婚櫌ID',
  `department_id` bigint DEFAULT NULL COMMENT '绉戝?ID',
  `schedule_date` date NOT NULL COMMENT '鎺掔彮鏃ユ湡',
  `time_slot` tinyint NOT NULL COMMENT '鏃堕棿娈?1-涓婂崍,2-涓嬪崍,3-鏅氫笂)',
  `start_time` time NOT NULL COMMENT '寮??鏃堕棿',
  `end_time` time NOT NULL COMMENT '缁撴潫鏃堕棿',
  `total_slots` int NOT NULL DEFAULT '0' COMMENT '鎬诲彿婧愭暟閲',
  `available_slots` int NOT NULL DEFAULT '0' COMMENT '鍙?敤鍙锋簮鏁伴噺',
  `consultation_fee` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '鎸傚彿璐圭敤',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '鐘舵?(0-鍋滆瘖,1-姝ｅ父)',
  `notes` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '澶囨敞淇℃伅',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_doctor_date_slot` (`doctor_id`,`schedule_date`,`time_slot`) USING BTREE,
  KEY `idx_hospital_date` (`hospital_id`,`schedule_date`) USING BTREE,
  KEY `idx_department_date` (`department_id`,`schedule_date`) USING BTREE,
  KEY `idx_date_status` (`schedule_date`,`status`) USING BTREE,
  CONSTRAINT `fk_schedule_department` FOREIGN KEY (`department_id`) REFERENCES `t_department` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_schedule_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `t_doctor` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_schedule_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `t_hospital` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='鍖荤敓鎺掔彮琛';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-13 19:45:07
