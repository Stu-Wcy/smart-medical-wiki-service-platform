import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { MedicineCategoryDTO } from '@/types/admin/medicineCategory';
import * as medicineCategoryAPI from '@/api/admin/medicineCategory';
import { message } from 'antd';

interface MedicineCategoryState {
  list: MedicineCategoryDTO[];
  allCategories: MedicineCategoryDTO[];
  total: number;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  name: string;
}

const initialState: MedicineCategoryState = {
  list: [],
  allCategories: [],
  total: 0,
  loading: false,
  currentPage: 1,
  pageSize: 10,
  name: '',
};

// 获取分类列表
export const fetchMedicineCategoryList = createAsyncThunk(
  'adminMedicineCategory/fetchList',
  async (params: { page?: number; size?: number; name?: string }) => {
    const response = await medicineCategoryAPI.getMedicineCategoryList(params);
    return response.data;
  }
);

// 获取所有分类
export const fetchAllMedicineCategories = createAsyncThunk(
  'adminMedicineCategory/fetchAll',
  async () => {
    const response = await medicineCategoryAPI.getAllMedicineCategories();
    return response.data;
  }
);

// 添加分类
export const addMedicineCategory = createAsyncThunk(
  'adminMedicineCategory/add',
  async (category: MedicineCategoryDTO) => {
    const response = await medicineCategoryAPI.addMedicineCategory(category);
    message.success('添加成功');
    return response.data;
  }
);

// 更新分类
export const updateMedicineCategory = createAsyncThunk(
  'adminMedicineCategory/update',
  async ({ id, data }: { id: number; data: MedicineCategoryDTO }) => {
    const response = await medicineCategoryAPI.updateMedicineCategory(id, data);
    message.success('更新成功');
    return response.data;
  }
);

// 删除分类
export const deleteMedicineCategory = createAsyncThunk(
  'adminMedicineCategory/delete',
  async (id: number) => {
    await medicineCategoryAPI.deleteMedicineCategory(id);
    message.success('删除成功');
    return id;
  }
);

// 更新分类状态
export const updateMedicineCategoryStatus = createAsyncThunk(
  'adminMedicineCategory/updateStatus',
  async ({ id, status }: { id: number; status: number }) => {
    await medicineCategoryAPI.updateMedicineCategoryStatus(id, status);
    message.success(status === 1 ? '启用成功' : '禁用成功');
    return { id, status };
  }
);

const adminMedicineCategorySlice = createSlice({
  name: 'adminMedicineCategory',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 获取分类列表
      .addCase(fetchMedicineCategoryList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicineCategoryList.fulfilled, (state, action) => {
        const result: any = action.payload;
        if (result?.data) {
          state.list = result.data.list || result.data.records || [];
          state.total = result.data.total ?? result.data.pages ?? 0;
        }
        state.loading = false;
      })
      .addCase(fetchMedicineCategoryList.rejected, (state) => {
        state.loading = false;
        message.error('获取分类列表失败');
      })
      // 获取所有分类
      .addCase(fetchAllMedicineCategories.fulfilled, (state, action) => {
        const result: any = action.payload;
        if (result?.data) {
          state.allCategories = result.data.list || result.data || [];
        }
      });
  },
});

export const { setName, setCurrentPage, setPageSize } = adminMedicineCategorySlice.actions;

export const selectMedicineCategoryList = (state: RootState) => state.adminMedicineCategory.list;
export const selectAllMedicineCategories = (state: RootState) => state.adminMedicineCategory.allCategories;
export const selectMedicineCategoryTotal = (state: RootState) => state.adminMedicineCategory.total;
export const selectMedicineCategoryLoading = (state: RootState) => state.adminMedicineCategory.loading;
export const selectMedicineCategoryCurrentPage = (state: RootState) => state.adminMedicineCategory.currentPage;
export const selectMedicineCategoryPageSize = (state: RootState) => state.adminMedicineCategory.pageSize;
export const selectMedicineCategoryName = (state: RootState) => state.adminMedicineCategory.name;

export default adminMedicineCategorySlice.reducer; 
