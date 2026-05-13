import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { DiseaseDTO, DiseaseQueryDTO } from '@/types/admin/disease';
import * as diseaseAPI from '@/api/admin/disease';

interface DiseaseState {
  list: DiseaseDTO[];
  total: number;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  queryDTO: Partial<DiseaseQueryDTO>;
}

const initialState: DiseaseState = {
  list: [],
  total: 0,
  loading: false,
  currentPage: 1,
  pageSize: 10,
  queryDTO: {},
};

// 获取疾病列表
export const fetchDiseaseList = createAsyncThunk(
  'disease/fetchList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const { currentPage, pageSize, queryDTO } = state.disease;
      const response = await diseaseAPI.getDiseaseList({
        page: currentPage,
        size: pageSize,
        ...queryDTO,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 添加疾病
export const addDisease = createAsyncThunk(
  'disease/add',
  async (data: DiseaseDTO, { dispatch, rejectWithValue }) => {
    try {
      const response = await diseaseAPI.addDisease(data);
      message.success('添加成功');
      dispatch(fetchDiseaseList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 更新疾病
export const updateDisease = createAsyncThunk(
  'disease/update',
  async (data: DiseaseDTO, { dispatch, rejectWithValue }) => {
    try {
      const response = await diseaseAPI.updateDisease(data);
      message.success('更新成功');
      dispatch(fetchDiseaseList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 删除疾病
export const deleteDisease = createAsyncThunk(
  'disease/delete',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await diseaseAPI.deleteDisease(id);
      message.success('删除成功');
      dispatch(fetchDiseaseList());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 启用疾病
export const enableDisease = createAsyncThunk(
  'disease/enable',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await diseaseAPI.enableDisease(id);
      message.success('启用成功');
      dispatch(fetchDiseaseList());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 禁用疾病
export const disableDisease = createAsyncThunk(
  'disease/disable',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await diseaseAPI.disableDisease(id);
      message.success('禁用成功');
      dispatch(fetchDiseaseList());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const diseaseSlice = createSlice({
  name: 'disease',
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
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiseaseList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiseaseList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.list;
        state.total = action.payload.data.total;
      })
      .addCase(fetchDiseaseList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage, setPageSize, setQueryDTO } = diseaseSlice.actions;

export default diseaseSlice.reducer; 