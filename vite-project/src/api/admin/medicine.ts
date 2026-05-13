import request from '@/utils/request';
import type { Result } from '@/types/common';
import type { MedicineDTO, MedicineQueryDTO, PageResultMedicineDTO } from '@/types/admin/medicine';

const BASE_URL = '/medicines';

// 获取药品列表
export const getMedicineList = async (params: {
  page: number;
  size: number;
  queryDTO: MedicineQueryDTO;
}) => {
  const { page, size, queryDTO } = params;
  return request.get<Result<PageResultMedicineDTO>>(BASE_URL, {
    params: {
      page,
      size,
      name: queryDTO.name,
      categoryId: queryDTO.categoryId,
      manufacturer: queryDTO.manufacturer,
      status: queryDTO.status,
    },
  });
};

// 添加药品
export const addMedicine = async (medicine: MedicineDTO) => {
  return request.post<Result<MedicineDTO>>(BASE_URL, medicine);
};

// 更新药品
export const updateMedicine = async (medicine: MedicineDTO) => {
  return request.put<Result<MedicineDTO>>(`${BASE_URL}/${medicine.id}`, medicine);
};

// 删除药品
export const deleteMedicine = async (id: number) => {
  return request.delete<Result<void>>(`${BASE_URL}/${id}`);
};

// 更新药品状态
export const updateMedicineStatus = async (id: number, status: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/status`, null, {
    params: { status },
  });
}; 