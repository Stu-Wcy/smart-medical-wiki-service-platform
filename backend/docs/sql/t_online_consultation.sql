CREATE TABLE IF NOT EXISTS t_online_consultation (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  patient_id BIGINT NOT NULL,
  doctor_id BIGINT NOT NULL,
  status TINYINT,
  patient_condition TEXT NOT NULL,
  doctor_reply TEXT,
  pic_path VARCHAR(1000),
  evaluation TINYINT,
  created_at DATETIME,
  replied_at DATETIME,
  is_mailed TINYINT(1)
) COMMENT='线上咨询表';
