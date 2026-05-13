package com.example.backend.modules.doctor.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.modules.doctor.dto.*;
import com.example.backend.modules.doctor.entity.Doctor;

import java.util.List;

/**
 * 医生信息服务接口
 */
public interface DoctorService {

    /**
     * 分页查询医生列表
     */
    PageResult<DoctorDTO> getDoctorList(DoctorQueryDTO queryDTO, int page, int size);

    /**
     * 根据医院ID获取医生列表
     */
    List<DoctorDTO> getDoctorsByHospitalId(Long hospitalId);

    /**
     * 根据科室ID获取医生列表
     */
    List<DoctorDTO> getDoctorsByDepartmentId(Long departmentId);

    /**
     * 获取医生详情
     */
    DoctorDTO getDoctorById(Long id);

    /**
     * 添加医生
     */
    DoctorDTO addDoctor(DoctorAddDTO addDTO);

    /**
     * 更新医生信息
     */
    DoctorDTO updateDoctor(DoctorUpdateDTO updateDTO);

    /**
     * 删除医生
     */
    void deleteDoctor(Long id);

    /**
     * 批量删除医生
     */
    void deleteDoctors(List<Long> ids);

    /**
     * 更新医生状态
     */
    void updateDoctorStatus(Long id, Integer status);
}
