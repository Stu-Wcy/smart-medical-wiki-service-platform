import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { DiseaseCategoryDTO, DiseaseCategoryQuery } from '@/types/admin/diseaseCategory';
import * as diseaseCategoryAPI from '@/api/admin/diseaseCategory';

interface DiseaseCategoryState {
  list: DiseaseCategoryDTO[];
  total: number;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  queryDTO: Partial<DiseaseCategoryQuery>;
}

const initialState: DiseaseCategoryState = {
  list: [],
  total: 0,
  loading: false,
  currentPage: 1,
  pageSize: 10,
  queryDTO: {},
};

// 获取疾病分类列表
export const fetchDiseaseCategoryList = createAsyncThunk(
  'diseaseCategory/fetchList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const { currentPage, pageSize, queryDTO } = state.diseaseCategory;
      const response = await diseaseCategoryAPI.getDiseaseCategoryList({
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

// 添加疾病分类
export const addDiseaseCategory = createAsyncThunk(
  'diseaseCategory/add',
  async (data: DiseaseCategoryDTO, { dispatch, rejectWithValue }) => {
    try {
      const response = await diseaseCategoryAPI.addDiseaseCategory(data);
      message.success('添加成功');
      dispatch(fetchDiseaseCategoryList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 更新疾病分类
export const updateDiseaseCategory = createAsyncThunk(
  'diseaseCategory/update',
  async (data: DiseaseCategoryDTO, { dispatch, rejectWithValue }) => {
    try {
      const response = await diseaseCategoryAPI.updateDiseaseCategory(data);
      message.success('更新成功');
      dispatch(fetchDiseaseCategoryList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 删除疾病分类
export const deleteDiseaseCategory = createAsyncThunk(
  'diseaseCategory/delete',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await diseaseCategoryAPI.deleteDiseaseCategory(id);
      message.success('删除成功');
      dispatch(fetchDiseaseCategoryList());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 启用疾病分类
export const enableDiseaseCategory = createAsyncThunk(
  'diseaseCategory/enable',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await diseaseCategoryAPI.enableDiseaseCategory(id);
      message.success('启用成功');
      dispatch(fetchDiseaseCategoryList());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 禁用疾病分类
export const disableDiseaseCategory = createAsyncThunk(
  'diseaseCategory/disable',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await diseaseCategoryAPI.disableDiseaseCategory(id);
      message.success('禁用成功');
      dispatch(fetchDiseaseCategoryList());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const diseaseCategorySlice = createSlice({
  name: 'diseaseCategory',
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
      .addCase(fetchDiseaseCategoryList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiseaseCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.list;
        state.total = action.payload.data.total;
      })
      .addCase(fetchDiseaseCategoryList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage, setPageSize, setQueryDTO } = diseaseCategorySlice.actions;

export default diseaseCategorySlice.reducer; 