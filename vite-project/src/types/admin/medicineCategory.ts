// 药品分类信息DTO
export interface MedicineCategoryDTO {
  id?: number;
  name: string;
  description?: string;
  sort?: number;
  status?: number; // 0-禁用，1-正常
}

// 药品分类查询DTO
export interface MedicineCategoryQueryDTO {
  name?: string;
}

// 分页查询结果
export interface PageResultMedicineCategoryDTO {
  total: number;
  list: MedicineCategoryDTO[];
  pages: number;
  pageNum: number;
  pageSize: number;
} 