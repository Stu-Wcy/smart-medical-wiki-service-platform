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
-- Table structure for table `t_appointment`
--

DROP TABLE IF EXISTS `t_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_appointment` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '涓婚敭ID',
  `created_by` bigint DEFAULT NULL COMMENT '鍒涘缓浜篒D',
  `created_time` datetime(6) DEFAULT NULL COMMENT '鍒涘缓鏃堕棿',
  `deleted` bit(1) DEFAULT b'0' COMMENT '鏄?惁鍒犻櫎',
  `updated_by` bigint DEFAULT NULL COMMENT '鏇存柊浜篒D',
  `updated_time` datetime(6) DEFAULT NULL COMMENT '鏇存柊鏃堕棿',
  `appointment_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '棰勭害鍙',
  `user_id` bigint NOT NULL COMMENT '鐢ㄦ埛ID',
  `doctor_id` bigint NOT NULL COMMENT '鍖荤敓ID',
  `hospital_id` bigint NOT NULL COMMENT '鍖婚櫌ID',
  `department_id` bigint DEFAULT NULL COMMENT '绉戝?ID',
  `schedule_id` bigint NOT NULL COMMENT '鎺掔彮ID',
  `slot_id` bigint NOT NULL COMMENT '鍙锋簮ID',
  `appointment_date` date NOT NULL COMMENT '棰勭害鏃ユ湡',
  `appointment_time` datetime NOT NULL COMMENT '棰勭害鏃堕棿',
  `time_slot` tinyint NOT NULL COMMENT '鏃堕棿娈?1-涓婂崍,2-涓嬪崍,3-鏅氫笂)',
  `slot_number` int NOT NULL COMMENT '鍙锋簮搴忓彿',
  `patient_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '灏辫瘖浜哄?鍚',
  `patient_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '灏辫瘖浜烘墜鏈哄彿',
  `patient_id_card` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '灏辫瘖浜鸿韩浠借瘉鍙',
  `consultation_fee` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '鎸傚彿璐圭敤',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '鐘舵?(1-宸查?绾?2-宸插彇娑?3-宸插畬鎴?4-宸茶繃鏈?',
  `cancel_reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '鍙栨秷鍘熷洜',
  `cancel_time` datetime(6) DEFAULT NULL COMMENT '鍙栨秷鏃堕棿',
  `notes` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '澶囨敞淇℃伅',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_appointment_no` (`appointment_no`) USING BTREE,
  KEY `idx_user_status` (`user_id`,`status`) USING BTREE,
  KEY `idx_doctor_date` (`doctor_id`,`appointment_date`) USING BTREE,
  KEY `idx_hospital_date` (`hospital_id`,`appointment_date`) USING BTREE,
  KEY `idx_appointment_time` (`appointment_time`) USING BTREE,
  KEY `fk_appointment_department` (`department_id`) USING BTREE,
  KEY `fk_appointment_schedule` (`schedule_id`) USING BTREE,
  KEY `fk_appointment_slot` (`slot_id`) USING BTREE,
  CONSTRAINT `fk_appointment_department` FOREIGN KEY (`department_id`) REFERENCES `t_department` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `t_doctor` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `t_hospital` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `t_schedule` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_slot` FOREIGN KEY (`slot_id`) REFERENCES `t_appointment_slot` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_user` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='棰勭害璁板綍琛';
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
