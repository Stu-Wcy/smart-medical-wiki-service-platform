import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { MedicineDTO, MedicineQueryDTO } from '@/types/admin/medicine';
import * as medicineAPI from '@/api/admin/medicine';
import { message } from 'antd';

interface MedicineState {
  list: MedicineDTO[];
  total: number;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  queryDTO: MedicineQueryDTO;
}

const initialState: MedicineState = {
  list: [],
  total: 0,
  loading: false,
  currentPage: 1,
  pageSize: 10,
  queryDTO: {},
};

// 获取药品列表
export const fetchMedicineList = createAsyncThunk(
  'adminMedicine/fetchList',
  async ({ page, size, queryDTO }: { page: number; size: number; queryDTO: MedicineQueryDTO }) => {
    const response = await medicineAPI.getMedicineList({ page, size, queryDTO });
    return response.data.data;
  }
);

// 添加药品
export const addMedicine = createAsyncThunk(
  'adminMedicine/add',
  async (medicine: MedicineDTO) => {
    const response = await medicineAPI.addMedicine(medicine);
    if (response.data.code === 200) {
      message.success('添加成功');
      return response.data.data;
    }
    throw new Error(response.data.message);
  }
);

// 更新药品
export const updateMedicine = createAsyncThunk(
  'adminMedicine/update',
  async (medicine: MedicineDTO) => {
    const response = await medicineAPI.updateMedicine(medicine);
    if (response.data.code === 200) {
      message.success('更新成功');
      return response.data.data;
    }
    throw new Error(response.data.message);
  }
);

// 删除药品
export const deleteMedicine = createAsyncThunk(
  'adminMedicine/delete',
  async (id: number) => {
    const response = await medicineAPI.deleteMedicine(id);
    if (response.data.code === 200) {
      message.success('删除成功');
      return id;
    }
    throw new Error(response.data.message);
  }
);

// 上架药品
export const enableMedicine = createAsyncThunk(
  'adminMedicine/enable',
  async (id: number) => {
    const response = await medicineAPI.updateMedicineStatus(id, 1);
    if (response.data.code === 200) {
      message.success('上架成功');
      return id;
    }
    throw new Error(response.data.message);
  }
);

// 下架药品
export const disableMedicine = createAsyncThunk(
  'adminMedicine/disable',
  async (id: number) => {
    const response = await medicineAPI.updateMedicineStatus(id, 0);
    if (response.data.code === 200) {
      message.success('下架成功');
      return id;
    }
    throw new Error(response.data.message);
  }
);

const adminMedicineSlice = createSlice({
  name: 'adminMedicine',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setQueryDTO: (state, action) => {
      state.queryDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicineList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicineList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
      })
      .addCase(fetchMedicineList.rejected, (state, action) => {
        state.loading = false;
        message.error(action.error.message || '获取药品列表失败');
      });
  },
});

export const { setCurrentPage, setPageSize, setQueryDTO } = adminMedicineSlice.actions;

export const selectMedicineList = (state: RootState) => state.adminMedicine.list;
export const selectMedicineTotal = (state: RootState) => state.adminMedicine.total;
export const selectMedicineLoading = (state: RootState) => state.adminMedicine.loading;
export const selectMedicineCurrentPage = (state: RootState) => state.adminMedicine.currentPage;
export const selectMedicinePageSize = (state: RootState) => state.adminMedicine.pageSize;
export const selectMedicineQueryDTO = (state: RootState) => state.adminMedicine.queryDTO;

export default adminMedicineSlice.reducer; 