/*
 Navicat Premium Data Transfer

 Source Server         : mysql8.0
 Source Server Type    : MySQL
 Source Server Version : 80035
 Source Host           : localhost:3306
 Source Schema         : medical_wiki

 Target Server Type    : MySQL
 Target Server Version : 80035
 File Encoding         : 65001

 Date: 22/08/2025 18:06:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_address
-- ----------------------------
DROP TABLE IF EXISTS `t_address`;
CREATE TABLE `t_address`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `detail_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `district` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_default` bit(1) NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiver` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` bit(1) NOT NULL,
  `user_id` bigint(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_address
-- ----------------------------

-- ----------------------------
-- Table structure for t_ai_consultation
-- ----------------------------
DROP TABLE IF EXISTS `t_ai_consultation`;
CREATE TABLE `t_ai_consultation`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `completion_tokens` int(0) NULL DEFAULT NULL,
  `diagnosis` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `duration` int(0) NULL DEFAULT NULL,
  `prompt_tokens` int(0) NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `suggestions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `symptoms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` bigint(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_ai_consultation
-- ----------------------------
INSERT INTO `t_ai_consultation` VALUES (1, 2, '2025-03-05 01:20:32.746023', b'0', 2, '2025-03-05 01:20:48.390867', NULL, 'AI问诊失败：AI问诊服务异常', NULL, NULL, 'FAILED', NULL, '我肚子疼', 2);
INSERT INTO `t_ai_consultation` VALUES (2, 2, '2025-03-05 01:26:08.472365', b'0', 2, '2025-03-05 01:26:29.270998', NULL, 'AI问诊失败：AI问诊服务异常', NULL, NULL, 'FAILED', NULL, '我肚子疼', 2);
INSERT INTO `t_ai_consultation` VALUES (3, 2, '2025-03-05 19:16:51.048394', b'0', 2, '2025-03-05 19:17:14.353547', NULL, 'AI问诊失败：AI问诊服务异常', NULL, NULL, 'FAILED', NULL, '我肚子疼', 2);
INSERT INTO `t_ai_consultation` VALUES (4, 2, '2025-03-05 19:21:26.095392', b'0', 2, '2025-03-05 19:21:46.070295', NULL, 'AI问诊失败：AI问诊服务异常', NULL, NULL, 'FAILED', NULL, '我肚子疼', 2);
INSERT INTO `t_ai_consultation` VALUES (5, 2, '2025-03-05 19:23:35.996207', b'0', 2, '2025-03-05 19:41:27.555283', NULL, '如果您怀疑自己是吃坏肚子了，可能是食物中毒或胃肠炎引起的腹痛。在这种情况下，可以考虑使用一些非处方药物来缓解症状。以下是一些建议的药物和措施：\n\n### 常见的非处方药物\n\n1. **止泻药**：\n   - **洛哌丁胺**（Loperamide，商品名：Imodium）：用于控制腹泻。成人每次2毫克，每日不超过8毫克。\n   - **蒙脱石散**（Diosmectite，商品名：思密达）：用于吸附肠道内的有害物质，减轻腹泻。成人每次3克，每日3次。\n\n2. **益生菌**：\n   - **双歧杆菌**（Bifidobacterium）：帮助调节肠道菌群，促进消化。常见的品牌有“妈咪爱”、“整肠生”等。按照说明书上的剂量服用。\n\n3. **解痉药**：\n   - **颠茄片**（Belladonna Alkaloids）：用于缓解胃肠平滑肌痉挛引起的疼痛。成人每次1-2片，每日3次。\n   - **山莨菪碱**（Anisodamine，商品名：654-2）：用于缓解胃肠绞痛。成人每次10-20毫克，每日3次。\n\n4. **抗酸药**：\n   - **铝碳酸镁**（Aluminum Magnesium Carbonate，商品名：达喜）：用于缓解胃酸过多、胃灼热等症状。成人每次1-2片，每日3次。\n\n### 用药注意事项\n- **严格按照说明书或医嘱用药**：不要随意增减剂量。\n- **注意药物相互作用**：如果您正在服用其他药物，请咨询医生或药师。\n- **过敏史**：如果您对某些药物成分过敏，请避免使用。\n- **特殊人群**：孕妇、哺乳期妇女、儿童及老年人应在医生指导下使用。\n\n### 其他建议\n1. **多喝水**：保持充足的水分摄入，防止脱水。可以喝一些温开水或淡盐水。\n2. **清淡饮食**：暂时避免油腻、辛辣、高纤维的食物，选择容易消化的食物，如稀饭、面条、蒸蛋等。\n3. **休息**：适当休息，减少身体负担。\n\n### 是否需要就医\n如果出现以下情况，请及时就医：\n- 腹痛非常剧烈且持续加剧\n- 高热（体温超过38.5°C）\n- 明显的血便或黑色粪便\n- 呕吐频繁无法停止\n- 伴有严重的脱水迹象（如尿量明显减少、口渴增加）\n\n希望这些建议对您有所帮助。请注意，这些药物和措施仅供参考，最好在使用任何药物前咨询医生或药师。如果症状持续或者加重，请尽快就医。祝您早日康复！', 33, NULL, 'IN_PROGRESS', NULL, '我肚子疼', 2);
INSERT INTO `t_ai_consultation` VALUES (6, 2, '2025-03-05 19:44:06.806530', b'0', 2, '2025-03-05 19:44:38.658066', NULL, '开发一个医疗百科系统时，选择合适的风格非常重要，这不仅关乎用户体验，还直接影响信息传达的有效性和准确性。以下是一些建议供您参考：\n\n1. **专业性与易读性的平衡**：内容上既要有足够的科学依据支持，确保信息的专业性和准确性，同时也要注意语言的通俗化处理，使得非专业人士也能容易理解。可以考虑采用问答形式、常见问题解答等方法来简化复杂概念。\n\n2. **简洁明快的设计风格**：界面设计应追求清晰、直观，避免过多复杂的装饰元素干扰用户获取信息。合理布局导航栏、搜索框等功能区域，让用户能够快速找到所需资料。\n\n3. **友好的交互体验**：增强系统的互动性，比如设置在线咨询服务、患者故事分享区等，让访问者感到更加贴近实际生活场景。同时保证网站或应用程序运行流畅无卡顿，提高用户满意度。\n\n4. **视觉上的舒适感**：使用温和而不失活力的颜色搭配，如浅蓝、绿色等给人以安心之感；字体大小适中且易于阅读；适当添加图标或者插图帮助说明文本内容，但不宜过于花哨以免分散注意力。\n\n5. **注重隐私保护**：对于涉及到个人健康信息的部分，必须严格遵守相关法律法规要求，明确告知用户数据收集范围及用途，并采取有效措施保障信息安全。\n\n6. **持续更新维护**：医学知识不断进步发展，因此需要定期对内容进行审查和更新，确保所提供的信息始终处于最新状态。\n\n总之，在构建医疗百科平台时，应当坚持以人为本的原则，从目标受众的实际需求出发，结合上述各方面因素综合考量，打造出既有深度又不失温度的产品。', NULL, NULL, 'IN_PROGRESS', NULL, '我要开发一个医疗百科系统，应该采用什么风格', 2);
INSERT INTO `t_ai_consultation` VALUES (7, 1, '2025-03-07 23:16:06.244516', b'0', 1, '2025-03-07 23:16:25.591089', NULL, '您好！感冒是一种常见的呼吸道疾病，通常由病毒引起。根据您的描述，您可能正在经历以下一些症状：流鼻涕、打喷嚏、喉咙痛、咳嗽、轻微发热等。这些都是普通感冒的典型表现。\n\n### 可能的原因\n- **病毒感染**：大部分感冒是由冠状病毒、流感病毒或鼻病毒引起的。\n- **季节变化**：天气转冷或换季时，人体抵抗力下降，容易感染。\n- **免疫力低**：当身体疲劳过度或者营养不良时，也更容易患上感冒。\n\n### 初步建议\n1. **充分休息**：保证足够的睡眠时间，让身体有精力对抗病毒。\n2. **多喝水**：保持体内水分充足有助于缓解喉咙干燥不适。\n3. **适当使用药物**：可以考虑服用非处方药如解热镇痛剂（例如对乙酰氨基酚）来缓解症状，但请按照说明或咨询药师后使用。\n4. **注意保暖**：根据天气变化适时增减衣物，避免着凉加重病情。\n5. **饮食清淡**：多吃蔬菜水果补充维生素C，少吃油腻食物。\n\n### 是否需要就医\n- 如果只是轻微的感冒症状，并且没有持续恶化的情况，一般不需要特别去医院就诊。\n- 但如果出现高烧不退（体温超过38.5°C）、呼吸困难、持续性头痛或其他严重症状，则应该尽快去医院就诊，以便得到更专业的治疗指导。\n\n希望这些建议能够帮助到您，祝您早日康复！如果还有其他问题，欢迎继续询问。', NULL, NULL, 'IN_PROGRESS', NULL, '我感冒了', 1);
INSERT INTO `t_ai_consultation` VALUES (8, 1, '2025-03-07 23:16:44.390384', b'0', 1, '2025-03-07 23:17:00.437355', NULL, '感冒是一种常见的上呼吸道感染，通常由病毒引起。您可能经历的症状包括流鼻涕、打喷嚏、喉咙痛、咳嗽、轻微的头痛或身体疼痛等。有时还可能会有轻微发热。基于您的描述“我感冒了”，但没有提供更具体的症状信息，以下是一些一般性的建议：\n\n1. **保持休息**：确保自己有足够的休息时间来帮助身体恢复。\n2. **多喝水**：保持充足的水分可以帮助缓解喉咙痛和咳嗽。\n3. **适当用药**：可以考虑使用非处方药物来缓解症状，如解热镇痛药（对乙酰氨基酚）、止咳糖浆或者抗组胺药物以减轻打喷嚏和流鼻涕等症状。但在使用任何药物之前，请仔细阅读说明书，并按照推荐剂量服用。\n4. **注意个人卫生**：勤洗手，使用纸巾遮挡口鼻当打喷嚏或咳嗽时，避免与他人密切接触以减少传播风险。\n\n如果出现以下情况之一，则建议尽快就医：\n- 持续高烧不退\n- 呼吸困难\n- 症状持续恶化或超过一周不见好转\n- 严重的头痛、胸痛或其他异常体征\n\n请根据自身状况判断是否需要寻求专业医生的帮助。希望您早日康复！', NULL, NULL, 'IN_PROGRESS', NULL, '我感冒了', 1);
INSERT INTO `t_ai_consultation` VALUES (9, 1, '2025-03-07 23:19:10.867291', b'0', 1, '2025-03-07 23:19:31.346018', NULL, '您好！感冒是由病毒引起的一种常见的呼吸道疾病，主要症状包括打喷嚏、鼻塞、流鼻涕、喉咙痛、咳嗽、轻微头痛和身体不适等。有时还可能伴有低烧或轻度的肌肉疼痛。\n\n### 可能的病因\n- **病毒感染**：最常见的原因是冠状病毒、流感病毒或者鼻病毒等。\n- **环境因素**：天气变化、过度疲劳、免疫力下降等也可能成为诱因。\n\n### 初步建议\n1. **休息充足**：保证足够的睡眠时间，帮助身体恢复。\n2. **多喝水**：保持良好的水分状态有助于缓解咽喉不适，并促进体内毒素排出。\n3. **饮食清淡**：选择易于消化的食物，如粥类、蔬菜水果等。\n4. **适当保暖**：根据气温调整着装，避免受凉加重病情。\n5. **使用药物缓解症状**：如果感到非常不舒服，可以考虑使用非处方药来减轻症状（例如解热镇痛药），但请按照说明或药师指导服用。\n\n### 是否需要及时就医\n- 如果是普通感冒且没有其他严重并发症的话，通常不需要特别去医院治疗，通过上述自我护理措施可以在一周左右自然好转。\n- 但是，如果出现高烧不退（成人超过38.5°C）、持续性胸痛、呼吸困难、极度乏力等症状时，则应尽快就医寻求专业帮助，以排除是否为更严重的疾病如肺炎等。\n\n希望您早日康复！如果有任何疑问或症状加剧，请及时联系医生。', NULL, NULL, 'IN_PROGRESS', NULL, '我感冒了', 1);
INSERT INTO `t_ai_consultation` VALUES (10, 1, '2025-03-07 23:31:31.066422', b'0', 1, '2025-03-07 23:32:04.252620', NULL, '您好！肚子不舒服是一个比较常见的症状，可能由多种原因引起。为了更好地帮助您，我需要了解一些更详细的信息：\n\n1. **具体症状**：是持续的疼痛还是间歇性的？疼痛的性质是什么样的（例如钝痛、绞痛、刺痛等）？\n2. **位置**：疼痛主要在哪个部位？上腹部、下腹部、肚脐周围还是其他地方？\n3. **伴随症状**：有没有恶心、呕吐、腹泻、便秘、发热等症状？\n4. **饮食情况**：最近有没有吃不干净的食物或者有过暴饮暴食的情况？\n5. **病史**：以前有没有类似的症状？有没有慢性疾病或者正在服用的药物？\n\n根据这些信息，我可以给您一个初步的建议。但请注意，我的建议不能替代专业医生的诊断和治疗。\n\n如果您的症状非常严重或持续时间较长，建议尽快就医，以便得到及时的诊断和治疗。', NULL, NULL, 'IN_PROGRESS', NULL, '213', 1);
INSERT INTO `t_ai_consultation` VALUES (11, 1, '2025-03-07 23:42:41.343604', b'0', 1, '2025-03-08 01:02:53.379576', NULL, '看起来你输入了一些随机的字符。如果你有任何具体的问题或需要帮助的地方，请告诉我。无论是健康咨询还是其他方面的信息，我都会尽力帮助你。如果有任何特定的话题或疑问，请随时提问！', NULL, NULL, 'IN_PROGRESS', NULL, '你好', 1);
INSERT INTO `t_ai_consultation` VALUES (12, 1, '2025-03-08 01:05:01.060954', b'0', 1, '2025-03-08 01:08:31.500303', NULL, '了解了，您目前的主要症状是头痛。为了更好地帮助您，我需要一些额外的信息：\n\n1. **头痛的性质**：是钝痛、刺痛、搏动性疼痛还是其他类型的疼痛？\n2. **头痛的位置**：是整个头部、前额、后脑勺、一侧还是某个特定区域？\n3. **头痛的频率和持续时间**：是偶尔出现还是经常发生？每次持续多久？\n4. **是否有诱因**：比如压力大、睡眠不足、饮食不当、饮酒或特定活动后出现？\n5. **伴随症状**：是否伴有恶心、呕吐、视力模糊、发热、颈部僵硬等症状？\n6. **既往病史**：以前是否有过类似的头痛？是否有其他慢性疾病或正在服用的药物？\n\n这些信息可以帮助我更准确地判断可能的原因，并给出相应的建议。如果您的头痛非常严重或突然加剧，建议尽快就医。', NULL, NULL, 'IN_PROGRESS', NULL, '21212', 1);
INSERT INTO `t_ai_consultation` VALUES (13, 5, '2025-07-23 15:10:05.225041', b'0', 5, '2025-07-24 13:38:42.481032', NULL, '感谢你的补充信息。黄色的痰通常提示可能存在感染，尤其是细菌性感染。以下是一些可能的原因和建议：\n\n### 可能的病因\n1. **急性支气管炎**：这是最常见的原因之一，通常由病毒或细菌引起。\n2. **肺炎**：如果伴有发热、胸痛、呼吸困难等症状，可能是肺炎。\n3. **慢性阻塞性肺病（COPD）**：如果有吸烟史或其他呼吸道疾病史，可能会加重症状。\n4. **鼻窦炎**：鼻后滴流也可能导致咳嗽和黄色痰。\n\n### 初步建议\n1. **多喝水**：保持充足的水分有助于稀释痰液，使其更容易咳出。\n2. **休息**：充分休息有助于身体恢复。\n3. **避免刺激物**：尽量避免吸烟和接触其他刺激性物质，如尘埃、烟雾等。\n4. **使用加湿器**：在室内使用加湿器可以帮助缓解喉咙干燥和咳嗽。\n\n### 是否需要及时就医\n如果你有以下情况之一，建议尽快就医：\n- 咳嗽持续超过一周且没有改善。\n- 伴有高热（体温超过38.5°C）。\n- 呼吸困难或胸痛。\n- 痰中带血。\n- 乏力、体重下降或其他全身症状。\n\n医生可能会根据你的具体情况开具抗生素或其他药物，并进行进一步检查以确定病因。希望你早日康复！', NULL, NULL, 'IN_PROGRESS', NULL, '你好', 5);

-- ----------------------------
-- Table structure for t_appointment
-- ----------------------------
DROP TABLE IF EXISTS `t_appointment`;
CREATE TABLE `t_appointment`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '涓婚敭ID',
  `created_by` bigint(0) NULL DEFAULT NULL COMMENT '鍒涘缓浜篒D',
  `created_time` datetime(6) NULL DEFAULT NULL COMMENT '鍒涘缓鏃堕棿',
  `deleted` bit(1) NULL DEFAULT b'0' COMMENT '鏄?惁鍒犻櫎',
  `updated_by` bigint(0) NULL DEFAULT NULL COMMENT '鏇存柊浜篒D',
  `updated_time` datetime(6) NULL DEFAULT NULL COMMENT '鏇存柊鏃堕棿',
  `appointment_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '棰勭害鍙',
  `user_id` bigint(0) NOT NULL COMMENT '鐢ㄦ埛ID',
  `doctor_id` bigint(0) NOT NULL COMMENT '鍖荤敓ID',
  `hospital_id` bigint(0) NOT NULL COMMENT '鍖婚櫌ID',
  `department_id` bigint(0) NULL DEFAULT NULL COMMENT '绉戝?ID',
  `schedule_id` bigint(0) NOT NULL COMMENT '鎺掔彮ID',
  `slot_id` bigint(0) NOT NULL COMMENT '鍙锋簮ID',
  `appointment_date` date NOT NULL COMMENT '棰勭害鏃ユ湡',
  `appointment_time` datetime(0) NOT NULL COMMENT '棰勭害鏃堕棿',
  `time_slot` tinyint(0) NOT NULL COMMENT '鏃堕棿娈?1-涓婂崍,2-涓嬪崍,3-鏅氫笂)',
  `slot_number` int(0) NOT NULL COMMENT '鍙锋簮搴忓彿',
  `patient_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '灏辫瘖浜哄?鍚',
  `patient_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '灏辫瘖浜烘墜鏈哄彿',
  `patient_id_card` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '灏辫瘖浜鸿韩浠借瘉鍙',
  `consultation_fee` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '鎸傚彿璐圭敤',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '鐘舵?(1-宸查?绾?2-宸插彇娑?3-宸插畬鎴?4-宸茶繃鏈?',
  `cancel_reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '鍙栨秷鍘熷洜',
  `cancel_time` datetime(6) NULL DEFAULT NULL COMMENT '鍙栨秷鏃堕棿',
  `notes` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '澶囨敞淇℃伅',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_appointment_no`(`appointment_no`) USING BTREE,
  INDEX `idx_user_status`(`user_id`, `status`) USING BTREE,
  INDEX `idx_doctor_date`(`doctor_id`, `appointment_date`) USING BTREE,
  INDEX `idx_hospital_date`(`hospital_id`, `appointment_date`) USING BTREE,
  INDEX `idx_appointment_time`(`appointment_time`) USING BTREE,
  INDEX `fk_appointment_department`(`department_id`) USING BTREE,
  INDEX `fk_appointment_schedule`(`schedule_id`) USING BTREE,
  INDEX `fk_appointment_slot`(`slot_id`) USING BTREE,
  CONSTRAINT `fk_appointment_department` FOREIGN KEY (`department_id`) REFERENCES `t_department` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `t_doctor` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `t_hospital` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `t_schedule` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_slot` FOREIGN KEY (`slot_id`) REFERENCES `t_appointment_slot` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointment_user` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '棰勭害璁板綍琛' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_appointment
-- ----------------------------
INSERT INTO `t_appointment` VALUES (1, 5, '2025-07-23 18:40:14.795001', b'0', 5, '2025-07-23 21:06:59.751571', 'APT20250723184014580', 5, 5, 1, 1, 14, 127, '2025-07-25', '2025-07-25 07:00:00', 1, 1, '王玉', '15633562365', '450422199904260230', 100.00, 1, '不去了', '2025-07-23 21:06:59.741562', '');
INSERT INTO `t_appointment` VALUES (2, 5, '2025-07-23 19:25:12.351709', b'0', 1, '2025-07-23 21:09:32.243827', 'APT20250723192512114', 5, 8, 1, 5, 15, 150, '2025-07-26', '2025-07-26 07:45:00', 2, 4, '王玉', '15633562365', '450422199904260230', 100.00, 2, NULL, NULL, '');
INSERT INTO `t_appointment` VALUES (3, 5, '2025-07-23 21:09:11.645232', b'0', 1, '2025-07-24 11:48:42.248609', 'APT20250723210911892', 5, 5, 1, 1, 14, 136, '2025-07-25', '2025-07-25 09:15:00', 1, 10, '刘璐', '13566985623', '100422200101262420', 320.00, 2, NULL, NULL, '');
INSERT INTO `t_appointment` VALUES (4, 5, '2025-07-24 13:35:43.175778', b'0', 1, '2025-07-24 13:47:12.112658', 'APT20250724133543185', 5, 3, 2, 3, 8, 301, '2025-07-26', '2025-07-26 09:52:00', 1, 15, '王玉', '15633562365', '450422199904260230', 280.00, 2, NULL, NULL, '');

-- ----------------------------
-- Table structure for t_appointment_slot
-- ----------------------------
DROP TABLE IF EXISTS `t_appointment_slot`;
CREATE TABLE `t_appointment_slot`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '涓婚敭ID',
  `created_by` bigint(0) NULL DEFAULT NULL COMMENT '鍒涘缓浜篒D',
  `created_time` datetime(6) NULL DEFAULT NULL COMMENT '鍒涘缓鏃堕棿',
  `deleted` bit(1) NULL DEFAULT b'0' COMMENT '鏄?惁鍒犻櫎',
  `updated_by` bigint(0) NULL DEFAULT NULL COMMENT '鏇存柊浜篒D',
  `updated_time` datetime(6) NULL DEFAULT NULL COMMENT '鏇存柊鏃堕棿',
  `schedule_id` bigint(0) NOT NULL COMMENT '鎺掔彮ID',
  `slot_number` int(0) NOT NULL COMMENT '鍙锋簮搴忓彿',
  `appointment_time` datetime(0) NOT NULL COMMENT '棰勭害鏃堕棿',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '鐘舵?(0-鍙??绾?1-宸查?绾?2-宸插彇娑?3-宸插畬鎴?',
  `user_id` bigint(0) NULL DEFAULT NULL COMMENT '棰勭害鐢ㄦ埛ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '棰勭害鐢ㄦ埛濮撳悕',
  `user_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '棰勭害鐢ㄦ埛鎵嬫満鍙',
  `appointment_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '棰勭害鍙',
  `cancel_reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '鍙栨秷鍘熷洜',
  `cancel_time` datetime(6) NULL DEFAULT NULL COMMENT '鍙栨秷鏃堕棿',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_schedule_slot`(`schedule_id`, `slot_number`) USING BTREE,
  UNIQUE INDEX `uk_appointment_no`(`appointment_no`) USING BTREE,
  INDEX `idx_user_status`(`user_id`, `status`) USING BTREE,
  INDEX `idx_appointment_time`(`appointment_time`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  CONSTRAINT `fk_slot_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `t_schedule` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_slot_user` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 356 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '棰勭害鍙锋簮琛' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_appointment_slot
-- ----------------------------
INSERT INTO `t_appointment_slot` VALUES (1, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.070026', 1, 1, '2025-07-23 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (2, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 2, '2025-07-23 08:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (3, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 3, '2025-07-23 08:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (4, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 4, '2025-07-23 08:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (5, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 5, '2025-07-23 08:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (6, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 6, '2025-07-23 09:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (7, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 7, '2025-07-23 09:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (8, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 8, '2025-07-23 09:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (9, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 9, '2025-07-23 09:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (10, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.071023', 1, 10, '2025-07-23 09:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (11, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 11, '2025-07-23 10:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (12, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 12, '2025-07-23 10:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (13, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 13, '2025-07-23 10:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (14, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 14, '2025-07-23 10:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (15, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 15, '2025-07-23 10:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (16, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 16, '2025-07-23 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (17, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 17, '2025-07-23 11:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (18, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 18, '2025-07-23 11:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (19, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.072020', 1, 19, '2025-07-23 11:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (20, NULL, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.073017', 1, 20, '2025-07-23 11:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (67, 1, '2025-07-22 22:50:40.040441', b'1', 1, '2025-07-22 23:05:01.971414', 11, 1, '2025-07-27 06:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (68, 1, '2025-07-22 22:50:40.041440', b'1', 1, '2025-07-22 23:05:01.971414', 11, 2, '2025-07-27 06:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (69, 1, '2025-07-22 22:50:40.042436', b'1', 1, '2025-07-22 23:05:01.971414', 11, 3, '2025-07-27 07:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (70, 1, '2025-07-22 22:50:40.043433', b'1', 1, '2025-07-22 23:05:01.971414', 11, 4, '2025-07-27 07:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (71, 1, '2025-07-22 22:50:40.044431', b'1', 1, '2025-07-22 23:05:01.971414', 11, 5, '2025-07-27 07:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (72, 1, '2025-07-22 22:50:40.045968', b'1', 1, '2025-07-22 23:05:01.971414', 11, 6, '2025-07-27 07:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (73, 1, '2025-07-22 22:50:40.046880', b'1', 1, '2025-07-22 23:05:01.971414', 11, 7, '2025-07-27 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (74, 1, '2025-07-22 22:50:40.047713', b'1', 1, '2025-07-22 23:05:01.972409', 11, 8, '2025-07-27 08:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (75, 1, '2025-07-22 22:50:40.048714', b'1', 1, '2025-07-22 23:05:01.972409', 11, 9, '2025-07-27 08:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (76, 1, '2025-07-22 22:50:40.050710', b'1', 1, '2025-07-22 23:05:01.972409', 11, 10, '2025-07-27 08:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (77, 1, '2025-07-22 22:50:40.051707', b'1', 1, '2025-07-22 23:05:01.972409', 11, 11, '2025-07-27 09:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (78, 1, '2025-07-22 22:50:40.052702', b'1', 1, '2025-07-22 23:05:01.972409', 11, 12, '2025-07-27 09:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (79, 1, '2025-07-22 22:50:40.053779', b'1', 1, '2025-07-22 23:05:01.972409', 11, 13, '2025-07-27 09:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (80, 1, '2025-07-22 22:50:40.054579', b'1', 1, '2025-07-22 23:05:01.973373', 11, 14, '2025-07-27 09:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (81, 1, '2025-07-22 22:50:40.055578', b'1', 1, '2025-07-22 23:05:01.973373', 11, 15, '2025-07-27 10:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (82, 1, '2025-07-22 22:50:40.055578', b'1', 1, '2025-07-22 23:05:01.973373', 11, 16, '2025-07-27 10:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (83, 1, '2025-07-22 22:50:40.056576', b'1', 1, '2025-07-22 23:05:01.973373', 11, 17, '2025-07-27 10:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (84, 1, '2025-07-22 22:50:40.057573', b'1', 1, '2025-07-22 23:05:01.973373', 11, 18, '2025-07-27 10:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (85, 1, '2025-07-22 22:50:40.059049', b'1', 1, '2025-07-22 23:05:01.973373', 11, 19, '2025-07-27 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (86, 1, '2025-07-22 22:50:40.060050', b'1', 1, '2025-07-22 23:05:01.973373', 11, 20, '2025-07-27 11:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (107, 1, '2025-07-23 00:53:22.514934', b'0', 1, '2025-07-23 00:53:22.514934', 13, 1, '2025-07-25 07:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (108, 1, '2025-07-23 00:53:22.516675', b'0', 1, '2025-07-23 00:53:22.516675', 13, 2, '2025-07-25 07:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (109, 1, '2025-07-23 00:53:22.517677', b'0', 1, '2025-07-23 00:53:22.517677', 13, 3, '2025-07-25 07:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (110, 1, '2025-07-23 00:53:22.519017', b'0', 1, '2025-07-23 00:53:22.519017', 13, 4, '2025-07-25 07:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (111, 1, '2025-07-23 00:53:22.519017', b'0', 1, '2025-07-23 00:53:22.519017', 13, 5, '2025-07-25 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (112, 1, '2025-07-23 00:53:22.520017', b'0', 1, '2025-07-23 00:53:22.520017', 13, 6, '2025-07-25 08:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (113, 1, '2025-07-23 00:53:22.521015', b'0', 1, '2025-07-23 00:53:22.521015', 13, 7, '2025-07-25 08:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (114, 1, '2025-07-23 00:53:22.522012', b'0', 1, '2025-07-23 00:53:22.522012', 13, 8, '2025-07-25 08:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (115, 1, '2025-07-23 00:53:22.522012', b'0', 1, '2025-07-23 00:53:22.522012', 13, 9, '2025-07-25 09:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (116, 1, '2025-07-23 00:53:22.523009', b'0', 1, '2025-07-23 00:53:22.523009', 13, 10, '2025-07-25 09:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (117, 1, '2025-07-23 00:53:22.524007', b'0', 1, '2025-07-23 00:53:22.524007', 13, 11, '2025-07-25 09:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (118, 1, '2025-07-23 00:53:22.524840', b'0', 1, '2025-07-23 00:53:22.524840', 13, 12, '2025-07-25 09:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (119, 1, '2025-07-23 00:53:22.525846', b'0', 1, '2025-07-23 00:53:22.525846', 13, 13, '2025-07-25 10:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (120, 1, '2025-07-23 00:53:22.527835', b'0', 1, '2025-07-23 00:53:22.527835', 13, 14, '2025-07-25 10:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (121, 1, '2025-07-23 00:53:22.528867', b'0', 1, '2025-07-23 00:53:22.528867', 13, 15, '2025-07-25 10:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (122, 1, '2025-07-23 00:53:22.529839', b'0', 1, '2025-07-23 00:53:22.529839', 13, 16, '2025-07-25 10:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (123, 1, '2025-07-23 00:53:22.529839', b'0', 1, '2025-07-23 00:53:22.529839', 13, 17, '2025-07-25 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (124, 1, '2025-07-23 00:53:22.530828', b'0', 1, '2025-07-23 00:53:22.530828', 13, 18, '2025-07-25 11:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (125, 1, '2025-07-23 00:53:22.531825', b'0', 1, '2025-07-23 00:53:22.531825', 13, 19, '2025-07-25 11:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (126, 1, '2025-07-23 00:53:22.532962', b'0', 1, '2025-07-23 00:53:22.532962', 13, 20, '2025-07-25 11:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (127, 1, '2025-07-23 01:06:45.106388', b'0', 5, '2025-07-23 21:06:59.752571', 14, 1, '2025-07-25 07:00:00', 0, NULL, NULL, NULL, NULL, '不去了', '2025-07-23 21:06:59.745551');
INSERT INTO `t_appointment_slot` VALUES (128, 1, '2025-07-23 01:06:45.110381', b'0', 1, '2025-07-23 01:06:45.110381', 14, 2, '2025-07-25 07:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (129, 1, '2025-07-23 01:06:45.111375', b'0', 1, '2025-07-23 01:06:45.111375', 14, 3, '2025-07-25 07:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (130, 1, '2025-07-23 01:06:45.112374', b'0', 1, '2025-07-23 01:06:45.112374', 14, 4, '2025-07-25 07:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (131, 1, '2025-07-23 01:06:45.114367', b'0', 1, '2025-07-23 01:06:45.114367', 14, 5, '2025-07-25 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (132, 1, '2025-07-23 01:06:45.114367', b'0', 1, '2025-07-23 01:06:45.114367', 14, 6, '2025-07-25 08:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (133, 1, '2025-07-23 01:06:45.115397', b'0', 1, '2025-07-23 01:06:45.115397', 14, 7, '2025-07-25 08:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (134, 1, '2025-07-23 01:06:45.116393', b'0', 1, '2025-07-23 01:06:45.116393', 14, 8, '2025-07-25 08:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (135, 1, '2025-07-23 01:06:45.117360', b'0', 1, '2025-07-23 01:06:45.117360', 14, 9, '2025-07-25 09:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (136, 1, '2025-07-23 01:06:45.119354', b'0', 5, '2025-07-23 21:09:11.648227', 14, 10, '2025-07-25 09:15:00', 1, 5, '刘璐', '13566985623', 'APT20250723210911892', NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (137, 1, '2025-07-23 01:06:45.121349', b'0', 1, '2025-07-23 01:06:45.121349', 14, 11, '2025-07-25 09:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (138, 1, '2025-07-23 01:06:45.122346', b'0', 1, '2025-07-23 01:06:45.122346', 14, 12, '2025-07-25 09:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (139, 1, '2025-07-23 01:06:45.123344', b'0', 1, '2025-07-23 01:06:45.123344', 14, 13, '2025-07-25 10:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (140, 1, '2025-07-23 01:06:45.124341', b'0', 1, '2025-07-23 01:06:45.124341', 14, 14, '2025-07-25 10:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (141, 1, '2025-07-23 01:06:45.124341', b'0', 1, '2025-07-23 01:06:45.124341', 14, 15, '2025-07-25 10:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (142, 1, '2025-07-23 01:06:45.125337', b'0', 1, '2025-07-23 01:06:45.125337', 14, 16, '2025-07-25 10:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (143, 1, '2025-07-23 01:06:45.126335', b'0', 1, '2025-07-23 01:06:45.126335', 14, 17, '2025-07-25 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (144, 1, '2025-07-23 01:06:45.127456', b'0', 1, '2025-07-23 01:06:45.127456', 14, 18, '2025-07-25 11:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (145, 1, '2025-07-23 01:06:45.127456', b'0', 1, '2025-07-23 01:06:45.127456', 14, 19, '2025-07-25 11:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (146, 1, '2025-07-23 01:06:45.128456', b'0', 1, '2025-07-23 01:06:45.128456', 14, 20, '2025-07-25 11:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (147, 1, '2025-07-23 01:44:10.259957', b'0', 1, '2025-07-23 01:44:10.259957', 15, 1, '2025-07-26 07:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (148, 1, '2025-07-23 01:44:10.260954', b'0', 1, '2025-07-23 01:44:10.260954', 15, 2, '2025-07-26 07:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (149, 1, '2025-07-23 01:44:10.261951', b'0', 1, '2025-07-23 01:44:10.261951', 15, 3, '2025-07-26 07:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (150, 1, '2025-07-23 01:44:10.262947', b'0', 5, '2025-07-23 19:25:12.381629', 15, 4, '2025-07-26 07:45:00', 1, 5, '王玉', '15633562365', 'APT20250723192512114', NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (151, 1, '2025-07-23 01:44:10.263984', b'0', 1, '2025-07-23 01:44:10.263984', 15, 5, '2025-07-26 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (152, 1, '2025-07-23 01:44:10.263984', b'0', 1, '2025-07-23 01:44:10.263984', 15, 6, '2025-07-26 08:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (153, 1, '2025-07-23 01:44:10.264941', b'0', 1, '2025-07-23 01:44:10.264941', 15, 7, '2025-07-26 08:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (154, 1, '2025-07-23 01:44:10.265940', b'0', 1, '2025-07-23 01:44:10.265940', 15, 8, '2025-07-26 08:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (155, 1, '2025-07-23 01:44:10.266936', b'0', 1, '2025-07-23 01:44:10.266936', 15, 9, '2025-07-26 09:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (156, 1, '2025-07-23 01:44:10.266936', b'0', 1, '2025-07-23 01:44:10.266936', 15, 10, '2025-07-26 09:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (157, 1, '2025-07-23 01:44:10.267933', b'0', 1, '2025-07-23 01:44:10.267933', 15, 11, '2025-07-26 09:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (158, 1, '2025-07-23 01:44:10.268931', b'0', 1, '2025-07-23 01:44:10.268931', 15, 12, '2025-07-26 09:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (159, 1, '2025-07-23 01:44:10.269929', b'0', 1, '2025-07-23 01:44:10.269929', 15, 13, '2025-07-26 10:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (160, 1, '2025-07-23 01:44:10.269929', b'0', 1, '2025-07-23 01:44:10.269929', 15, 14, '2025-07-26 10:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (161, 1, '2025-07-23 01:44:10.272919', b'0', 1, '2025-07-23 01:44:10.272919', 15, 15, '2025-07-26 10:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (162, 1, '2025-07-23 01:44:10.273918', b'0', 1, '2025-07-23 01:44:10.273918', 15, 16, '2025-07-26 10:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (163, 1, '2025-07-23 01:44:10.273918', b'0', 1, '2025-07-23 01:44:10.273918', 15, 17, '2025-07-26 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (164, 1, '2025-07-23 01:44:10.274915', b'0', 1, '2025-07-23 01:44:10.274915', 15, 18, '2025-07-26 11:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (165, 1, '2025-07-23 01:44:10.275914', b'0', 1, '2025-07-23 01:44:10.275914', 15, 19, '2025-07-26 11:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (166, 1, '2025-07-23 01:44:10.277906', b'0', 1, '2025-07-23 01:44:10.277906', 15, 20, '2025-07-26 11:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (167, 1, '2025-07-24 11:51:13.395946', b'0', 1, '2025-07-24 11:51:13.395946', 6, 1, '2025-07-26 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (168, 1, '2025-07-24 11:51:13.400070', b'0', 1, '2025-07-24 11:51:13.400070', 6, 2, '2025-07-26 08:09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (169, 1, '2025-07-24 11:51:13.401072', b'0', 1, '2025-07-24 11:51:13.401072', 6, 3, '2025-07-26 08:18:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (170, 1, '2025-07-24 11:51:13.402069', b'0', 1, '2025-07-24 11:51:13.402069', 6, 4, '2025-07-26 08:27:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (171, 1, '2025-07-24 11:51:13.403417', b'0', 1, '2025-07-24 11:51:13.403417', 6, 5, '2025-07-26 08:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (172, 1, '2025-07-24 11:51:13.403417', b'0', 1, '2025-07-24 11:51:13.403417', 6, 6, '2025-07-26 08:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (173, 1, '2025-07-24 11:51:13.404417', b'0', 1, '2025-07-24 11:51:13.404417', 6, 7, '2025-07-26 08:54:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (174, 1, '2025-07-24 11:51:13.405415', b'0', 1, '2025-07-24 11:51:13.405415', 6, 8, '2025-07-26 09:03:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (175, 1, '2025-07-24 11:51:13.406165', b'0', 1, '2025-07-24 11:51:13.406165', 6, 9, '2025-07-26 09:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (176, 1, '2025-07-24 11:51:13.406165', b'0', 1, '2025-07-24 11:51:13.406165', 6, 10, '2025-07-26 09:21:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (177, 1, '2025-07-24 11:51:13.408163', b'0', 1, '2025-07-24 11:51:13.408163', 6, 11, '2025-07-26 09:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (178, 1, '2025-07-24 11:51:13.409159', b'0', 1, '2025-07-24 11:51:13.409159', 6, 12, '2025-07-26 09:39:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (179, 1, '2025-07-24 11:51:13.410156', b'0', 1, '2025-07-24 11:51:13.410156', 6, 13, '2025-07-26 09:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (180, 1, '2025-07-24 11:51:13.411154', b'0', 1, '2025-07-24 11:51:13.411154', 6, 14, '2025-07-26 09:57:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (181, 1, '2025-07-24 11:51:13.412151', b'0', 1, '2025-07-24 11:51:13.412151', 6, 15, '2025-07-26 10:06:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (182, 1, '2025-07-24 11:51:13.413150', b'0', 1, '2025-07-24 11:51:13.413150', 6, 16, '2025-07-26 10:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (183, 1, '2025-07-24 11:51:13.414146', b'0', 1, '2025-07-24 11:51:13.414146', 6, 17, '2025-07-26 10:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (184, 1, '2025-07-24 11:51:13.416146', b'0', 1, '2025-07-24 11:51:13.416146', 6, 18, '2025-07-26 10:33:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (185, 1, '2025-07-24 11:51:13.417139', b'0', 1, '2025-07-24 11:51:13.417139', 6, 19, '2025-07-26 10:42:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (186, 1, '2025-07-24 11:51:13.418136', b'0', 1, '2025-07-24 11:51:13.418136', 6, 20, '2025-07-26 10:51:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (187, 1, '2025-07-24 11:51:13.419133', b'0', 1, '2025-07-24 11:51:13.419133', 6, 21, '2025-07-26 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (188, 1, '2025-07-24 11:51:13.420129', b'0', 1, '2025-07-24 11:51:13.420129', 6, 22, '2025-07-26 11:09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (189, 1, '2025-07-24 11:51:13.421128', b'0', 1, '2025-07-24 11:51:13.421128', 6, 23, '2025-07-26 11:18:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (190, 1, '2025-07-24 11:51:13.422125', b'0', 1, '2025-07-24 11:51:13.422125', 6, 24, '2025-07-26 11:27:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (191, 1, '2025-07-24 11:51:13.423122', b'0', 1, '2025-07-24 11:51:13.423122', 6, 25, '2025-07-26 11:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (192, 1, '2025-07-24 11:51:19.249969', b'0', 1, '2025-07-24 11:51:19.249969', 7, 1, '2025-07-26 14:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (193, 1, '2025-07-24 11:51:19.251965', b'0', 1, '2025-07-24 11:51:19.251965', 7, 2, '2025-07-26 14:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (194, 1, '2025-07-24 11:51:19.253381', b'0', 1, '2025-07-24 11:51:19.253381', 7, 3, '2025-07-26 14:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (195, 1, '2025-07-24 11:51:19.254382', b'0', 1, '2025-07-24 11:51:19.254382', 7, 4, '2025-07-26 14:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (196, 1, '2025-07-24 11:51:19.255379', b'0', 1, '2025-07-24 11:51:19.255379', 7, 5, '2025-07-26 14:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (197, 1, '2025-07-24 11:51:19.256361', b'0', 1, '2025-07-24 11:51:19.256361', 7, 6, '2025-07-26 15:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (198, 1, '2025-07-24 11:51:19.256961', b'0', 1, '2025-07-24 11:51:19.256961', 7, 7, '2025-07-26 15:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (199, 1, '2025-07-24 11:51:19.257962', b'0', 1, '2025-07-24 11:51:19.257962', 7, 8, '2025-07-26 15:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (200, 1, '2025-07-24 11:51:19.257962', b'0', 1, '2025-07-24 11:51:19.257962', 7, 9, '2025-07-26 15:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (201, 1, '2025-07-24 11:51:19.258959', b'0', 1, '2025-07-24 11:51:19.258959', 7, 10, '2025-07-26 15:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (202, 1, '2025-07-24 11:51:19.259959', b'0', 1, '2025-07-24 11:51:19.259959', 7, 11, '2025-07-26 16:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (203, 1, '2025-07-24 11:51:19.261951', b'0', 1, '2025-07-24 11:51:19.261951', 7, 12, '2025-07-26 16:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (204, 1, '2025-07-24 11:51:19.262948', b'0', 1, '2025-07-24 11:51:19.262948', 7, 13, '2025-07-26 16:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (205, 1, '2025-07-24 11:51:19.263945', b'0', 1, '2025-07-24 11:51:19.263945', 7, 14, '2025-07-26 16:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (206, 1, '2025-07-24 11:51:19.264943', b'0', 1, '2025-07-24 11:51:19.264943', 7, 15, '2025-07-26 16:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (207, 1, '2025-07-24 11:51:19.265939', b'0', 1, '2025-07-24 11:51:19.265939', 7, 16, '2025-07-26 17:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (208, 1, '2025-07-24 11:51:19.266938', b'0', 1, '2025-07-24 11:51:19.266938', 7, 17, '2025-07-26 17:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (209, 1, '2025-07-24 11:51:19.267936', b'0', 1, '2025-07-24 11:51:19.267936', 7, 18, '2025-07-26 17:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (210, 1, '2025-07-24 11:51:19.268985', b'0', 1, '2025-07-24 11:51:19.268985', 7, 19, '2025-07-26 17:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (211, 1, '2025-07-24 11:51:19.269692', b'0', 1, '2025-07-24 11:51:19.269692', 7, 20, '2025-07-26 17:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (262, 1, '2025-07-24 11:52:02.941308', b'0', 1, '2025-07-24 11:52:02.941308', 5, 1, '2025-07-28 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (263, 1, '2025-07-24 11:52:02.942305', b'0', 1, '2025-07-24 11:52:02.942305', 5, 2, '2025-07-28 08:09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (264, 1, '2025-07-24 11:52:02.943301', b'0', 1, '2025-07-24 11:52:02.943301', 5, 3, '2025-07-28 08:18:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (265, 1, '2025-07-24 11:52:02.944299', b'0', 1, '2025-07-24 11:52:02.944299', 5, 4, '2025-07-28 08:27:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (266, 1, '2025-07-24 11:52:02.946293', b'0', 1, '2025-07-24 11:52:02.946293', 5, 5, '2025-07-28 08:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (267, 1, '2025-07-24 11:52:02.947291', b'0', 1, '2025-07-24 11:52:02.947291', 5, 6, '2025-07-28 08:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (268, 1, '2025-07-24 11:52:02.947291', b'0', 1, '2025-07-24 11:52:02.947291', 5, 7, '2025-07-28 08:54:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (269, 1, '2025-07-24 11:52:02.948287', b'0', 1, '2025-07-24 11:52:02.948287', 5, 8, '2025-07-28 09:03:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (270, 1, '2025-07-24 11:52:02.949285', b'0', 1, '2025-07-24 11:52:02.949285', 5, 9, '2025-07-28 09:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (271, 1, '2025-07-24 11:52:02.949285', b'0', 1, '2025-07-24 11:52:02.949285', 5, 10, '2025-07-28 09:21:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (272, 1, '2025-07-24 11:52:02.950282', b'0', 1, '2025-07-24 11:52:02.950282', 5, 11, '2025-07-28 09:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (273, 1, '2025-07-24 11:52:02.951280', b'0', 1, '2025-07-24 11:52:02.951280', 5, 12, '2025-07-28 09:39:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (274, 1, '2025-07-24 11:52:02.951280', b'0', 1, '2025-07-24 11:52:02.951280', 5, 13, '2025-07-28 09:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (275, 1, '2025-07-24 11:52:02.952277', b'0', 1, '2025-07-24 11:52:02.952277', 5, 14, '2025-07-28 09:57:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (276, 1, '2025-07-24 11:52:02.953274', b'0', 1, '2025-07-24 11:52:02.953274', 5, 15, '2025-07-28 10:06:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (277, 1, '2025-07-24 11:52:02.954272', b'0', 1, '2025-07-24 11:52:02.954272', 5, 16, '2025-07-28 10:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (278, 1, '2025-07-24 11:52:02.955269', b'0', 1, '2025-07-24 11:52:02.955269', 5, 17, '2025-07-28 10:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (279, 1, '2025-07-24 11:52:02.956266', b'0', 1, '2025-07-24 11:52:02.956266', 5, 18, '2025-07-28 10:33:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (280, 1, '2025-07-24 11:52:02.957264', b'0', 1, '2025-07-24 11:52:02.957264', 5, 19, '2025-07-28 10:42:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (281, 1, '2025-07-24 11:52:02.957264', b'0', 1, '2025-07-24 11:52:02.957264', 5, 20, '2025-07-28 10:51:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (282, 1, '2025-07-24 11:52:02.958261', b'0', 1, '2025-07-24 11:52:02.958261', 5, 21, '2025-07-28 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (283, 1, '2025-07-24 11:52:02.960257', b'0', 1, '2025-07-24 11:52:02.960257', 5, 22, '2025-07-28 11:09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (284, 1, '2025-07-24 11:52:02.962251', b'0', 1, '2025-07-24 11:52:02.962251', 5, 23, '2025-07-28 11:18:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (285, 1, '2025-07-24 11:52:02.963248', b'0', 1, '2025-07-24 11:52:02.963248', 5, 24, '2025-07-28 11:27:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (286, 1, '2025-07-24 11:52:02.964247', b'0', 1, '2025-07-24 11:52:02.964247', 5, 25, '2025-07-28 11:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (287, 1, '2025-07-24 11:52:13.042137', b'0', 1, '2025-07-24 11:52:13.042137', 8, 1, '2025-07-26 08:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (288, 1, '2025-07-24 11:52:13.044132', b'0', 1, '2025-07-24 11:52:13.044132', 8, 2, '2025-07-26 08:08:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (289, 1, '2025-07-24 11:52:13.046127', b'0', 1, '2025-07-24 11:52:13.046127', 8, 3, '2025-07-26 08:16:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (290, 1, '2025-07-24 11:52:13.048121', b'0', 1, '2025-07-24 11:52:13.048121', 8, 4, '2025-07-26 08:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (291, 1, '2025-07-24 11:52:13.049119', b'0', 1, '2025-07-24 11:52:13.049119', 8, 5, '2025-07-26 08:32:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (292, 1, '2025-07-24 11:52:13.051115', b'0', 1, '2025-07-24 11:52:13.051115', 8, 6, '2025-07-26 08:40:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (293, 1, '2025-07-24 11:52:13.053110', b'0', 1, '2025-07-24 11:52:13.053110', 8, 7, '2025-07-26 08:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (294, 1, '2025-07-24 11:52:13.055102', b'0', 1, '2025-07-24 11:52:13.055102', 8, 8, '2025-07-26 08:56:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (295, 1, '2025-07-24 11:52:13.056101', b'0', 1, '2025-07-24 11:52:13.056101', 8, 9, '2025-07-26 09:04:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (296, 1, '2025-07-24 11:52:13.057099', b'0', 1, '2025-07-24 11:52:13.057099', 8, 10, '2025-07-26 09:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (297, 1, '2025-07-24 11:52:13.058096', b'0', 1, '2025-07-24 11:52:13.058096', 8, 11, '2025-07-26 09:20:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (298, 1, '2025-07-24 11:52:13.059092', b'0', 1, '2025-07-24 11:52:13.059092', 8, 12, '2025-07-26 09:28:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (299, 1, '2025-07-24 11:52:13.060089', b'0', 1, '2025-07-24 11:52:13.060089', 8, 13, '2025-07-26 09:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (300, 1, '2025-07-24 11:52:13.061086', b'0', 1, '2025-07-24 11:52:13.061086', 8, 14, '2025-07-26 09:44:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (301, 1, '2025-07-24 11:52:13.063125', b'0', 5, '2025-07-24 13:35:43.180193', 8, 15, '2025-07-26 09:52:00', 1, 5, '王玉', '15633562365', 'APT20250724133543185', NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (302, 1, '2025-07-24 11:52:13.064078', b'0', 1, '2025-07-24 11:52:13.064078', 8, 16, '2025-07-26 10:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (303, 1, '2025-07-24 11:52:13.066088', b'0', 1, '2025-07-24 11:52:13.066088', 8, 17, '2025-07-26 10:08:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (304, 1, '2025-07-24 11:52:13.067103', b'0', 1, '2025-07-24 11:52:13.067103', 8, 18, '2025-07-26 10:16:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (305, 1, '2025-07-24 11:52:13.068067', b'0', 1, '2025-07-24 11:52:13.068067', 8, 19, '2025-07-26 10:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (306, 1, '2025-07-24 11:52:13.068067', b'0', 1, '2025-07-24 11:52:13.068067', 8, 20, '2025-07-26 10:32:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (307, 1, '2025-07-24 11:52:13.069064', b'0', 1, '2025-07-24 11:52:13.069064', 8, 21, '2025-07-26 10:40:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (308, 1, '2025-07-24 11:52:13.070062', b'0', 1, '2025-07-24 11:52:13.070062', 8, 22, '2025-07-26 10:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (309, 1, '2025-07-24 11:52:13.070062', b'0', 1, '2025-07-24 11:52:13.070062', 8, 23, '2025-07-26 10:56:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (310, 1, '2025-07-24 11:52:13.080035', b'0', 1, '2025-07-24 11:52:13.080035', 8, 24, '2025-07-26 11:04:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (311, 1, '2025-07-24 11:52:13.081033', b'0', 1, '2025-07-24 11:52:13.081033', 8, 25, '2025-07-26 11:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (312, 1, '2025-07-24 11:52:13.082030', b'0', 1, '2025-07-24 11:52:13.082030', 8, 26, '2025-07-26 11:20:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (313, 1, '2025-07-24 11:52:13.083027', b'0', 1, '2025-07-24 11:52:13.083027', 8, 27, '2025-07-26 11:28:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (314, 1, '2025-07-24 11:52:13.084089', b'0', 1, '2025-07-24 11:52:13.084089', 8, 28, '2025-07-26 11:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (315, 1, '2025-07-24 11:52:13.084089', b'0', 1, '2025-07-24 11:52:13.084089', 8, 29, '2025-07-26 11:44:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (316, 1, '2025-07-24 11:52:13.085091', b'0', 1, '2025-07-24 11:52:13.085091', 8, 30, '2025-07-26 11:52:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (317, 1, '2025-07-24 11:52:28.235686', b'0', 1, '2025-07-24 11:52:28.235686', 9, 1, '2025-07-27 14:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (318, 1, '2025-07-24 11:52:28.236684', b'0', 1, '2025-07-24 11:52:28.236684', 9, 2, '2025-07-27 14:09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (319, 1, '2025-07-24 11:52:28.238678', b'0', 1, '2025-07-24 11:52:28.238678', 9, 3, '2025-07-27 14:18:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (320, 1, '2025-07-24 11:52:28.239676', b'0', 1, '2025-07-24 11:52:28.239676', 9, 4, '2025-07-27 14:27:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (321, 1, '2025-07-24 11:52:28.240672', b'0', 1, '2025-07-24 11:52:28.240672', 9, 5, '2025-07-27 14:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (322, 1, '2025-07-24 11:52:28.241669', b'0', 1, '2025-07-24 11:52:28.241669', 9, 6, '2025-07-27 14:45:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (323, 1, '2025-07-24 11:52:28.243665', b'0', 1, '2025-07-24 11:52:28.243665', 9, 7, '2025-07-27 14:54:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (324, 1, '2025-07-24 11:52:28.244662', b'0', 1, '2025-07-24 11:52:28.244662', 9, 8, '2025-07-27 15:03:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (325, 1, '2025-07-24 11:52:28.246657', b'0', 1, '2025-07-24 11:52:28.246657', 9, 9, '2025-07-27 15:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (326, 1, '2025-07-24 11:52:28.247654', b'0', 1, '2025-07-24 11:52:28.247654', 9, 10, '2025-07-27 15:21:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (327, 1, '2025-07-24 11:52:28.249649', b'0', 1, '2025-07-24 11:52:28.249649', 9, 11, '2025-07-27 15:30:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (328, 1, '2025-07-24 11:52:28.250646', b'0', 1, '2025-07-24 11:52:28.250646', 9, 12, '2025-07-27 15:39:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (329, 1, '2025-07-24 11:52:28.253639', b'0', 1, '2025-07-24 11:52:28.253639', 9, 13, '2025-07-27 15:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (330, 1, '2025-07-24 11:52:28.254636', b'0', 1, '2025-07-24 11:52:28.254636', 9, 14, '2025-07-27 15:57:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (331, 1, '2025-07-24 11:52:28.256630', b'0', 1, '2025-07-24 11:52:28.256630', 9, 15, '2025-07-27 16:06:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (332, 1, '2025-07-24 11:52:28.257629', b'0', 1, '2025-07-24 11:52:28.257629', 9, 16, '2025-07-27 16:15:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (333, 1, '2025-07-24 11:52:28.259621', b'0', 1, '2025-07-24 11:52:28.259621', 9, 17, '2025-07-27 16:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (334, 1, '2025-07-24 11:52:28.260619', b'0', 1, '2025-07-24 11:52:28.260619', 9, 18, '2025-07-27 16:33:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (335, 1, '2025-07-24 11:52:28.262426', b'0', 1, '2025-07-24 11:52:28.262426', 9, 19, '2025-07-27 16:42:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (336, 1, '2025-07-24 11:52:28.263431', b'0', 1, '2025-07-24 11:52:28.263431', 9, 20, '2025-07-27 16:51:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (337, 1, '2025-07-24 11:52:28.264433', b'0', 1, '2025-07-24 11:52:28.264433', 9, 21, '2025-07-27 17:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (338, 1, '2025-07-24 11:52:28.265429', b'0', 1, '2025-07-24 11:52:28.265429', 9, 22, '2025-07-27 17:09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (339, 1, '2025-07-24 11:52:28.267423', b'0', 1, '2025-07-24 11:52:28.267423', 9, 23, '2025-07-27 17:18:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (340, 1, '2025-07-24 11:52:28.268421', b'0', 1, '2025-07-24 11:52:28.268421', 9, 24, '2025-07-27 17:27:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (341, 1, '2025-07-24 11:52:28.273407', b'0', 1, '2025-07-24 11:52:28.273407', 9, 25, '2025-07-27 17:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (342, 1, '2025-07-24 13:46:22.812591', b'0', 1, '2025-07-24 13:46:22.812591', 16, 1, '2025-07-25 07:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (343, 1, '2025-07-24 13:46:22.814583', b'0', 1, '2025-07-24 13:46:22.814583', 16, 2, '2025-07-25 07:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (344, 1, '2025-07-24 13:46:22.815580', b'0', 1, '2025-07-24 13:46:22.815580', 16, 3, '2025-07-25 07:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (345, 1, '2025-07-24 13:46:22.816577', b'0', 1, '2025-07-24 13:46:22.816577', 16, 4, '2025-07-25 08:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (346, 1, '2025-07-24 13:46:22.818573', b'0', 1, '2025-07-24 13:46:22.818573', 16, 5, '2025-07-25 08:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (347, 1, '2025-07-24 13:46:22.820567', b'0', 1, '2025-07-24 13:46:22.820567', 16, 6, '2025-07-25 09:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (348, 1, '2025-07-24 13:46:22.821565', b'0', 1, '2025-07-24 13:46:22.821565', 16, 7, '2025-07-25 09:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (349, 1, '2025-07-24 13:46:22.823560', b'0', 1, '2025-07-24 13:46:22.823560', 16, 8, '2025-07-25 09:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (350, 1, '2025-07-24 13:46:22.824557', b'0', 1, '2025-07-24 13:46:22.824557', 16, 9, '2025-07-25 10:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (351, 1, '2025-07-24 13:46:22.826551', b'0', 1, '2025-07-24 13:46:22.826551', 16, 10, '2025-07-25 10:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (352, 1, '2025-07-24 13:46:22.827548', b'0', 1, '2025-07-24 13:46:22.827548', 16, 11, '2025-07-25 11:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (353, 1, '2025-07-24 13:46:22.829543', b'0', 1, '2025-07-24 13:46:22.829543', 16, 12, '2025-07-25 11:24:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (354, 1, '2025-07-24 13:46:22.830540', b'0', 1, '2025-07-24 13:46:22.830540', 16, 13, '2025-07-25 11:48:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (355, 1, '2025-07-24 13:46:22.831537', b'0', 1, '2025-07-24 13:46:22.831537', 16, 14, '2025-07-25 12:12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_appointment_slot` VALUES (356, 1, '2025-07-24 13:46:22.833532', b'0', 1, '2025-07-24 13:46:22.833532', 16, 15, '2025-07-25 12:36:00', 0, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for t_consultation_message
-- ----------------------------
DROP TABLE IF EXISTS `t_consultation_message`;
CREATE TABLE `t_consultation_message`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `completion_tokens` int(0) NULL DEFAULT NULL,
  `consultation_id` bigint(0) NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prompt_tokens` int(0) NULL DEFAULT NULL,
  `sequence` int(0) NOT NULL,
  `type` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_consultation_message
-- ----------------------------
INSERT INTO `t_consultation_message` VALUES (1, 2, '2025-03-05 01:20:32.787332', b'0', 2, '2025-03-05 01:20:32.787332', NULL, 1, '我肚子疼', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (2, 2, '2025-03-05 01:26:08.506543', b'0', 2, '2025-03-05 01:26:08.506543', NULL, 2, '我肚子疼', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (3, 2, '2025-03-05 19:16:51.071447', b'0', 2, '2025-03-05 19:16:51.071447', NULL, 3, '我肚子疼', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (4, 2, '2025-03-05 19:21:26.103998', b'0', 2, '2025-03-05 19:21:26.103998', NULL, 4, '我肚子疼', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (5, 2, '2025-03-05 19:23:36.025363', b'0', 2, '2025-03-05 19:23:36.025363', NULL, 5, '我肚子疼', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (6, 2, '2025-03-05 19:24:09.111857', b'0', 2, '2025-03-05 19:24:09.111857', NULL, 5, '肚子疼是一个常见的症状，可能由多种原因引起。为了更准确地判断您的情况，请您提供一些额外的信息：\n\n1. **疼痛的具体位置**：是上腹部、下腹部还是肚脐周围？\n2. **疼痛的性质**：是钝痛、刺痛还是绞痛？持续性的还是间歇性的？\n3. **伴随症状**：比如是否有恶心呕吐、发热、腹泻或便秘等其他不适？\n4. **饮食习惯**：最近是否吃过不干净的食物或是辛辣刺激性食物？\n5. **生活方式**：近期是否有较大压力或睡眠不足？\n\n根据您提供的信息，这里有一些常见原因可能导致腹痛：\n- 消化不良\n- 胃肠炎（可能由病毒或细菌感染引起）\n- 肠胃功能紊乱\n- 食物中毒\n- 月经期间（如果是女性）\n\n### 初步建议\n- 尝试休息，并观察症状是否会有所缓解。\n- 如果感到不适，可以尝试喝些温水。\n- 注意饮食清淡，避免油腻和难以消化的食物。\n\n### 是否需要及时就医\n如果出现以下任何一种情况，请立即前往医院就诊：\n- 疼痛非常剧烈且持续加剧\n- 出现高热（体温超过38.5°C）\n- 明显的血便或黑色粪便\n- 呕吐频繁无法停止\n- 伴有严重的脱水迹象（如尿量明显减少、口渴增加）\n\n希望这些建议对您有所帮助。不过请注意，我的建议不能代替专业医生的诊断。如果症状持续或者加重，请尽快就医。', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (7, 2, '2025-03-05 19:25:32.350882', b'0', 2, '2025-03-05 19:25:32.350882', NULL, 5, '帮我开一点肚子疼相关的药', NULL, 3, 0);
INSERT INTO `t_consultation_message` VALUES (8, 2, '2025-03-05 19:26:11.503636', b'0', 2, '2025-03-05 19:26:11.503636', NULL, 5, '在没有详细了解您的具体症状和健康状况之前，我不能直接为您开具药物。不过，我可以根据一些常见的肚子疼原因提供一些建议性的非处方药物。请注意，这些建议仅供参考，最好在使用任何药物前咨询医生或药师。\n\n### 常见的非处方药物\n\n1. **抗酸药**：\n   - **奥美拉唑**（Omeprazole）：用于胃酸过多引起的胃痛。\n   - **铝碳酸镁**（Aluminum Magnesium Carbonate）：用于缓解胃酸过多、胃灼热等症状。\n\n2. **解痉药**：\n   - **颠茄片**（Belladonna Alkaloids）：用于缓解胃肠平滑肌痉挛引起的疼痛。\n   - **山莨菪碱**（Anisodamine）：用于缓解胃肠绞痛。\n\n3. **止泻药**：\n   - **洛哌丁胺**（Loperamide）：用于控制腹泻。\n   - **蒙脱石散**（Diosmectite）：用于吸附肠道内的有害物质，减轻腹泻。\n\n4. **益生菌**：\n   - **双歧杆菌**（Bifidobacterium）：帮助调节肠道菌群，适用于消化不良和肠胃功能紊乱。\n\n5. **消炎止痛药**：\n   - **布洛芬**（Ibuprofen）：用于缓解轻至中度的腹痛，但要注意不要长期大量使用，以免引起胃肠道副作用。\n\n### 用药注意事项\n- **严格按照说明书或医嘱用药**：不要随意增减剂量。\n- **注意药物相互作用**：如果您正在服用其他药物，请咨询医生或药师。\n- **过敏史**：如果您对某些药物成分过敏，请避免使用。\n- **特殊人群**：孕妇、哺乳期妇女、儿童及老年人应在医生指导下使用。\n\n### 最后提醒\n如果您的腹痛持续不缓解，或者伴有其他严重症状（如高热、呕吐、血便等），请务必及时就医，以便得到准确的诊断和治疗。希望您早日康复！', NULL, 4, 1);
INSERT INTO `t_consultation_message` VALUES (9, 2, '2025-03-05 19:26:59.832911', b'0', 2, '2025-03-05 19:26:59.832911', NULL, 5, '帮我开一点肚子疼相关的药，我应该是吃坏肚子了', NULL, 5, 0);
INSERT INTO `t_consultation_message` VALUES (10, 2, '2025-03-05 19:27:26.640200', b'0', 2, '2025-03-05 19:27:26.640200', NULL, 5, '如果您怀疑自己是吃坏肚子了，可能是食物中毒或胃肠炎引起的腹痛。在这种情况下，可以考虑使用一些非处方药物来缓解症状。以下是一些建议的药物和措施：\n\n### 常见的非处方药物\n\n1. **止泻药**：\n   - **洛哌丁胺**（Loperamide，商品名：Imodium）：用于控制腹泻。请按照说明书上的剂量使用。\n   - **蒙脱石散**（Diosmectite，商品名：思密达）：用于吸附肠道内的有害物质，减轻腹泻。\n\n2. **益生菌**：\n   - **双歧杆菌**（Bifidobacterium）：帮助调节肠道菌群，促进消化。常见的品牌有“妈咪爱”、“整肠生”等。\n\n3. **解痉药**：\n   - **颠茄片**（Belladonna Alkaloids）：用于缓解胃肠平滑肌痉挛引起的疼痛。\n   - **山莨菪碱**（Anisodamine）：用于缓解胃肠绞痛。\n\n4. **抗酸药**：\n   - **铝碳酸镁**（Aluminum Magnesium Carbonate，商品名：达喜）：用于缓解胃酸过多、胃灼热等症状。\n\n### 用药注意事项\n- **严格按照说明书或医嘱用药**：不要随意增减剂量。\n- **注意药物相互作用**：如果您正在服用其他药物，请咨询医生或药师。\n- **过敏史**：如果您对某些药物成分过敏，请避免使用。\n- **特殊人群**：孕妇、哺乳期妇女、儿童及老年人应在医生指导下使用。\n\n### 其他建议\n1. **多喝水**：保持充足的水分摄入，防止脱水。\n2. **清淡饮食**：暂时避免油腻、辛辣、高纤维的食物，选择容易消化的食物，如稀饭、面条等。\n3. **休息**：适当休息，减少身体负担。\n\n### 是否需要就医\n如果出现以下情况，请及时就医：\n- 腹痛非常剧烈且持续加剧\n- 高热（体温超过38.5°C）\n- 明显的血便或黑色粪便\n- 呕吐频繁无法停止\n- 伴有严重的脱水迹象（如尿量明显减少、口渴增加）\n\n希望这些建议对您有所帮助。请注意，这些药物和措施仅供参考，最好在使用任何药物前咨询医生或药师。如果症状持续或者加重，请尽快就医。祝您早日康复！', NULL, 6, 1);
INSERT INTO `t_consultation_message` VALUES (11, 2, '2025-03-05 19:40:42.066074', b'0', 2, '2025-03-05 19:40:42.066074', NULL, 5, '帮我开一点肚子疼相关的药，我应该是吃坏肚子了', NULL, 7, 0);
INSERT INTO `t_consultation_message` VALUES (12, 2, '2025-03-05 19:41:27.546924', b'0', 2, '2025-03-05 19:41:27.546924', NULL, 5, '如果您怀疑自己是吃坏肚子了，可能是食物中毒或胃肠炎引起的腹痛。在这种情况下，可以考虑使用一些非处方药物来缓解症状。以下是一些建议的药物和措施：\n\n### 常见的非处方药物\n\n1. **止泻药**：\n   - **洛哌丁胺**（Loperamide，商品名：Imodium）：用于控制腹泻。成人每次2毫克，每日不超过8毫克。\n   - **蒙脱石散**（Diosmectite，商品名：思密达）：用于吸附肠道内的有害物质，减轻腹泻。成人每次3克，每日3次。\n\n2. **益生菌**：\n   - **双歧杆菌**（Bifidobacterium）：帮助调节肠道菌群，促进消化。常见的品牌有“妈咪爱”、“整肠生”等。按照说明书上的剂量服用。\n\n3. **解痉药**：\n   - **颠茄片**（Belladonna Alkaloids）：用于缓解胃肠平滑肌痉挛引起的疼痛。成人每次1-2片，每日3次。\n   - **山莨菪碱**（Anisodamine，商品名：654-2）：用于缓解胃肠绞痛。成人每次10-20毫克，每日3次。\n\n4. **抗酸药**：\n   - **铝碳酸镁**（Aluminum Magnesium Carbonate，商品名：达喜）：用于缓解胃酸过多、胃灼热等症状。成人每次1-2片，每日3次。\n\n### 用药注意事项\n- **严格按照说明书或医嘱用药**：不要随意增减剂量。\n- **注意药物相互作用**：如果您正在服用其他药物，请咨询医生或药师。\n- **过敏史**：如果您对某些药物成分过敏，请避免使用。\n- **特殊人群**：孕妇、哺乳期妇女、儿童及老年人应在医生指导下使用。\n\n### 其他建议\n1. **多喝水**：保持充足的水分摄入，防止脱水。可以喝一些温开水或淡盐水。\n2. **清淡饮食**：暂时避免油腻、辛辣、高纤维的食物，选择容易消化的食物，如稀饭、面条、蒸蛋等。\n3. **休息**：适当休息，减少身体负担。\n\n### 是否需要就医\n如果出现以下情况，请及时就医：\n- 腹痛非常剧烈且持续加剧\n- 高热（体温超过38.5°C）\n- 明显的血便或黑色粪便\n- 呕吐频繁无法停止\n- 伴有严重的脱水迹象（如尿量明显减少、口渴增加）\n\n希望这些建议对您有所帮助。请注意，这些药物和措施仅供参考，最好在使用任何药物前咨询医生或药师。如果症状持续或者加重，请尽快就医。祝您早日康复！', NULL, 8, 1);
INSERT INTO `t_consultation_message` VALUES (13, 2, '2025-03-05 19:44:06.809690', b'0', 2, '2025-03-05 19:44:06.809690', NULL, 6, '我要开发一个医疗百科系统，应该采用什么风格', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (14, 2, '2025-03-05 19:44:38.655040', b'0', 2, '2025-03-05 19:44:38.655040', NULL, 6, '开发一个医疗百科系统时，选择合适的风格非常重要，这不仅关乎用户体验，还直接影响信息传达的有效性和准确性。以下是一些建议供您参考：\n\n1. **专业性与易读性的平衡**：内容上既要有足够的科学依据支持，确保信息的专业性和准确性，同时也要注意语言的通俗化处理，使得非专业人士也能容易理解。可以考虑采用问答形式、常见问题解答等方法来简化复杂概念。\n\n2. **简洁明快的设计风格**：界面设计应追求清晰、直观，避免过多复杂的装饰元素干扰用户获取信息。合理布局导航栏、搜索框等功能区域，让用户能够快速找到所需资料。\n\n3. **友好的交互体验**：增强系统的互动性，比如设置在线咨询服务、患者故事分享区等，让访问者感到更加贴近实际生活场景。同时保证网站或应用程序运行流畅无卡顿，提高用户满意度。\n\n4. **视觉上的舒适感**：使用温和而不失活力的颜色搭配，如浅蓝、绿色等给人以安心之感；字体大小适中且易于阅读；适当添加图标或者插图帮助说明文本内容，但不宜过于花哨以免分散注意力。\n\n5. **注重隐私保护**：对于涉及到个人健康信息的部分，必须严格遵守相关法律法规要求，明确告知用户数据收集范围及用途，并采取有效措施保障信息安全。\n\n6. **持续更新维护**：医学知识不断进步发展，因此需要定期对内容进行审查和更新，确保所提供的信息始终处于最新状态。\n\n总之，在构建医疗百科平台时，应当坚持以人为本的原则，从目标受众的实际需求出发，结合上述各方面因素综合考量，打造出既有深度又不失温度的产品。', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (15, 1, '2025-03-07 23:16:06.275432', b'0', 1, '2025-03-07 23:16:06.275432', NULL, 7, '我感冒了', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (16, 1, '2025-03-07 23:16:25.584023', b'0', 1, '2025-03-07 23:16:25.584023', NULL, 7, '您好！感冒是一种常见的呼吸道疾病，通常由病毒引起。根据您的描述，您可能正在经历以下一些症状：流鼻涕、打喷嚏、喉咙痛、咳嗽、轻微发热等。这些都是普通感冒的典型表现。\n\n### 可能的原因\n- **病毒感染**：大部分感冒是由冠状病毒、流感病毒或鼻病毒引起的。\n- **季节变化**：天气转冷或换季时，人体抵抗力下降，容易感染。\n- **免疫力低**：当身体疲劳过度或者营养不良时，也更容易患上感冒。\n\n### 初步建议\n1. **充分休息**：保证足够的睡眠时间，让身体有精力对抗病毒。\n2. **多喝水**：保持体内水分充足有助于缓解喉咙干燥不适。\n3. **适当使用药物**：可以考虑服用非处方药如解热镇痛剂（例如对乙酰氨基酚）来缓解症状，但请按照说明或咨询药师后使用。\n4. **注意保暖**：根据天气变化适时增减衣物，避免着凉加重病情。\n5. **饮食清淡**：多吃蔬菜水果补充维生素C，少吃油腻食物。\n\n### 是否需要就医\n- 如果只是轻微的感冒症状，并且没有持续恶化的情况，一般不需要特别去医院就诊。\n- 但如果出现高烧不退（体温超过38.5°C）、呼吸困难、持续性头痛或其他严重症状，则应该尽快去医院就诊，以便得到更专业的治疗指导。\n\n希望这些建议能够帮助到您，祝您早日康复！如果还有其他问题，欢迎继续询问。', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (17, 1, '2025-03-07 23:16:44.394245', b'0', 1, '2025-03-07 23:16:44.394245', NULL, 8, '我感冒了', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (18, 1, '2025-03-07 23:17:00.433801', b'0', 1, '2025-03-07 23:17:00.433801', NULL, 8, '感冒是一种常见的上呼吸道感染，通常由病毒引起。您可能经历的症状包括流鼻涕、打喷嚏、喉咙痛、咳嗽、轻微的头痛或身体疼痛等。有时还可能会有轻微发热。基于您的描述“我感冒了”，但没有提供更具体的症状信息，以下是一些一般性的建议：\n\n1. **保持休息**：确保自己有足够的休息时间来帮助身体恢复。\n2. **多喝水**：保持充足的水分可以帮助缓解喉咙痛和咳嗽。\n3. **适当用药**：可以考虑使用非处方药物来缓解症状，如解热镇痛药（对乙酰氨基酚）、止咳糖浆或者抗组胺药物以减轻打喷嚏和流鼻涕等症状。但在使用任何药物之前，请仔细阅读说明书，并按照推荐剂量服用。\n4. **注意个人卫生**：勤洗手，使用纸巾遮挡口鼻当打喷嚏或咳嗽时，避免与他人密切接触以减少传播风险。\n\n如果出现以下情况之一，则建议尽快就医：\n- 持续高烧不退\n- 呼吸困难\n- 症状持续恶化或超过一周不见好转\n- 严重的头痛、胸痛或其他异常体征\n\n请根据自身状况判断是否需要寻求专业医生的帮助。希望您早日康复！', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (19, 1, '2025-03-07 23:19:10.894538', b'0', 1, '2025-03-07 23:19:10.894538', NULL, 9, '我感冒了', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (20, 1, '2025-03-07 23:19:31.307415', b'0', 1, '2025-03-07 23:19:31.307415', NULL, 9, '您好！感冒是由病毒引起的一种常见的呼吸道疾病，主要症状包括打喷嚏、鼻塞、流鼻涕、喉咙痛、咳嗽、轻微头痛和身体不适等。有时还可能伴有低烧或轻度的肌肉疼痛。\n\n### 可能的病因\n- **病毒感染**：最常见的原因是冠状病毒、流感病毒或者鼻病毒等。\n- **环境因素**：天气变化、过度疲劳、免疫力下降等也可能成为诱因。\n\n### 初步建议\n1. **休息充足**：保证足够的睡眠时间，帮助身体恢复。\n2. **多喝水**：保持良好的水分状态有助于缓解咽喉不适，并促进体内毒素排出。\n3. **饮食清淡**：选择易于消化的食物，如粥类、蔬菜水果等。\n4. **适当保暖**：根据气温调整着装，避免受凉加重病情。\n5. **使用药物缓解症状**：如果感到非常不舒服，可以考虑使用非处方药来减轻症状（例如解热镇痛药），但请按照说明或药师指导服用。\n\n### 是否需要及时就医\n- 如果是普通感冒且没有其他严重并发症的话，通常不需要特别去医院治疗，通过上述自我护理措施可以在一周左右自然好转。\n- 但是，如果出现高烧不退（成人超过38.5°C）、持续性胸痛、呼吸困难、极度乏力等症状时，则应尽快就医寻求专业帮助，以排除是否为更严重的疾病如肺炎等。\n\n希望您早日康复！如果有任何疑问或症状加剧，请及时联系医生。', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (21, 1, '2025-03-07 23:31:31.072472', b'0', 1, '2025-03-07 23:31:31.072472', NULL, 10, '213', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (22, 1, '2025-03-07 23:31:37.315502', b'0', 1, '2025-03-07 23:31:37.315502', NULL, 10, '您好！看起来您输入的是数字213，但没有提供具体的症状或健康问题。如果您有任何身体上的不适或者健康方面的疑问，请详细描述一下，比如哪里不舒服、持续了多久、有没有其他伴随的症状等信息，这样我才能更好地为您提供帮助和建议。如果这是一个误输入，请告诉我您真正想要咨询的问题。', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (23, 1, '2025-03-07 23:31:50.098380', b'0', 1, '2025-03-07 23:31:50.098380', NULL, 10, '我肚子不舒服', NULL, 3, 0);
INSERT INTO `t_consultation_message` VALUES (24, 1, '2025-03-07 23:32:04.249325', b'0', 1, '2025-03-07 23:32:04.249325', NULL, 10, '您好！肚子不舒服是一个比较常见的症状，可能由多种原因引起。为了更好地帮助您，我需要了解一些更详细的信息：\n\n1. **具体症状**：是持续的疼痛还是间歇性的？疼痛的性质是什么样的（例如钝痛、绞痛、刺痛等）？\n2. **位置**：疼痛主要在哪个部位？上腹部、下腹部、肚脐周围还是其他地方？\n3. **伴随症状**：有没有恶心、呕吐、腹泻、便秘、发热等症状？\n4. **饮食情况**：最近有没有吃不干净的食物或者有过暴饮暴食的情况？\n5. **病史**：以前有没有类似的症状？有没有慢性疾病或者正在服用的药物？\n\n根据这些信息，我可以给您一个初步的建议。但请注意，我的建议不能替代专业医生的诊断和治疗。\n\n如果您的症状非常严重或持续时间较长，建议尽快就医，以便得到及时的诊断和治疗。', NULL, 4, 1);
INSERT INTO `t_consultation_message` VALUES (25, 1, '2025-03-07 23:42:41.348064', b'0', 1, '2025-03-07 23:42:41.348064', NULL, 11, '你好', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (26, 1, '2025-03-07 23:42:43.908669', b'0', 1, '2025-03-07 23:42:43.908669', NULL, 11, '你好！有什么健康方面的问题我可以帮助你吗？如果你有任何症状或健康上的疑问，欢迎告诉我。', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (27, 1, '2025-03-07 23:43:33.239171', b'0', 1, '2025-03-07 23:43:33.239171', NULL, 11, '我吃坏肚子里，该买点什么药', NULL, 3, 0);
INSERT INTO `t_consultation_message` VALUES (28, 1, '2025-03-07 23:43:49.079963', b'0', 1, '2025-03-07 23:43:49.079963', NULL, 11, '你好！如果你出现了吃坏肚子的症状，比如腹痛、腹泻、恶心或呕吐等，可以考虑以下建议：\n\n1. **补充水分和电解质**：首先，重要的是要防止脱水。你可以购买一些口服补液盐（ORS）来补充流失的水分和电解质。如果买不到专门的补液盐，也可以通过喝清水、稀释后的果汁或是运动饮料来补充。\n\n2. **止泻药物**：对于轻度至中度的腹泻，药店有售的一些非处方止泻药如洛哌丁胺（易蒙停）可以帮助缓解症状。但是请注意，这类药物不适合所有人使用，特别是儿童和孕妇应谨慎使用，并且在严重情况下不推荐使用，因为它可能会延长病原体排出的时间。\n\n3. **益生菌**：某些情况下，服用益生菌制剂有助于恢复肠道正常菌群平衡，从而改善消化道不适。\n\n4. **注意饮食**：在肠胃不适期间，尽量选择容易消化的食物，如白粥、煮土豆、馒头等清淡食品，避免油腻、辛辣及难以消化的食物。\n\n请记住这些建议不能代替专业医疗意见。如果出现以下情况之一，请立即就医：\n- 持续高烧\n- 严重的腹痛\n- 血便\n- 脱水迹象（如尿量明显减少、极度口渴）\n- 症状持续超过两天没有好转\n\n希望你早日康复！如果有其他问题或者症状加重，请尽快联系医生。', NULL, 4, 1);
INSERT INTO `t_consultation_message` VALUES (29, 1, '2025-03-07 23:59:28.358846', b'0', 1, '2025-03-07 23:59:28.358846', NULL, 11, '今天是星期几', NULL, 5, 0);
INSERT INTO `t_consultation_message` VALUES (30, 1, '2025-03-07 23:59:32.924391', b'0', 1, '2025-03-07 23:59:32.924391', NULL, 11, '今天是星期几取决于你查看这条信息的具体日期。你可以查看手机、电脑或其他设备上的日历或时钟来确认今天的具体日期和星期。\n\n如果你告诉我具体的日期，我也可以帮你确定那天是星期几。', NULL, 6, 1);
INSERT INTO `t_consultation_message` VALUES (31, 1, '2025-03-08 00:07:26.664637', b'0', 1, '2025-03-08 00:07:26.664637', NULL, 11, '疾病分类有哪几类', NULL, 7, 0);
INSERT INTO `t_consultation_message` VALUES (32, 1, '2025-03-08 00:08:06.239867', b'0', 1, '2025-03-08 00:08:06.239867', NULL, 11, '疾病分类是一个复杂而详细的过程，通常根据病因、病理生理机制、受影响的器官系统等因素进行划分。以下是一些常见的疾病分类：\n\n1. **感染性疾病**：\n   - 细菌感染\n   - 病毒感染\n   - 真菌感染\n   - 寄生虫感染\n\n2. **非感染性疾病**：\n   - **心血管疾病**：如冠心病、高血压、心肌梗死等\n   - **呼吸系统疾病**：如哮喘、慢性阻塞性肺疾病（COPD）、肺炎等\n   - **消化系统疾病**：如胃炎、胃溃疡、肠炎、肝炎等\n   - **神经系统疾病**：如脑卒中、帕金森病、癫痫、多发性硬化症等\n   - **内分泌和代谢疾病**：如糖尿病、甲状腺功能亢进或减退、肥胖症等\n   - **血液系统疾病**：如贫血、白血病、淋巴瘤等\n   - **免疫系统疾病**：如类风湿关节炎、系统性红斑狼疮、过敏性疾病等\n   - **肿瘤**：包括良性肿瘤和恶性肿瘤（癌症）\n   - **骨骼肌肉系统疾病**：如骨质疏松、关节炎、骨折等\n   - **泌尿系统疾病**：如肾炎、尿路感染、肾结石等\n   - **皮肤疾病**：如湿疹、银屑病、荨麻疹等\n   - **眼科疾病**：如青光眼、白内障、视网膜病变等\n   - **耳鼻喉科疾病**：如中耳炎、鼻窦炎、扁桃体炎等\n   - **精神心理疾病**：如抑郁症、焦虑症、精神分裂症等\n\n3. **遗传性疾病**：\n   - 单基因遗传病\n   - 多基因遗传病\n   - 染色体异常引起的疾病\n\n4. **环境因素引起的疾病**：\n   - 职业病（如尘肺病、铅中毒等）\n   - 与生活方式相关的疾病（如吸烟引起的肺癌、饮酒引起的肝硬化等）\n\n5. **营养缺乏性疾病**：\n   - 如维生素A缺乏导致的夜盲症\n   - 缺铁性贫血\n\n6. **自身免疫性疾病**：\n   - 如类风湿关节炎、系统性红斑狼疮、多发性硬化症等\n\n这些分类并不是完全独立的，很多疾病可能涉及多个系统或多种因素。医学上的分类体系也在不断发展和完善，以更好地理解和治疗各种疾病。如果你有具体的症状或健康问题，建议咨询医生以获得更准确的诊断和治疗建议。', NULL, 8, 1);
INSERT INTO `t_consultation_message` VALUES (33, 1, '2025-03-08 00:10:44.302448', b'0', 1, '2025-03-08 00:10:44.302448', NULL, 11, '请你  举几个  自身免疫性疾病 的例子', NULL, 9, 0);
INSERT INTO `t_consultation_message` VALUES (34, 1, '2025-03-08 00:11:07.586696', b'0', 1, '2025-03-08 00:11:07.586696', NULL, 11, '当然，自身免疫性疾病是指机体的免疫系统错误地攻击自身的正常组织和器官，导致炎症和损伤。以下是一些常见的自身免疫性疾病的例子：\n\n1. **类风湿关节炎 (Rheumatoid Arthritis, RA)**：\n   - 影响关节，导致疼痛、肿胀和僵硬。\n   - 也可能影响其他器官，如心脏、肺和眼睛。\n\n2. **系统性红斑狼疮 (Systemic Lupus Erythematosus, SLE)**：\n   - 可以影响多个器官和系统，包括皮肤、关节、肾脏、心脏、肺和大脑。\n   - 常见症状包括皮疹、关节痛、疲劳和发热。\n\n3. **多发性硬化症 (Multiple Sclerosis, MS)**：\n   - 影响中枢神经系统（大脑和脊髓）。\n   - 症状包括肌肉无力、视力问题、平衡和协调障碍以及感觉异常。\n\n4. **1型糖尿病 (Type 1 Diabetes)**：\n   - 免疫系统攻击胰腺中的胰岛细胞，导致胰岛素分泌不足。\n   - 需要终身注射胰岛素来控制血糖水平。\n\n5. **克罗恩病 (Crohn\'s Disease)** 和 **溃疡性结肠炎 (Ulcerative Colitis)**：\n   - 这两种疾病都属于炎症性肠病 (Inflammatory Bowel Disease, IBD)。\n   - 导致肠道炎症，引起腹痛、腹泻、便血等症状。\n\n6. **甲状腺自身免疫性疾病**：\n   - **格雷夫斯病 (Graves\' Disease)**：导致甲状腺功能亢进，表现为心悸、体重下降、焦虑等。\n   - **桥本氏甲状腺炎 (Hashimoto\'s Thyroiditis)**：导致甲状腺功能减退，表现为疲劳、体重增加、便秘等。\n\n7. **银屑病 (Psoriasis)**：\n   - 主要影响皮肤，导致红色斑块和银白色鳞屑。\n   - 有时也会伴随关节炎（银屑病关节炎）。\n\n8. **重症肌无力 (Myasthenia Gravis)**：\n   - 影响神经与肌肉之间的信号传递，导致肌肉无力和疲劳，尤其是眼睑下垂和复视。\n\n9. **干燥综合征 (Sjögren\'s Syndrome)**：\n   - 影响泪腺和唾液腺，导致口干和眼干。\n   - 也可能影响其他器官，如肺、肾和消化系统。\n\n10. **硬皮病 (Scleroderma)**：\n    - 皮肤和内脏器官的结缔组织变厚和硬化。\n    - 症状包括皮肤紧绷、手指肿胀、关节疼痛等。\n\n这些疾病的具体表现和严重程度因人而异，诊断通常需要综合临床症状、实验室检查和影像学检查。如果你怀疑自己或家人患有某种自身免疫性疾病，建议尽快咨询医生进行进一步的评估和治疗。', NULL, 10, 1);
INSERT INTO `t_consultation_message` VALUES (35, 1, '2025-03-08 00:54:09.742226', b'0', 1, '2025-03-08 00:54:09.742226', NULL, 11, '是否结束问诊', NULL, 11, 0);
INSERT INTO `t_consultation_message` VALUES (36, 1, '2025-03-08 00:54:13.819563', b'0', 1, '2025-03-08 00:54:13.819563', NULL, 11, '好的，如果你没有其他问题或需要进一步的帮助，我们可以结束这次问诊。如果你将来有任何健康方面的疑问或需要更多的建议，随时欢迎你再来咨询。希望你保持健康！如果有任何紧急情况，请及时就医。祝你一切顺利！', NULL, 12, 1);
INSERT INTO `t_consultation_message` VALUES (37, 1, '2025-03-08 00:57:09.347356', b'0', 1, '2025-03-08 00:57:09.347356', NULL, 11, '如何添加结束问诊功能', NULL, 13, 0);
INSERT INTO `t_consultation_message` VALUES (38, 1, '2025-03-08 00:57:18.228494', b'0', 1, '2025-03-08 00:57:18.228494', NULL, 11, '在我们的对话中，你可以随时告诉我你是否结束了问诊。如果你希望有一个更正式的结束方式，可以使用以下几种方法之一：\n\n1. **明确告知**：直接告诉我“结束问诊”或“谢谢，没有其他问题了”。\n2. **使用特定关键词**：比如“再见”、“感谢”等，我会理解为你结束了问诊。\n\n例如：\n- 你可以输入：“结束问诊，谢谢。”\n- 或者输入：“谢谢，没有其他问题了。”\n\n这样我就会知道你可以结束了，并且会给你一个简短的告别和祝福。\n\n如果你有其他具体的需求或希望添加某种功能，请告诉我，我会尽力帮助你。再次感谢你的咨询，祝你健康！', NULL, 14, 1);
INSERT INTO `t_consultation_message` VALUES (39, 1, '2025-03-08 00:59:57.001859', b'0', 1, '2025-03-08 00:59:57.001859', NULL, 11, '结束问诊', NULL, 15, 0);
INSERT INTO `t_consultation_message` VALUES (40, 1, '2025-03-08 00:59:59.187850', b'0', 1, '2025-03-08 00:59:59.187850', NULL, 11, '好的，感谢你的咨询。如果你将来有任何健康方面的问题或需要进一步的帮助，随时欢迎你再来咨询。祝你健康！再见！', NULL, 16, 1);
INSERT INTO `t_consultation_message` VALUES (41, 1, '2025-03-08 01:00:05.664819', b'0', 1, '2025-03-08 01:00:05.664819', NULL, 11, '你好', NULL, 17, 0);
INSERT INTO `t_consultation_message` VALUES (42, 1, '2025-03-08 01:00:07.822548', b'0', 1, '2025-03-08 01:00:07.822548', NULL, 11, '你好！有什么新的问题或需要帮助的地方吗？如果你有任何健康方面的疑问或其他需要咨询的内容，随时告诉我。', NULL, 18, 1);
INSERT INTO `t_consultation_message` VALUES (43, 1, '2025-03-08 01:02:31.453268', b'0', 1, '2025-03-08 01:02:31.453268', NULL, 11, '哈哈哈', NULL, 19, 0);
INSERT INTO `t_consultation_message` VALUES (44, 1, '2025-03-08 01:02:34.507149', b'0', 1, '2025-03-08 01:02:34.507149', NULL, 11, '哈哈，看起来你心情不错！如果你有任何问题或需要帮助的地方，尽管告诉我。无论是健康咨询还是其他方面的问题，我都在这里帮你。希望你继续保持好心情！', NULL, 20, 1);
INSERT INTO `t_consultation_message` VALUES (45, 1, '2025-03-08 01:02:49.310268', b'0', 1, '2025-03-08 01:02:49.310268', NULL, 11, 'jjkjkkk', NULL, 21, 0);
INSERT INTO `t_consultation_message` VALUES (46, 1, '2025-03-08 01:02:53.376559', b'0', 1, '2025-03-08 01:02:53.376559', NULL, 11, '看起来你输入了一些随机的字符。如果你有任何具体的问题或需要帮助的地方，请告诉我。无论是健康咨询还是其他方面的信息，我都会尽力帮助你。如果有任何特定的话题或疑问，请随时提问！', NULL, 22, 1);
INSERT INTO `t_consultation_message` VALUES (47, 1, '2025-03-08 01:05:01.065766', b'0', 1, '2025-03-08 01:05:01.065766', NULL, 12, '21212', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (48, 1, '2025-03-08 01:05:06.650090', b'0', 1, '2025-03-08 01:05:06.650090', NULL, 12, '您好！看起来您输入的是数字“21212”，这似乎不是描述症状的信息。如果您有任何健康上的疑问或需要咨询的症状，请详细描述一下，比如哪里不舒服、具体症状是什么、持续了多久等信息，这样我才能更好地为您提供帮助。期待您的进一步说明！', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (49, 1, '2025-03-08 01:05:21.075283', b'0', 1, '2025-03-08 01:05:21.075283', NULL, 12, '我不知道', NULL, 3, 0);
INSERT INTO `t_consultation_message` VALUES (50, 1, '2025-03-08 01:05:27.731409', b'0', 1, '2025-03-08 01:05:27.731409', NULL, 12, '没关系，如果您目前不清楚具体症状或不确定如何描述，可以先考虑以下几个方面：\n\n1. **身体的哪个部位不舒服**：比如头痛、肚子痛、关节痛等。\n2. **具体的症状**：比如疼痛、发热、咳嗽、恶心、呕吐、皮疹等。\n3. **症状持续的时间**：是刚刚出现还是已经持续了一段时间？\n4. **是否有其他伴随症状**：比如乏力、食欲不振、睡眠问题等。\n5. **最近的生活习惯和环境变化**：比如饮食、作息、旅行史等。\n\n如果您能提供这些信息，我可以更好地帮助您进行初步的分析和建议。如果实在不清楚，也可以告诉我您最担心的是什么，我会尽力帮您解答。', NULL, 4, 1);
INSERT INTO `t_consultation_message` VALUES (51, 1, '2025-03-08 01:08:24.748585', b'0', 1, '2025-03-08 01:08:24.748585', NULL, 12, '头痛', NULL, 5, 0);
INSERT INTO `t_consultation_message` VALUES (52, 1, '2025-03-08 01:08:31.496681', b'0', 1, '2025-03-08 01:08:31.496681', NULL, 12, '了解了，您目前的主要症状是头痛。为了更好地帮助您，我需要一些额外的信息：\n\n1. **头痛的性质**：是钝痛、刺痛、搏动性疼痛还是其他类型的疼痛？\n2. **头痛的位置**：是整个头部、前额、后脑勺、一侧还是某个特定区域？\n3. **头痛的频率和持续时间**：是偶尔出现还是经常发生？每次持续多久？\n4. **是否有诱因**：比如压力大、睡眠不足、饮食不当、饮酒或特定活动后出现？\n5. **伴随症状**：是否伴有恶心、呕吐、视力模糊、发热、颈部僵硬等症状？\n6. **既往病史**：以前是否有过类似的头痛？是否有其他慢性疾病或正在服用的药物？\n\n这些信息可以帮助我更准确地判断可能的原因，并给出相应的建议。如果您的头痛非常严重或突然加剧，建议尽快就医。', NULL, 6, 1);
INSERT INTO `t_consultation_message` VALUES (53, 5, '2025-07-23 15:10:05.239699', b'0', 5, '2025-07-23 15:10:05.239699', NULL, 13, '你好', NULL, 1, 0);
INSERT INTO `t_consultation_message` VALUES (54, 5, '2025-07-23 15:10:09.661998', b'0', 5, '2025-07-23 15:10:09.661998', NULL, 13, '你好！有什么健康方面的问题我可以帮助你解答吗？如果你有任何身体上的不适或健康疑问，都可以告诉我详细情况。', NULL, 2, 1);
INSERT INTO `t_consultation_message` VALUES (55, 5, '2025-07-23 21:13:59.238581', b'0', 5, '2025-07-23 21:13:59.238581', NULL, 13, '咳嗽', NULL, 3, 0);
INSERT INTO `t_consultation_message` VALUES (56, 5, '2025-07-23 21:14:12.333903', b'0', 5, '2025-07-23 21:14:12.333903', NULL, 13, '你好！咳嗽是一种常见的症状，可能由多种原因引起。为了更好地帮助你，我需要了解一些更详细的信息：\n\n1. **咳嗽的性质**：是干咳还是有痰？如果有痰，痰的颜色是什么样的（如白色、黄色、绿色等）？\n2. **持续时间**：咳嗽已经持续多久了？\n3. **伴随症状**：是否有发热、喉咙痛、胸痛、呼吸困难、乏力等症状？\n4. **触发因素**：咳嗽是否在特定情况下加重，比如晚上、接触冷空气、运动后或吸入某些刺激性物质时？\n5. **个人情况**：你是否有吸烟史或其他慢性疾病（如哮喘、慢性阻塞性肺病等）？\n\n这些信息将有助于我更准确地判断你的状况，并给出相应的建议。如果咳嗽非常严重或伴有其他严重症状，请及时就医。', NULL, 4, 1);
INSERT INTO `t_consultation_message` VALUES (57, 5, '2025-07-24 13:38:17.050492', b'0', 5, '2025-07-24 13:38:17.050492', NULL, 13, '痰是黄色的', NULL, 5, 0);
INSERT INTO `t_consultation_message` VALUES (58, 5, '2025-07-24 13:38:42.479035', b'0', 5, '2025-07-24 13:38:42.479035', NULL, 13, '感谢你的补充信息。黄色的痰通常提示可能存在感染，尤其是细菌性感染。以下是一些可能的原因和建议：\n\n### 可能的病因\n1. **急性支气管炎**：这是最常见的原因之一，通常由病毒或细菌引起。\n2. **肺炎**：如果伴有发热、胸痛、呼吸困难等症状，可能是肺炎。\n3. **慢性阻塞性肺病（COPD）**：如果有吸烟史或其他呼吸道疾病史，可能会加重症状。\n4. **鼻窦炎**：鼻后滴流也可能导致咳嗽和黄色痰。\n\n### 初步建议\n1. **多喝水**：保持充足的水分有助于稀释痰液，使其更容易咳出。\n2. **休息**：充分休息有助于身体恢复。\n3. **避免刺激物**：尽量避免吸烟和接触其他刺激性物质，如尘埃、烟雾等。\n4. **使用加湿器**：在室内使用加湿器可以帮助缓解喉咙干燥和咳嗽。\n\n### 是否需要及时就医\n如果你有以下情况之一，建议尽快就医：\n- 咳嗽持续超过一周且没有改善。\n- 伴有高热（体温超过38.5°C）。\n- 呼吸困难或胸痛。\n- 痰中带血。\n- 乏力、体重下降或其他全身症状。\n\n医生可能会根据你的具体情况开具抗生素或其他药物，并进行进一步检查以确定病因。希望你早日康复！', NULL, 6, 1);

-- ----------------------------
-- Table structure for t_department
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `created_by` bigint(0) NULL DEFAULT NULL COMMENT '创建人ID',
  `created_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  `updated_by` bigint(0) NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '科室名称',
  `category_id` bigint(0) NOT NULL COMMENT '科室分类ID',
  `hospital_id` bigint(0) NOT NULL COMMENT '所属医院ID',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '科室介绍',
  `features` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '科室特色',
  `services` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '诊疗服务',
  `location` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '科室位置',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '科室电话',
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '科室图片(多个逗号分隔)',
  `sort` int(0) NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态(0-禁用,1-正常)',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_category_id`(`category_id`) USING BTREE,
  INDEX `idx_hospital_id`(`hospital_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort`(`sort`) USING BTREE,
  CONSTRAINT `fk_department_category` FOREIGN KEY (`category_id`) REFERENCES `t_department_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_department_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `t_hospital` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '科室信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_department
-- ----------------------------
INSERT INTO `t_department` VALUES (1, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-23 00:48:50', '心血管科', 10, 1, '心血管科', '心血管科', '心血管科', '门诊5楼', '012541257', NULL, 1, 1);
INSERT INTO `t_department` VALUES (2, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '消化内科', 11, 1, '消化内科致力于消化系统疾病的诊断、治疗和预防，拥有完善的内镜诊疗中心。', '内镜下治疗、肝病诊疗、炎症性肠病治疗', '胃肠疾病、肝胆疾病、胰腺疾病的诊断和治疗', '门诊楼4楼', '010-69156202', NULL, 2, 1);
INSERT INTO `t_department` VALUES (3, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '呼吸内科', 12, 1, '呼吸内科专业诊治各种呼吸系统疾病，配备先进的肺功能检测和支气管镜设备。', '肺癌早期诊断、慢阻肺规范化治疗、睡眠呼吸障碍诊疗', '肺炎、哮喘、慢阻肺、肺癌、间质性肺病等疾病诊治', '门诊楼5楼', '010-69156203', NULL, 3, 1);
INSERT INTO `t_department` VALUES (4, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '神经外科', 2, 1, '神经外科是国家重点学科，在颅脑肿瘤、脑血管病等领域处于国内领先水平。', '显微神经外科、神经内镜技术、立体定向手术', '脑肿瘤、脑血管病、颅脑外伤、功能性神经疾病手术治疗', '外科楼6楼', '010-69156301', NULL, 4, 1);
INSERT INTO `t_department` VALUES (5, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '骨科', 5, 1, '骨科拥有完整的亚专业体系，在关节置换、脊柱外科、创伤骨科等方面技术精湛。', '关节置换、脊柱微创手术、运动医学', '骨折、关节疾病、脊柱疾病、骨肿瘤等疾病治疗', '外科楼7楼', '010-69156302', NULL, 5, 1);
INSERT INTO `t_department` VALUES (6, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '妇产科', 3, 1, '妇产科提供全方位的妇科疾病诊疗和产科服务，拥有现代化的产房和新生儿监护设备。', '微创妇科手术、高危妊娠管理、生殖内分泌治疗', '妇科疾病、产科服务、不孕不育、妇科肿瘤诊治', '妇产科楼2楼', '010-69156401', NULL, 6, 1);
INSERT INTO `t_department` VALUES (7, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '儿科', 4, 1, '儿科是综合性儿科，涵盖新生儿、小儿内科、小儿外科等多个亚专业。', '新生儿重症监护、小儿心脏病诊治、儿童生长发育', '新生儿疾病、儿童常见病、小儿急危重症救治', '儿科楼1楼', '010-69156501', NULL, 7, 1);
INSERT INTO `t_department` VALUES (8, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '眼科', 6, 1, '眼科在白内障、青光眼、视网膜疾病等领域具有丰富经验和先进技术。', '白内障超声乳化、玻璃体切除术、激光治疗', '白内障、青光眼、视网膜疾病、角膜病、屈光不正', '门诊楼6楼', '010-69156601', NULL, 8, 1);
INSERT INTO `t_department` VALUES (9, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '急诊科', 14, 1, '急诊科24小时为患者提供急诊医疗服务，配备完善的抢救设备和专业医护团队。', '急危重症救治、多发伤救治、中毒救治', '急性疾病、外伤、中毒等急诊医疗服务', '急诊楼1楼', '010-69156999', NULL, 9, 1);
INSERT INTO `t_department` VALUES (10, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '检验科', 15, 1, '检验科拥有先进的检验设备，提供全面的临床检验服务，为临床诊断提供可靠依据。', '分子诊断、免疫检验、微生物检验', '血液检验、生化检验、免疫检验、微生物检验等', '检验楼地下1楼', '010-69156701', NULL, 10, 1);
INSERT INTO `t_department` VALUES (11, 1, '2025-07-22 01:20:00', b'0', 1, '2025-07-22 01:20:00', '3123', 18, 1, '312321', '312321', '3213123', '32132', '3213', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/departments/20250722/0cb6d201e43f4ef590cf1b3d08f7a839.jpeg', 3213, 1);
INSERT INTO `t_department` VALUES (12, 1, '2025-07-23 00:51:39', b'0', 1, '2025-07-23 00:51:39', '儿科门诊', 4, 2, '儿科门诊', '儿科门诊', '儿科门诊', '门诊楼4楼', '152441254', NULL, 12, 1);
INSERT INTO `t_department` VALUES (13, 1, '2025-07-24 00:02:39', b'0', 1, '2025-07-24 00:02:39', '内二科', 1, 2, '上海华山医院内科', '专职内科', '急诊，手术。。。。', '一楼106', '15236541', NULL, 20, 1);
INSERT INTO `t_department` VALUES (14, 1, '2025-07-24 13:42:41', b'0', 1, '2025-07-24 13:42:41', '内科门诊', 1, 16, '内科门诊', '内科门诊', '急诊', '一楼', '01202144', NULL, 20, 1);

-- ----------------------------
-- Table structure for t_department_category
-- ----------------------------
DROP TABLE IF EXISTS `t_department_category`;
CREATE TABLE `t_department_category`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `created_by` bigint(0) NULL DEFAULT NULL COMMENT '创建人ID',
  `created_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  `updated_by` bigint(0) NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名称',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类描述',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类图标',
  `sort` int(0) NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态(0-禁用,1-正常)',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort`(`sort`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '科室分类表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_department_category
-- ----------------------------
INSERT INTO `t_department_category` VALUES (1, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '内科', '内科系统疾病诊疗', 'medical-box', 1, 1);
INSERT INTO `t_department_category` VALUES (2, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '外科', '外科手术及创伤治疗', 'scissor', 2, 1);
INSERT INTO `t_department_category` VALUES (3, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '妇产科', '妇科疾病及产科服务', 'woman', 3, 1);
INSERT INTO `t_department_category` VALUES (4, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '儿科', '儿童疾病诊疗', 'baby-car-seat', 4, 1);
INSERT INTO `t_department_category` VALUES (5, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '骨科', '骨骼肌肉系统疾病', 'bone', 5, 1);
INSERT INTO `t_department_category` VALUES (6, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '眼科', '眼部疾病诊疗', 'eye', 6, 1);
INSERT INTO `t_department_category` VALUES (7, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '耳鼻喉科', '耳鼻喉疾病诊疗', 'audio', 7, 1);
INSERT INTO `t_department_category` VALUES (8, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '皮肤科', '皮肤疾病诊疗', 'skin', 8, 1);
INSERT INTO `t_department_category` VALUES (9, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '神经科', '神经系统疾病', 'brain', 9, 1);
INSERT INTO `t_department_category` VALUES (10, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '心血管科', '心血管疾病诊疗', 'heart', 10, 1);
INSERT INTO `t_department_category` VALUES (11, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '消化科', '消化系统疾病', 'medicine-box', 11, 1);
INSERT INTO `t_department_category` VALUES (12, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '呼吸科', '呼吸系统疾病', 'lungs', 12, 1);
INSERT INTO `t_department_category` VALUES (13, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '肿瘤科', '肿瘤疾病诊疗', 'dna', 13, 1);
INSERT INTO `t_department_category` VALUES (14, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '急诊科', '急诊医疗服务', 'first-aid-kit', 14, 1);
INSERT INTO `t_department_category` VALUES (15, 1, '2025-07-21 23:18:03', b'0', 1, '2025-07-21 23:18:03', '检验科', '医学检验服务', 'flask', 15, 1);
INSERT INTO `t_department_category` VALUES (16, 1, '2025-07-22 00:56:22', b'1', 1, '2025-07-22 18:43:02', '���Է���', '��������', NULL, 0, 1);
INSERT INTO `t_department_category` VALUES (17, 1, '2025-07-22 00:57:05', b'0', 1, '2025-07-22 00:57:05', '21', '321', '312', 321, 1);
INSERT INTO `t_department_category` VALUES (18, 1, '2025-07-22 00:57:33', b'0', 1, '2025-07-22 00:57:33', '课设', '哈哈哈', '19', 1, 1);

-- ----------------------------
-- Table structure for t_disease
-- ----------------------------
DROP TABLE IF EXISTS `t_disease`;
CREATE TABLE `t_disease`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `causes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prevention` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` smallint(0) NULL DEFAULT NULL,
  `symptoms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `treatment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `category_id` bigint(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FKnfq8mv18asiur89t3s5i6lkom`(`category_id`) USING BTREE,
  CONSTRAINT `FKnfq8mv18asiur89t3s5i6lkom` FOREIGN KEY (`category_id`) REFERENCES `t_disease_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_disease
-- ----------------------------
INSERT INTO `t_disease` VALUES (1, 1, '2025-03-07 15:23:08.900414', b'0', 1, '2025-07-23 23:37:10.446343', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/28d13335c3b04f9392f65552df34f972.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/51ea34a370de497ba55095216bac08e1.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/ac358028a4ec4e8da62f6f028b528a89.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/076050705bf94c0eaa008a55ebdfd255.jpeg', '感冒', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1, '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 2);
INSERT INTO `t_disease` VALUES (2, 1, '2025-03-07 15:23:46.926141', b'0', 1, '2025-07-23 23:39:01.666341', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/d0e0a1015447476a8ddccc853e3bf5f2.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/51616301084443188ac82082149bce75.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/e2457b76888042d78abe4b4fc46c39ae.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/1cb0a94c9417441083a84030dacd8af8.jpeg', '糖尿病', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1, '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1);
INSERT INTO `t_disease` VALUES (3, 1, '2025-03-07 16:05:25.412682', b'0', 1, '2025-07-23 23:39:22.520077', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/19ee2a9ec38b4f19957ed67461b2045e.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/f1ca5bb5414d4ea58dcb02012404c373.jpg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/0fdb7ef3e6b3465ea961a6a0a4aa8b8a.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/6b2d4db67e1b447f84619326e6ff3f3e.jpg', '拉肚子', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1, '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 3);
INSERT INTO `t_disease` VALUES (4, 1, '2025-03-07 16:21:22.384270', b'0', 1, '2025-07-23 23:40:03.361349', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/e7c7824417154dd9b32b74e00ad2689a.jpg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/cd2f4d2c28a64b2081e5bc180df3aaf1.jpg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/0c43f1fb2ee04d98b83fb20a3b4454b8.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/6c00c2e2a7314f5aa24678dab90a7b79.jpeg', '甲流', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1, '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 2);
INSERT INTO `t_disease` VALUES (5, 1, '2025-03-07 16:21:52.594130', b'0', 1, '2025-07-23 23:40:28.273916', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/cc593b68f3804196a80a9baceebf1078.jpg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/ea35f7c2464a4fef97a8404bf237f5f7.jpg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/68ab33250b474accb7baa043759abf23.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/672fa1ac27d548f6a91bfee747d50436.jpeg', '诺如', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1, '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 2);
INSERT INTO `t_disease` VALUES (6, 1, '2025-03-07 17:26:06.783082', b'0', 1, '2025-07-23 23:40:53.726050', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/d11f83aefa52408fb04314e0c219696c.jpg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/c9037c15bb644754a289f3cbc6030523.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/f40b00e44237442086e3d7e58ec126c1.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/24b9f9cdb6664828a80dea6d42c25f5a.jpeg', '登革热', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1, '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 3);
INSERT INTO `t_disease` VALUES (7, 1, '2025-03-07 17:26:33.778972', b'0', 1, '2025-07-23 23:41:23.868759', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/5950f206c8ce405cbb80e38ed1d14be9.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/186fdd7b20f5404bbe58f88fa545865b.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/0426a4494e234dd7856eed8b9edfccc1.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/diseases/20250723/cd1af0a84e6547cab85ac3fbfd05615a.jpeg', '肺炎', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 1, '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', '感冒是指百姓所说的“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。', 2);

-- ----------------------------
-- Table structure for t_disease_category
-- ----------------------------
DROP TABLE IF EXISTS `t_disease_category`;
CREATE TABLE `t_disease_category`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sort` int(0) NULL DEFAULT NULL,
  `status` smallint(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_disease_category
-- ----------------------------
INSERT INTO `t_disease_category` VALUES (1, 1, '2025-03-07 15:12:12.564085', b'0', 1, '2025-07-23 23:33:41.236594', '慢性病', '慢性病', 1, 1);
INSERT INTO `t_disease_category` VALUES (2, 1, '2025-03-07 15:12:20.848693', b'0', 1, '2025-07-23 23:34:03.344633', '感染性疾病', '感染性疾病', 2, 1);
INSERT INTO `t_disease_category` VALUES (3, 1, '2025-03-07 15:12:40.735712', b'0', 1, '2025-07-23 23:34:26.237647', '免疫性疾病', '免疫性疾病', 3, 1);
INSERT INTO `t_disease_category` VALUES (4, 1, '2025-07-23 23:35:00.730930', b'0', 1, '2025-07-23 23:35:00.730930', '遗传性疾病', '遗传性疾病', 4, 1);

-- ----------------------------
-- Table structure for t_doctor
-- ----------------------------
DROP TABLE IF EXISTS `t_doctor`;
CREATE TABLE `t_doctor`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '医生ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '医生姓名',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '职称',
  `specialties` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '专长领域',
  `introduction` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '医生简介',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像URL',
  `hospital_id` bigint(0) NOT NULL COMMENT '所属医院ID',
  `department_id` bigint(0) NULL DEFAULT NULL COMMENT '所属科室ID',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮箱',
  `education` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '教育背景',
  `experience` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '工作经历',
  `achievements` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '主要成就',
  `consultation_fee` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '挂号费用',
  `status` tinyint(0) NULL DEFAULT 1 COMMENT '状态：0-停诊，1-正常',
  `sort` int(0) NULL DEFAULT 0 COMMENT '排序',
  `created_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updated_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_hospital_id`(`hospital_id`) USING BTREE,
  INDEX `idx_department_id`(`department_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort`(`sort`) USING BTREE,
  CONSTRAINT `fk_doctor_department` FOREIGN KEY (`department_id`) REFERENCES `t_department` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_doctor_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `t_hospital` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '医生信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_doctor
-- ----------------------------
INSERT INTO `t_doctor` VALUES (1, '张伟', '主任医师', '冠心病介入治疗,心律失常射频消融,心脏起搏器植入', '张伟医生从事心血管内科临床工作20余年，在冠心病介入治疗、心律失常射频消融等方面有丰富经验。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250722/d67ccd93cb4f45a9a964fe366ee238d7.jpeg', 1, 2, '010-69156201', 'zhangwei@pumch.cn', '北京医科大学医学博士', '1998年毕业于北京医科大学，2001年获得心血管内科硕士学位，2005年获得博士学位。先后在美国梅奥诊所和德国心脏中心进修学习。', '发表SCI论文50余篇，主持国家自然科学基金3项，获得国家科技进步二等奖1项。', 300.00, 1, 1, '2025-07-22 17:26:11', '2025-07-22 20:31:50');
INSERT INTO `t_doctor` VALUES (2, '李明', '副主任医师', '内镜下治疗,肝病诊疗,炎症性肠病治疗', '李明医生专注于消化系统疾病的诊断和治疗，特别在内镜下治疗和肝病诊疗方面有深入研究。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250722/271544bbaed94aca9906a2507427a812.jpeg', 1, 2, '010-69156202', 'liming@pumch.cn', '清华大学医学院博士', '2000年毕业于清华大学医学院，2003年获得消化内科硕士学位，2007年获得博士学位。曾在日本东京大学附属医院进修消化内镜技术。', '在国内外期刊发表论文40余篇，参与编写消化内科专著2部，获得省部级科技奖励3项。', 250.00, 1, 2, '2025-07-22 17:26:11', '2025-07-22 20:40:28');
INSERT INTO `t_doctor` VALUES (3, '王芳', '主任医师', '肺癌早期诊断,慢阻肺规范化治疗,睡眠呼吸障碍诊疗', '王芳医生在呼吸系统疾病诊治方面有25年临床经验，尤其擅长肺癌早期诊断和慢阻肺治疗。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250722/2e2864bf4afb483e825d34a37a8e0007.jpeg', 1, 3, '010-69156203', 'wangfang@pumch.cn', '中国医科大学博士', '1995年毕业于中国医科大学，2000年获得呼吸内科博士学位。曾在英国皇家布朗普顿医院进修肺部疾病诊疗技术。', '发表论文60余篇，主编呼吸内科教材1部，获得国家科技进步三等奖2项，省部级一等奖1项。', 280.00, 1, 3, '2025-07-22 17:26:11', '2025-07-22 20:40:40');
INSERT INTO `t_doctor` VALUES (4, '刘强', '主任医师', '显微神经外科,神经内镜技术,立体定向手术', '刘强医生是神经外科专家，在颅脑肿瘤、脑血管病等领域有丰富的手术经验。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250722/9d9c9a9ea7ce45659193432774cc877f.jpeg', 1, 4, '010-69156301', 'liuqiang@pumch.cn', '首都医科大学博士', '1992年毕业于首都医科大学，1998年获得神经外科博士学位。先后在美国约翰霍普金斯医院和德国汉诺威医学院进修神经外科技术。', '完成各类神经外科手术5000余例，发表论文80余篇，获得国家发明专利3项。', 400.00, 1, 4, '2025-07-22 17:26:11', '2025-07-22 20:40:55');
INSERT INTO `t_doctor` VALUES (5, '陈静', '副主任医师', '关节置换,脊柱微创手术,运动医学', '陈静医生专注于骨科疾病的诊治，在关节置换和脊柱外科方面有丰富经验。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250722/7d2f243388d14c939c85abfdd646642e.jpeg', 1, 1, '010-69156302', 'chenjing@pumch.cn', '北京大学医学部博士', '1999年毕业于北京大学医学部，2005年获得骨科博士学位。曾在瑞士AO研究所进修骨科创伤技术。', '完成各类骨科手术3000余例，发表论文30余篇，参与国家级科研项目2项。', 320.00, 1, 5, '2025-07-22 17:26:11', '2025-07-23 01:05:00');
INSERT INTO `t_doctor` VALUES (6, '赵敏', '主任医师', '微创妇科手术,高危妊娠管理,生殖内分泌治疗', '赵敏医生在妇产科临床工作18年，擅长各种妇科疾病的诊治和产科高危妊娠的管理。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250722/f7fd76cb5e644305b26c321092a35235.jpg', 2, 6, '021-64370045', 'zhaomin@rjh.com.cn', '上海交通大学医学院博士', '2002年毕业于上海交通大学医学院，2008年获得妇产科博士学位。曾在美国哈佛医学院附属医院进修妇产科技术。', '完成各类妇产科手术2500余例，发表论文45余篇，获得上海市科技进步奖2项。', 280.00, 1, 6, '2025-07-22 17:26:11', '2025-07-22 20:41:15');
INSERT INTO `t_doctor` VALUES (7, '孙涛', '副主任医师', '新生儿重症监护,小儿心脏病诊治,儿童生长发育', '孙涛医生专注于儿科疾病的诊治，在新生儿重症监护和小儿心脏病方面有专长。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250722/11a3991632f7472dbc56ce4d73e0ad3e.png', 2, 12, '021-64370046', 'suntao@rjh.com.cn', '复旦大学医学院硕士', '2005年毕业于复旦大学医学院，2010年获得儿科硕士学位。曾在美国费城儿童医院进修新生儿重症监护技术。', '救治危重新生儿1000余例，发表论文25篇，参与儿科临床指南制定2项。', 200.00, 1, 7, '2025-07-22 17:26:11', '2025-07-23 00:52:45');
INSERT INTO `t_doctor` VALUES (8, '王元', '主任医师', '擅长骨科', '毕业于清华大学', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250723/dcd6e75dea9f46f29c126e4910e61d11.jpg', 1, 5, '48541257452', '321321@qq.com', '清华大学', '中山大学主任医师', '中山大学主任医师', 300.00, 1, 14, '2025-07-23 01:43:38', '2025-07-23 01:43:38');
INSERT INTO `t_doctor` VALUES (9, '刘元与', '主任医师', '内科专家', '内科专家，毕业于清华大学，十年经验', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250724/7d5f90d74b254403a54f4a1ef0169191.jpg', 2, 13, '152112116', '213123@qq.com', '清华大学', '中山大学附属医院内科专家', '中山大学附属医院内科专家', 100.00, 1, 13, '2025-07-24 00:04:31', '2025-07-24 00:04:59');
INSERT INTO `t_doctor` VALUES (10, '王媛媛', '主任医师', '内科,外壳', '清华大学毕业', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250724/7f7815df6b504573b529b7cb792eacd5.jpeg', 16, 14, '012012011', '23123213@qq.com', '清华大学', '中山大学附属医院', '中山大学附属医院', 300.00, 1, 22, '2025-07-24 13:44:30', '2025-07-24 13:44:30');

-- ----------------------------
-- Table structure for t_feedback
-- ----------------------------
DROP TABLE IF EXISTS `t_feedback`;
CREATE TABLE `t_feedback`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `reply` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `reply_time` datetime(6) NULL DEFAULT NULL,
  `status` smallint(0) NOT NULL,
  `type` smallint(0) NOT NULL,
  `user_id` bigint(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_feedback
-- ----------------------------
INSERT INTO `t_feedback` VALUES (1, 1, '2025-03-08 01:35:38.567912', b'0', 1, '2025-03-08 01:44:45.103536', '12312312', NULL, '32323', '2025-03-08 01:44:45.103009', 1, 1, 1);
INSERT INTO `t_feedback` VALUES (2, 1, '2025-03-08 01:41:37.977339', b'0', 1, '2025-03-08 01:44:39.878674', '123123', NULL, '2121', '2025-03-08 01:44:39.877624', 1, 1, 1);
INSERT INTO `t_feedback` VALUES (3, 5, '2025-07-23 21:14:56.235711', b'0', 1, '2025-07-23 21:15:06.673939', '无法挂号', NULL, '1', '2025-07-23 21:15:06.673939', 1, 1, 5);
INSERT INTO `t_feedback` VALUES (4, 5, '2025-07-24 13:50:13.173355', b'0', 1, '2025-07-24 13:50:25.732376', '无法刷新', NULL, '31231232', '2025-07-24 13:50:25.732376', 1, 1, 5);

-- ----------------------------
-- Table structure for t_hospital
-- ----------------------------
DROP TABLE IF EXISTS `t_hospital`;
CREATE TABLE `t_hospital`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `created_by` bigint(0) NULL DEFAULT NULL COMMENT '创建人ID',
  `created_time` datetime(6) NULL DEFAULT NULL COMMENT '创建时间',
  `deleted` bit(1) NULL DEFAULT b'0' COMMENT '是否删除',
  `updated_by` bigint(0) NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_time` datetime(6) NULL DEFAULT NULL COMMENT '更新时间',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '医院名称',
  `level` tinyint(0) NOT NULL DEFAULT 1 COMMENT '医院等级(1-一级,2-二级,3-三级)',
  `type` tinyint(0) NOT NULL DEFAULT 1 COMMENT '医院类型(1-综合医院,2-专科医院,3-中医医院)',
  `province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '省份',
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '城市',
  `district` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '区县',
  `address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '详细地址',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `website` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '官网地址',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '医院简介',
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医院图片(多个逗号分隔)',
  `business_hours` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '营业时间',
  `longitude` decimal(10, 7) NULL DEFAULT NULL COMMENT '经度',
  `latitude` decimal(10, 7) NULL DEFAULT NULL COMMENT '纬度',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态(0-禁用,1-正常)',
  `sort` int(0) NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_province_city`(`province`, `city`) USING BTREE,
  INDEX `idx_level`(`level`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '医院信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_hospital
-- ----------------------------
INSERT INTO `t_hospital` VALUES (1, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:19:01.416586', '北京协和医院', 1, 1, '北京市', '东城区', '东城区', '东单三条9号', '010-69156114', 'service@pumch.cn', 'https://www.pumch.cn', '北京协和医院是集医疗、教学、科研于一体的现代化综合三级甲等医院，是国家卫生健康委指定的全国疑难重症诊治指导中心，最高水平的医学殿堂。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/cd9be0abd05b437782a1c0f488accac1.jpeg,http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/78b729b86a3b46f98ebd0f1589f609ff.jpeg', '24小时', 116.4187570, 39.9150850, 1, 1);
INSERT INTO `t_hospital` VALUES (2, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:23:24.586895', '上海华山医院', 2, 2, '上海市', '静安区', '静安区', '乌鲁木齐中路12号', '021-52889999', 'info@huashan.org.cn', 'https://www.huashan.org.cn', '复旦大学附属华山医院创建于1907年，是国家卫生计生委委属医院、复旦大学附属教学医院和中国红十字会冠名的医院，1992年首批通过国家三级甲等医院评审。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/205a99071c13438da93c62586e7e4143.png', '08:00-17:00', 121.4452800, 31.2198060, 1, 2);
INSERT INTO `t_hospital` VALUES (3, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:23:36.659889', '广州中山大学附属第一医院', 3, 1, '广东省', '广州市', '越秀区', '中山二路58号', '020-28823388', 'webmaster@gzsums.edu.cn', 'https://www.gzsums.edu.cn', '中山大学附属第一医院(简称中山一院)地处广东省省会广州市，是国家三级甲等医院和国家爱婴医院，全国首批百佳医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/9774cc425a92448a881dc562d4fd545c.jpeg', '08:00-17:30', 113.2952590, 23.1188470, 1, 3);
INSERT INTO `t_hospital` VALUES (4, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:23:48.617360', '深圳市人民医院', 3, 1, '广东省', '深圳市', '罗湖区', '东门北路1017号', '0755-25533018', 'info@sph.com.cn', 'https://www.sph.com.cn', '深圳市人民医院始建于1946年，是深圳市最大的现代化综合性医院，是暨南大学医学院附属深圳医院、广东医学院非直属附属医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/2953f069dad94acb81a812df019fc66a.jpeg', '08:00-17:00', 114.1241230, 22.5561480, 1, 4);
INSERT INTO `t_hospital` VALUES (5, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:24:09.210340', '杭州市第一人民医院', 3, 1, '浙江省', '杭州市', '上城区', '浣纱路261号', '0571-56005600', 'hz1hospital@163.com', 'https://www.hz-hospital.com', '杭州市第一人民医院创建于1923年，是杭州地区融医疗、教学、科研、预防和社会保健于一体的市属最大的综合性三级甲等医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/fb8cd452f063459b8fd109d64b4b7584.jpg', '08:00-17:00', 120.1701390, 30.2460270, 1, 5);
INSERT INTO `t_hospital` VALUES (6, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:24:24.435833', '成都华西医院', 3, 1, '四川省', '成都市', '武侯区', '国学巷37号', '028-85422286', 'webmaster@wchscu.cn', 'https://www.wchscu.cn', '四川大学华西医院是中国西部疑难危急重症诊疗的国家级中心，也是世界规模第一的综合性单点医院，拥有中国规模最大、最早整体通过美国病理家学会检查认可的医学检验中心。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/41efb7207e1149fea7ef01c8d6cee3b5.jpg', '08:00-17:30', 104.0433330, 30.6413890, 1, 6);
INSERT INTO `t_hospital` VALUES (7, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:24:35.764636', '西安交通大学第一附属医院', 3, 1, '陕西省', '西安市', '雁塔区', '雁塔西路277号', '029-85323112', 'webmaster@mail.xjtu.edu.cn', 'https://www.xjtu1h.com', '西安交通大学第一附属医院是一所集医疗、教学、科研、康复、预防保健为一体的三级甲等综合医院，是陕西省医疗、教学、科研中心之一。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/ddc9a408086b4da4913dce84646d62d8.png', '08:00-17:00', 108.9533330, 34.2361110, 1, 7);
INSERT INTO `t_hospital` VALUES (8, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:24:45.229617', '武汉同济医院', 3, 1, '湖北省', '武汉市', '硚口区', '解放大道1095号', '027-83662688', 'tjyy@tjh.tjmu.edu.cn', 'https://www.tjh.com.cn', '华中科技大学同济医学院附属同济医院是一所集医疗、教学、科研为一体的创新型现代化医院，其综合实力居国内医院前列。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/cdb3a5080efa4eeba41be02368d14a5a.png', '08:00-17:30', 114.2733330, 30.5833330, 1, 8);
INSERT INTO `t_hospital` VALUES (9, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:24:54.142293', '南京鼓楼医院', 3, 1, '江苏省', '南京市', '鼓楼区', '中山路321号', '025-83106666', 'glyyb@njglyy.com', 'https://www.njglyy.com', '南京鼓楼医院，又名南京大学医学院附属鼓楼医院，建于1892年，是一所集医教研为一体的综合性大型三级甲等医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/b6acc606fed44a00a3c583e0f0ad843f.jpeg', '08:00-17:00', 118.7833330, 32.0666670, 1, 9);
INSERT INTO `t_hospital` VALUES (10, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:25:07.864857', '天津医科大学总医院', 3, 1, '天津市', '和平区', '和平区', '鞍山道154号', '022-60362255', 'webmaster@tmu.edu.cn', 'https://www.tmugh.com.cn', '天津医科大学总医院始建于1946年，是天津市最大的集医疗、教学、科研、预防为一体的综合性大学医院，是天津市医学中心。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/82e88aca7cb24466a9734e04f473ca87.png', '08:00-17:30', 117.2000000, 39.1333330, 1, 10);
INSERT INTO `t_hospital` VALUES (11, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:25:18.560414', '北京朝阳医院', 2, 1, '北京市', '朝阳区', '朝阳区', '工人体育场南路8号', '010-85231000', 'info@bjcyh.com', 'https://www.bjcyh.com', '首都医科大学附属北京朝阳医院建于1958年，是集医疗、教学、科研、预防为一体的三级甲等综合医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/9de46858e2c6456b97aedd2e2e3b1d06.jpg', '08:00-17:00', 116.4472220, 39.9269440, 1, 11);
INSERT INTO `t_hospital` VALUES (12, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:25:31.120286', '上海第六人民医院', 2, 1, '上海市', '徐汇区', '徐汇区', '宜山路600号', '021-64369181', 'info@sh6h.cn', 'https://www.sh6h.cn', '上海市第六人民医院、上海交通大学附属第六人民医院建于1904年，是一所三级甲等大型综合性教学医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/a232ab0ca3e84cd09411df91b1b5cb80.jpeg', '08:00-17:30', 121.4327780, 31.1888890, 1, 12);
INSERT INTO `t_hospital` VALUES (13, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:25:38.777379', '北京安贞医院', 3, 2, '北京市', '朝阳区', '朝阳区', '安贞路2号', '010-64456677', 'info@anzhen.org', 'https://www.anzhen.org', '首都医科大学附属北京安贞医院成立于1984年，是集医疗、教学、科研、预防、国际交流五位一体的三级甲等心血管病专科医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/13de88f4c80248f183660326aa55419a.jpeg', '08:00-17:00', 116.4111110, 39.9694440, 1, 13);
INSERT INTO `t_hospital` VALUES (14, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:25:53.931007', '上海市眼病防治中心', 2, 2, '上海市', '静安区', '静安区', '康定路380号', '021-62717733', 'info@seec.cn', 'https://www.seec.cn', '上海市眼病防治中心成立于1952年，是一所集医疗、教学、科研、预防为一体的三级眼科专科医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/c81708f6a20949169961bac91c5b7953.png', '08:00-17:30', 121.4455560, 31.2288890, 1, 14);
INSERT INTO `t_hospital` VALUES (15, 1, '2025-07-21 23:02:53.000000', b'0', 1, '2025-07-23 22:26:01.798493', '中国中医科学院广安门医院', 3, 3, '北京市', '西城区', '西城区', '北线阁5号', '010-88001122', 'info@gamyy.cn', 'https://www.gamyy.cn', '中国中医科学院广安门医院创建于1955年，是一所集医疗、教学、科研为一体的三级甲等中医医院。', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250723/b5cf5e08a6d54872903d1b5dd27e2165.jpg', '08:00-17:00', 116.3569440, 39.9000000, 1, 15);
INSERT INTO `t_hospital` VALUES (16, 1, '2025-07-24 13:41:25.916189', b'0', 1, '2025-07-24 13:41:25.916189', '广东省人民医院', 1, 1, '广东省', '广州市', '天河区', '天河区', '012102122', '23213213@qq.com', 'wwwww.qqqqq.com', '广东省人民医院广东省人民医院广东省人民医院广东省人民医院广东省人民医院广东省人民医院广东省人民医院', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/hospitals/20250724/05845594e65f4435b3b0cf8a8f940317.jpeg', '8:00-17:00', NULL, NULL, 1, 0);

-- ----------------------------
-- Table structure for t_medicine
-- ----------------------------
DROP TABLE IF EXISTS `t_medicine`;
CREATE TABLE `t_medicine`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `contraindication` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `manufacturer` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `specification` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` smallint(0) NULL DEFAULT NULL,
  `stock` int(0) NULL DEFAULT NULL,
  `usage_method` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `category_id` bigint(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FKef22a5fbqikdm8m6d8la181wy`(`category_id`) USING BTREE,
  CONSTRAINT `FKef22a5fbqikdm8m6d8la181wy` FOREIGN KEY (`category_id`) REFERENCES `t_medicine_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_medicine
-- ----------------------------
INSERT INTO `t_medicine` VALUES (1, 1, '2025-03-06 23:17:29.662483', b'0', 1, '2025-07-24 13:47:41.988814', '一天两颗，一天两次，过敏不能吃，饭后吃', '阿莫西林', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/59b5b295db0c4a1ea3ff1e75ccc74f5d.jpg', '东方药业', '阿莫西林', 33.00, '35粒/盒', 1, 50, '一天两颗，一天两次，过敏不能吃，饭后吃', 1);
INSERT INTO `t_medicine` VALUES (3, 1, '2025-03-06 23:35:28.794837', b'0', 1, '2025-07-23 23:48:21.397049', '一天两颗，一天两次，过敏不能吃，饭后吃', '青霉素青霉素青霉素青霉素青霉素青霉素', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/8cdd66974a0c4fadbba54586a8c6bdae.jpg', '国产', '青霉素', 43.00, '332', 1, 22, '一天两颗，一天两次，过敏不能吃，饭后吃', 3);
INSERT INTO `t_medicine` VALUES (4, 1, '2025-07-23 23:49:28.629124', b'0', 1, '2025-07-23 23:49:28.629124', '一天两颗，一天两次，过敏不能吃，饭后吃', '利肝颗粒', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/0cc1ad85c85d4229b7801c774b76eab3.jpeg', '东方药业', '利肝颗粒', 50.00, '50粒/盒', 1, 50, '一天两颗，一天两次，过敏不能吃，饭后吃', 4);
INSERT INTO `t_medicine` VALUES (5, 1, '2025-07-23 23:50:22.692078', b'0', 1, '2025-07-23 23:50:22.692078', '一天两颗，一天两次，过敏不能吃，饭后吃', '抗病毒胶囊', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/92476e216e2449ad86e837a026f71e19.jpeg', '白云山药业', '抗病毒胶囊', 99.00, '35粒/盒', 1, 100, '一天两颗，一天两次，过敏不能吃，饭后吃', 3);
INSERT INTO `t_medicine` VALUES (6, 1, '2025-07-23 23:51:21.103510', b'0', 1, '2025-07-23 23:51:21.103510', '一天两颗，一天两次，过敏不能吃，饭后吃', '三九颗粒', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/cab30c00214d471fb444c3abc504960e.jpeg', '白云山', '三九颗粒', 29.00, '50粒/瓶', 1, 100, '一天两颗，一天两次，过敏不能吃，饭后吃', 5);
INSERT INTO `t_medicine` VALUES (7, 1, '2025-07-23 23:58:16.988276', b'0', 1, '2025-07-23 23:58:16.988276', '一天两颗，一天两次，过敏不能吃，饭后吃', '肠炎宁胶囊', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/a45a5c38e90d42fcaa812c63cfd9f035.jpeg', '白云山', '肠炎宁胶囊', 65.00, '50粒/盒', 1, 100, '一天两颗，一天两次，过敏不能吃，饭后吃', 3);
INSERT INTO `t_medicine` VALUES (8, 1, '2025-07-23 23:59:00.411936', b'0', 1, '2025-07-23 23:59:00.411936', '一天两颗，一天两次，过敏不能吃，饭后吃', '三七片', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/8edf4261ba8242aeb9b548a0aa37c377.jpg', '白云山', '三七片', 19.00, '100粒/盒', 1, 100, '一天两颗，一天两次，过敏不能吃，饭后吃', 4);
INSERT INTO `t_medicine` VALUES (9, 1, '2025-07-23 23:59:41.599646', b'0', 1, '2025-07-23 23:59:41.599646', '一天两颗，一天两次，过敏不能吃，饭后吃', '红药片', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/e23ad4b53be14aafbe0930207c8c63cf.jpg', '白云山', '红药片', 88.00, '55粒/盒', 1, 100, '一天两颗，一天两次，过敏不能吃，饭后吃', 4);
INSERT INTO `t_medicine` VALUES (10, 1, '2025-07-24 13:48:35.468666', b'0', 1, '2025-07-24 13:48:35.468666', '111', '通络胶囊', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250724/39ef1b2b8c19422f86e94bedd16db940.jpg', '白云山', '通络胶囊', 88.00, '55粒/盒', 1, 100, '11', 4);

-- ----------------------------
-- Table structure for t_medicine_category
-- ----------------------------
DROP TABLE IF EXISTS `t_medicine_category`;
CREATE TABLE `t_medicine_category`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sort` int(0) NULL DEFAULT NULL,
  `status` smallint(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_medicine_category
-- ----------------------------
INSERT INTO `t_medicine_category` VALUES (1, 1, '2025-03-06 22:57:38.881391', b'0', 1, '2025-07-23 23:47:15.193693', '感冒药', '感冒药', 1, 1);
INSERT INTO `t_medicine_category` VALUES (3, 1, '2025-03-06 22:58:23.906038', b'0', 1, '2025-07-23 23:47:26.111503', '抗生素', '抗生素', 2, 1);
INSERT INTO `t_medicine_category` VALUES (4, 1, '2025-03-06 22:58:31.629945', b'0', 1, '2025-07-23 23:47:39.587452', '清热截图', '清热解毒', 3, 1);
INSERT INTO `t_medicine_category` VALUES (5, 1, '2025-07-23 23:47:59.668734', b'0', 1, '2025-07-23 23:47:59.668734', '退烧', '退烧退热', 4, 1);

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `complete_time` datetime(6) NULL DEFAULT NULL,
  `delivery_time` datetime(6) NULL DEFAULT NULL,
  `order_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pay_amount` decimal(10, 2) NOT NULL,
  `pay_time` datetime(6) NULL DEFAULT NULL,
  `pay_type` int(0) NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int(0) NOT NULL,
  `total_amount` decimal(10, 2) NOT NULL,
  `user_id` bigint(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_fjie9ovlyccw6819bahkq6b59`(`order_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_order
-- ----------------------------
INSERT INTO `t_order` VALUES (1, 1, '2025-03-07 18:41:42.109997', b'0', 1, '2025-03-07 19:31:49.761679', '123213', '2025-03-07 19:31:49.761150', '2025-03-07 19:31:23.589752', '20250307184142802', 86.00, '2025-03-07 19:00:24.150062', 0, '18161971660', 'wangkaiqi', '123123', 3, 86.00, 1);
INSERT INTO `t_order` VALUES (2, 1, '2025-03-07 19:03:51.873664', b'0', 1, '2025-03-07 19:03:51.873664', '123324', NULL, NULL, '20250307190351240', 33.00, NULL, 0, '18161971660', 'wangkaiqi', '123123', 0, 33.00, 1);
INSERT INTO `t_order` VALUES (3, 1, '2025-03-07 19:05:31.516720', b'0', 1, '2025-03-07 19:05:31.516720', '123123123', NULL, NULL, '20250307190531534', 33.00, NULL, 0, '18161971660', 'wangkaiqi', '32342', 0, 33.00, 1);
INSERT INTO `t_order` VALUES (4, 1, '2025-03-07 19:06:21.104725', b'0', 1, '2025-03-07 19:06:21.104725', '2123123', NULL, NULL, '20250307190621131', 129.00, NULL, 0, '18161971660', 'wangkaiqi', '212312', 0, 129.00, 1);
INSERT INTO `t_order` VALUES (5, 1, '2025-03-07 19:06:54.886685', b'0', 1, '2025-03-07 19:07:03.481307', '2131', NULL, NULL, '2025030719065449', 33.00, NULL, 0, '18161971660', 'wangkaiqi', '21312', 4, 33.00, 1);
INSERT INTO `t_order` VALUES (9, 5, '2025-07-22 02:08:33.658398', b'0', 5, '2025-07-22 02:09:14.915760', '王五王五王五王五王五王五王五王五', '2025-07-22 02:09:14.914763', '2025-07-22 02:08:58.718402', '20250722020833783', 43.00, '2025-07-22 02:08:41.267539', 1, '13566985632', '王五', NULL, 3, 43.00, 5);
INSERT INTO `t_order` VALUES (10, 5, '2025-07-24 11:30:39.097860', b'0', 5, '2025-07-24 11:31:37.565957', '北京东城区', '2025-07-24 11:31:37.565957', '2025-07-24 11:31:29.377509', '20250724113039622', 86.00, '2025-07-24 11:31:19.114482', 0, '15266354236', '王明', '速度', 3, 86.00, 5);
INSERT INTO `t_order` VALUES (11, 5, '2025-07-24 12:41:03.397599', b'0', 5, '2025-07-24 12:54:14.351941', '东城区', NULL, NULL, '20250724124103156', 29.00, NULL, 0, '16966523652', '王明', '1', 4, 29.00, 5);
INSERT INTO `t_order` VALUES (12, 1, '2025-07-24 12:41:49.527980', b'0', 1, '2025-07-24 12:41:49.527980', 'wangm', NULL, NULL, '2025072412414948', 65.00, NULL, 0, '16355236523', 'liuu', '1', 0, 65.00, 1);
INSERT INTO `t_order` VALUES (13, 1, '2025-07-24 12:51:14.633174', b'0', 1, '2025-07-24 12:51:14.633174', '22', NULL, NULL, '20250724125114236', 66.00, NULL, 0, '15233652365', '11', '2', 0, 66.00, 1);
INSERT INTO `t_order` VALUES (14, 5, '2025-07-24 12:54:00.349551', b'0', 5, '2025-07-24 12:54:06.098692', '14141', NULL, NULL, '20250724125400641', 19.00, NULL, 0, '16966523652', '王明', '1', 4, 19.00, 5);
INSERT INTO `t_order` VALUES (15, 5, '2025-07-24 13:36:56.499243', b'0', 5, '2025-07-24 13:37:36.308525', '11111', '2025-07-24 13:37:36.307527', '2025-07-24 13:37:24.439989', '20250724133656154', 50.00, '2025-07-24 13:37:02.146537', 0, '16966523652', '王明', '1', 3, 50.00, 5);

-- ----------------------------
-- Table structure for t_order_item
-- ----------------------------
DROP TABLE IF EXISTS `t_order_item`;
CREATE TABLE `t_order_item`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `medicine_id` bigint(0) NOT NULL,
  `medicine_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `medicine_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_id` bigint(0) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `quantity` int(0) NOT NULL,
  `subtotal` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_order_item
-- ----------------------------
INSERT INTO `t_order_item` VALUES (1, 1, '2025-03-07 18:41:42.167645', b'0', 1, '2025-03-07 18:41:42.167645', 3, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/8cdd66974a0c4fadbba54586a8c6bdae.jpg', '青霉素', 1, 43.00, 2, 86.00);
INSERT INTO `t_order_item` VALUES (2, 1, '2025-03-07 19:03:51.887146', b'0', 1, '2025-03-07 19:03:51.887146', 1, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/59b5b295db0c4a1ea3ff1e75ccc74f5d.jpg', '阿莫西林', 2, 33.00, 1, 33.00);
INSERT INTO `t_order_item` VALUES (3, 1, '2025-03-07 19:05:31.521448', b'0', 1, '2025-03-07 19:05:31.521448', 1, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/59b5b295db0c4a1ea3ff1e75ccc74f5d.jpg', '阿莫西林', 3, 33.00, 1, 33.00);
INSERT INTO `t_order_item` VALUES (4, 1, '2025-03-07 19:06:21.106844', b'0', 1, '2025-03-07 19:06:21.106844', 3, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/8cdd66974a0c4fadbba54586a8c6bdae.jpg', '青霉素', 4, 43.00, 3, 129.00);
INSERT INTO `t_order_item` VALUES (5, 1, '2025-03-07 19:06:54.889934', b'0', 1, '2025-03-07 19:06:54.889934', 1, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/59b5b295db0c4a1ea3ff1e75ccc74f5d.jpg', '阿莫西林', 5, 33.00, 1, 33.00);
INSERT INTO `t_order_item` VALUES (6, 5, '2025-07-22 02:08:33.679785', b'0', 5, '2025-07-22 02:08:33.679785', 3, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/8cdd66974a0c4fadbba54586a8c6bdae.jpg', '青霉素', 9, 43.00, 1, 43.00);
INSERT INTO `t_order_item` VALUES (7, 5, '2025-07-24 11:30:39.162195', b'0', 5, '2025-07-24 11:30:39.162195', 3, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/8cdd66974a0c4fadbba54586a8c6bdae.jpg', '青霉素', 10, 43.00, 2, 86.00);
INSERT INTO `t_order_item` VALUES (8, 5, '2025-07-24 12:41:03.399592', b'0', 5, '2025-07-24 12:41:03.399592', 6, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/cab30c00214d471fb444c3abc504960e.jpeg', '三九颗粒', 11, 29.00, 1, 29.00);
INSERT INTO `t_order_item` VALUES (9, 1, '2025-07-24 12:41:49.529976', b'0', 1, '2025-07-24 12:41:49.529976', 7, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/a45a5c38e90d42fcaa812c63cfd9f035.jpeg', '肠炎宁胶囊', 12, 65.00, 1, 65.00);
INSERT INTO `t_order_item` VALUES (10, 1, '2025-07-24 12:51:14.635167', b'0', 1, '2025-07-24 12:51:14.635167', 1, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250306/59b5b295db0c4a1ea3ff1e75ccc74f5d.jpg', '阿莫西林', 13, 33.00, 2, 66.00);
INSERT INTO `t_order_item` VALUES (11, 5, '2025-07-24 12:54:00.350517', b'0', 5, '2025-07-24 12:54:00.350517', 8, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/8edf4261ba8242aeb9b548a0aa37c377.jpg', '三七片', 14, 19.00, 1, 19.00);
INSERT INTO `t_order_item` VALUES (12, 5, '2025-07-24 13:36:56.502233', b'0', 5, '2025-07-24 13:36:56.502233', 4, 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/medicines/20250723/0cc1ad85c85d4229b7801c774b76eab3.jpeg', '利肝颗粒', 15, 50.00, 1, 50.00);

-- ----------------------------
-- Table structure for t_patient
-- ----------------------------
DROP TABLE IF EXISTS `t_patient`;
CREATE TABLE `t_patient`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `created_by` bigint(0) NULL DEFAULT NULL COMMENT '创建人ID',
  `created_time` datetime(6) NULL DEFAULT NULL COMMENT '创建时间',
  `deleted` bit(1) NULL DEFAULT b'0' COMMENT '是否删除',
  `updated_by` bigint(0) NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_time` datetime(6) NULL DEFAULT NULL COMMENT '更新时间',
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '就诊人姓名',
  `id_card` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证号',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号码',
  `gender` tinyint(0) NOT NULL COMMENT '性别(0-女,1-男)',
  `birth_date` date NULL DEFAULT NULL COMMENT '出生日期',
  `age` int(0) NULL DEFAULT NULL COMMENT '年龄',
  `relationship` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '本人' COMMENT '与用户关系(本人,父亲,母亲,配偶,子女,其他)',
  `emergency_contact` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '紧急联系人',
  `emergency_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '紧急联系人电话',
  `address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '联系地址',
  `medical_history` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '病史信息',
  `allergies` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '过敏史',
  `is_default` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否默认就诊人',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态(0-禁用,1-启用)',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE,
  INDEX `idx_phone`(`phone`) USING BTREE,
  INDEX `idx_id_card`(`id_card`) USING BTREE,
  CONSTRAINT `fk_patient_user` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '就诊人信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_patient
-- ----------------------------
INSERT INTO `t_patient` VALUES (1, NULL, '2025-07-23 14:07:18.000000', b'0', NULL, NULL, 2, '张三', '110101199001011234', '13800000001', 1, '1990-01-01', 34, 'SELF', '李四', '13800000002', '北京市朝阳区某某街道', '无重大疾病史', '青霉素过敏', b'1', 1);
INSERT INTO `t_patient` VALUES (2, NULL, '2025-07-23 14:07:18.000000', b'0', NULL, NULL, 2, '李小明', '110101201001011235', '13800000003', 1, '2010-01-01', 14, 'CHILD', '张三', '13800000001', '北京市朝阳区某某街道', '无', '无', b'0', 1);
INSERT INTO `t_patient` VALUES (3, NULL, '2025-07-23 14:07:18.000000', b'0', NULL, NULL, 4, '王芳', '110101198501011236', '18161971660', 0, '1985-01-01', 39, 'SELF', '王强', '13800000004', '上海市浦东新区某某路', '高血压病史', '无', b'1', 1);
INSERT INTO `t_patient` VALUES (4, 1, '2025-07-23 14:45:00.246500', b'0', 1, '2025-07-23 14:45:00.246500', 1, '213', '990422200101262450', '13566923654', 0, '2019-07-23', 6, 'SELF', '15366985632', NULL, '213123321323', '23232', '323', b'0', 1);
INSERT INTO `t_patient` VALUES (5, 5, '2025-07-23 15:09:53.980920', b'0', 5, '2025-07-23 15:09:53.980920', 5, '王玉', '450422199904260230', '15633562365', 1, '2015-07-21', 10, 'SELF', '13566985362', NULL, '北京西城区', '鼻炎', '无', b'0', 1);
INSERT INTO `t_patient` VALUES (6, 5, '2025-07-23 21:08:28.310506', b'0', 5, '2025-07-23 21:08:28.310506', 5, '刘璐', '100422200101262420', '13566985623', 1, '2009-07-14', 16, 'OTHER', '王月', '15633269852', '北京西城区', '鼻炎', '酒精过敏', b'1', 1);

-- ----------------------------
-- Table structure for t_schedule
-- ----------------------------
DROP TABLE IF EXISTS `t_schedule`;
CREATE TABLE `t_schedule`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '涓婚敭ID',
  `created_by` bigint(0) NULL DEFAULT NULL COMMENT '鍒涘缓浜篒D',
  `created_time` datetime(6) NULL DEFAULT NULL COMMENT '鍒涘缓鏃堕棿',
  `deleted` bit(1) NULL DEFAULT b'0' COMMENT '鏄?惁鍒犻櫎',
  `updated_by` bigint(0) NULL DEFAULT NULL COMMENT '鏇存柊浜篒D',
  `updated_time` datetime(6) NULL DEFAULT NULL COMMENT '鏇存柊鏃堕棿',
  `doctor_id` bigint(0) NOT NULL COMMENT '鍖荤敓ID',
  `hospital_id` bigint(0) NOT NULL COMMENT '鍖婚櫌ID',
  `department_id` bigint(0) NULL DEFAULT NULL COMMENT '绉戝?ID',
  `schedule_date` date NOT NULL COMMENT '鎺掔彮鏃ユ湡',
  `time_slot` tinyint(0) NOT NULL COMMENT '鏃堕棿娈?1-涓婂崍,2-涓嬪崍,3-鏅氫笂)',
  `start_time` time(0) NOT NULL COMMENT '寮??鏃堕棿',
  `end_time` time(0) NOT NULL COMMENT '缁撴潫鏃堕棿',
  `total_slots` int(0) NOT NULL DEFAULT 0 COMMENT '鎬诲彿婧愭暟閲',
  `available_slots` int(0) NOT NULL DEFAULT 0 COMMENT '鍙?敤鍙锋簮鏁伴噺',
  `consultation_fee` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '鎸傚彿璐圭敤',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '鐘舵?(0-鍋滆瘖,1-姝ｅ父)',
  `notes` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '澶囨敞淇℃伅',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_doctor_date_slot`(`doctor_id`, `schedule_date`, `time_slot`) USING BTREE,
  INDEX `idx_hospital_date`(`hospital_id`, `schedule_date`) USING BTREE,
  INDEX `idx_department_date`(`department_id`, `schedule_date`) USING BTREE,
  INDEX `idx_date_status`(`schedule_date`, `status`) USING BTREE,
  CONSTRAINT `fk_schedule_department` FOREIGN KEY (`department_id`) REFERENCES `t_department` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_schedule_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `t_doctor` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_schedule_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `t_hospital` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '鍖荤敓鎺掔彮琛' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_schedule
-- ----------------------------
INSERT INTO `t_schedule` VALUES (1, 1, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:07.070026', 1, 1, 1, '2025-07-23', 1, '08:00:00', '12:00:00', 20, 20, 300.00, 1, '涓婂崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (2, 1, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:09.309528', 1, 1, 1, '2025-07-23', 2, '14:00:00', '18:00:00', 15, 15, 300.00, 1, '涓嬪崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (3, 1, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:05.781266', 1, 1, 1, '2025-07-24', 1, '08:00:00', '12:00:00', 20, 20, 300.00, 1, '涓婂崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (4, 1, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 23:05:04.473284', 1, 1, 1, '2025-07-25', 2, '14:00:00', '18:00:00', 15, 15, 300.00, 1, '涓嬪崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (5, 1, '2025-07-22 20:55:12.000000', b'0', 1, '2025-07-24 11:52:02.966252', 2, 1, 2, '2025-07-28', 1, '08:00:00', '12:00:00', 25, 25, 250.00, 1, '1');
INSERT INTO `t_schedule` VALUES (6, 1, '2025-07-22 20:55:12.000000', b'0', 1, '2025-07-24 11:51:13.425118', 2, 1, 2, '2025-07-26', 1, '08:00:00', '12:00:00', 25, 25, 250.00, 1, '涓婂崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (7, 1, '2025-07-22 20:55:12.000000', b'0', 1, '2025-07-24 11:51:19.269692', 2, 1, 2, '2025-07-26', 2, '14:00:00', '18:00:00', 20, 20, 250.00, 1, '涓嬪崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (8, 1, '2025-07-22 20:55:12.000000', b'0', 1, '2025-07-24 11:52:13.086086', 3, 2, 3, '2025-07-26', 1, '08:00:00', '12:00:00', 30, 30, 280.00, 1, '涓婂崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (9, 1, '2025-07-22 20:55:12.000000', b'0', 1, '2025-07-24 11:52:28.275686', 3, 2, 3, '2025-07-27', 2, '14:00:00', '18:00:00', 25, 25, 280.00, 1, '1');
INSERT INTO `t_schedule` VALUES (10, 1, '2025-07-22 20:55:12.000000', b'1', 1, '2025-07-22 22:20:27.808391', 3, 2, 3, '2025-07-25', 1, '08:00:00', '12:00:00', 30, 30, 280.00, 0, '涓婂崍闂ㄨ瘖');
INSERT INTO `t_schedule` VALUES (11, 1, '2025-07-22 22:21:15.587610', b'1', 1, '2025-07-22 23:05:01.968421', 2, 1, 1, '2025-07-27', 1, '06:30:00', '11:30:00', 20, 20, 100.00, 1, '0');
INSERT INTO `t_schedule` VALUES (13, 1, '2025-07-23 00:52:17.115157', b'0', 1, '2025-07-23 00:53:22.474963', 7, 2, 12, '2025-07-25', 1, '07:00:00', '12:00:00', 20, 20, 100.00, 1, NULL);
INSERT INTO `t_schedule` VALUES (14, 1, '2025-07-23 01:06:45.104394', b'0', 1, '2025-07-23 01:06:45.104394', 5, 1, 1, '2025-07-25', 1, '07:00:00', '12:00:00', 20, 20, 100.00, 1, NULL);
INSERT INTO `t_schedule` VALUES (15, 1, '2025-07-23 01:44:10.257960', b'0', 1, '2025-07-23 01:44:10.257960', 8, 1, 5, '2025-07-26', 2, '07:00:00', '12:00:00', 20, 20, 100.00, 1, NULL);
INSERT INTO `t_schedule` VALUES (16, 1, '2025-07-24 13:46:22.806605', b'0', 1, '2025-07-24 13:46:22.806605', 10, 16, 14, '2025-07-25', 1, '07:00:00', '13:00:00', 15, 15, 100.00, 1, '1');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(0) NULL DEFAULT NULL,
  `created_time` datetime(6) NULL DEFAULT NULL,
  `deleted` bit(1) NULL DEFAULT NULL,
  `updated_by` bigint(0) NULL DEFAULT NULL,
  `updated_time` datetime(6) NULL DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `birth_date` date NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `gender` smallint(0) NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `real_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `role_type` smallint(0) NOT NULL,
  `status` smallint(0) NULL DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_jhib4legehrm4yscx9t3lirqi`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, NULL, '2025-03-04 21:23:03.130047', b'0', 1, '2025-07-23 21:46:39.174493', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatar/20250723/d79657a42c244d3fadc6d706d8b21f9a.png', '2012-03-06', 'ROOT@qq.com', 1, '$2a$10$zjQTLcCOCorl4.D20IG9p.rBlB5CLVtn6dEfUiiipls/lbHg0R72e', '13566985625', '管理员', 2, 1, 'admin');
INSERT INTO `t_user` VALUES (2, 1, '2025-03-04 21:34:05.644882', b'0', 1, '2025-07-24 11:50:21.180359', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatars/20250724/595835e87f5343a48dbcc111ca05d399.png', '2019-03-26', 'miam@qq.com', 1, '$2a$10$EdX6O.LsrEMCNcPVFd6llehT0fNigtGx7tr9crZsJGvFsc5yyi3Li', '13533214232', 'll', 1, 1, 'test_user');
INSERT INTO `t_user` VALUES (4, 1, '2025-03-07 14:03:41.833150', b'0', 1, '2025-07-24 11:50:01.683997', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatar/20250308/25b451d35f034290875b3c9c86e8fbe5.jpg', '2012-03-20', '78848@qq.com', 1, '$2a$10$42FxEdnlo/lCEH2FmicXluG2oQRC.ur2kHgS2fyozlBYRaxiz53sG', '15233652214', 'lo', 1, 1, 'test_user2');
INSERT INTO `t_user` VALUES (5, NULL, '2025-07-22 01:56:05.151958', b'0', 5, '2025-07-23 20:14:50.767193', 'http://garbage-classification-wechat.oss-cn-shanghai.aliyuncs.com/avatar/20250723/59edb6d594204890abcde2888cc4e456.png', NULL, '784784@qq.com', 0, '$2a$10$yxQcRq8k8mbjbmiRaenOMe13hnFvMFrEDbO7UyiqyZXecNOlzQ9O6', '13566985624', '刘璐', 1, 1, 'ki12');

SET FOREIGN_KEY_CHECKS = 1;
