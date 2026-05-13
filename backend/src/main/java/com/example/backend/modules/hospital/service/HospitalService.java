package com.example.backend.modules.hospital.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.exception.ServiceException;
import com.example.backend.modules.hospital.dto.*;
import com.example.backend.modules.hospital.entity.Hospital;
import com.example.backend.modules.hospital.enums.HospitalLevelEnum;
import com.example.backend.modules.hospital.enums.HospitalStatusEnum;
import com.example.backend.modules.hospital.enums.HospitalTypeEnum;
import com.example.backend.modules.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 医院信息服务
 */
@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    /**
     * 分页查询医院列表
     */
    public PageResult<HospitalVO> list(HospitalQueryDTO queryDTO, Integer page, Integer size) {
        // 分页查询
        Page<Hospital> hospitalPage = hospitalRepository.findByConditions(
            queryDTO.getName(),
            queryDTO.getProvince(),
            queryDTO.getCity(),
            queryDTO.getLevel(),
            queryDTO.getType(),
            queryDTO.getStatus(),
            PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "sort", "id"))
        );

        // 转换为VO
        Page<HospitalVO> voPage = hospitalPage.map(this::convertToVO);
        return PageResult.build(voPage);
    }

    /**
     * 获取医院详情
     */
    public HospitalVO get(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ServiceException("医院不存在"));
        return convertToVO(hospital);
    }

    /**
     * 新增医院
     */
    @Transactional
    public HospitalVO add(HospitalAddDTO addDTO) {
        // 创建医院实体
        Hospital hospital = new Hospital();
        BeanUtils.copyProperties(addDTO, hospital);
        
        // 设置枚举字段
        hospital.setLevel(addDTO.getLevel());
        hospital.setType(addDTO.getType());
        hospital.setStatus(addDTO.getStatus() != null ? addDTO.getStatus() : 1);

        // 保存
        hospital = hospitalRepository.save(hospital);
        return convertToVO(hospital);
    }

    /**
     * 更新医院
     */
    @Transactional
    public HospitalVO update(HospitalUpdateDTO updateDTO) {
        // 查询医院
        Hospital hospital = hospitalRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ServiceException("医院不存在"));

        // 更新字段
        BeanUtils.copyProperties(updateDTO, hospital);
        
        // 设置枚举字段
        hospital.setLevel(updateDTO.getLevel());
        hospital.setType(updateDTO.getType());
        hospital.setStatus(updateDTO.getStatus() != null ? updateDTO.getStatus() : 1);

        // 保存
        hospital = hospitalRepository.save(hospital);
        return convertToVO(hospital);
    }

    /**
     * 删除医院
     */
    @Transactional
    public void delete(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ServiceException("医院不存在"));
        
        // 软删除
        hospital.setDeleted(true);
        hospitalRepository.save(hospital);
    }

    /**
     * 批量删除医院
     */
    @Transactional
    public void batchDelete(List<Long> ids) {
        List<Hospital> hospitals = hospitalRepository.findAllById(ids);
        hospitals.forEach(hospital -> hospital.setDeleted(true));
        hospitalRepository.saveAll(hospitals);
    }

    /**
     * 获取所有省份
     */
    public List<String> getProvinces() {
        return hospitalRepository.findDistinctProvinces(HospitalStatusEnum.NORMAL.getValue());
    }

    /**
     * 根据省份获取城市
     */
    public List<String> getCitiesByProvince(String province) {
        return hospitalRepository.findDistinctCitiesByProvince(province, HospitalStatusEnum.NORMAL.getValue());
    }

    /**
     * 公共接口：获取正常状态的医院列表
     */
    public PageResult<HospitalVO> listForPublic(HospitalQueryDTO queryDTO, Integer page, Integer size) {
        // 强制设置状态为正常
        queryDTO.setStatus(HospitalStatusEnum.NORMAL.getValue());
        return list(queryDTO, page, size);
    }

    /**
     * 公共接口：获取医院详情
     */
    public HospitalVO getForPublic(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ServiceException("医院不存在"));

        // 检查状态
        if (!HospitalStatusEnum.NORMAL.getValue().equals(hospital.getStatus())) {
            throw new ServiceException("医院不存在");
        }

        return convertToVO(hospital);
    }

    /**
     * 转换为VO
     */
    private HospitalVO convertToVO(Hospital hospital) {
        HospitalVO vo = new HospitalVO();
        BeanUtils.copyProperties(hospital, vo);

        // 设置枚举描述
        HospitalLevelEnum levelEnum = HospitalLevelEnum.findByValue(hospital.getLevel());
        HospitalTypeEnum typeEnum = HospitalTypeEnum.findByValue(hospital.getType());
        HospitalStatusEnum statusEnum = HospitalStatusEnum.findByValue(hospital.getStatus());

        vo.setLevelWithDesc(levelEnum);
        vo.setTypeWithDesc(typeEnum);
        vo.setStatusWithDesc(statusEnum);

        // 设置完整地址
        vo.setAddressFields(hospital.getProvince(), hospital.getCity(),
                           hospital.getDistrict(), hospital.getAddress());

        return vo;
    }
}
