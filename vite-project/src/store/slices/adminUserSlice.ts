import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { UserInfoDTO, UserQueryDTO, UserAddDTO, UserUpdateDTO } from '@/types/admin/user';
import * as userAPI from '@/api/admin/user';
import { message } from 'antd';

interface UserState {
  list: UserInfoDTO[];
  total: number;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  queryDTO: UserQueryDTO;
  currentUser?: UserInfoDTO | null;
}

const initialState: UserState = {
  list: [],
  total: 0,
  loading: false,
  currentPage: 1,
  pageSize: 10,
  queryDTO: {},
  currentUser: null,
};

// 获取用户列表
export const fetchUserList = createAsyncThunk(
  'adminUser/fetchList',
  async ({ page, size, queryDTO }: { page: number; size: number; queryDTO: UserQueryDTO }) => {
    const response = await userAPI.getUserList({ page, size, queryDTO });
    return response.data.data;
  }
);

// 获取用户详情
export const fetchUserDetail = createAsyncThunk(
  'adminUser/fetchDetail',
  async (id: number) => {
    const response = await userAPI.getUserDetail(id);
    return response.data;
  }
);

// 添加用户
export const addUser = createAsyncThunk(
  'adminUser/add',
  async (user: UserAddDTO) => {
    const response = await userAPI.addUser(user);
    if (response.data.code === 200) {
      message.success('添加成功');
      return response.data.data;
    }
    throw new Error(response.data.message);
  }
);

// 更新用户
export const updateUser = createAsyncThunk(
  'adminUser/update',
  async (user: UserUpdateDTO) => {
    const response = await userAPI.updateUser(user);
    if (response.data.code === 200) {
      message.success('更新成功');
      return response.data.data;
    }
    throw new Error(response.data.message);
  }
);

// 删除用户
export const deleteUser = createAsyncThunk(
  'adminUser/delete',
  async (id: number) => {
    const response = await userAPI.deleteUser(id);
    if (response.data.code === 200) {
      message.success('删除成功');
      return id;
    }
    throw new Error(response.data.message);
  }
);

// 批量删除用户
export const batchDeleteUsers = createAsyncThunk(
  'adminUser/batchDelete',
  async (ids: number[]) => {
    await userAPI.batchDeleteUsers(ids);
    return ids;
  }
);

// 启用用户
export const enableUser = createAsyncThunk(
  'adminUser/enable',
  async (id: number) => {
    const response = await userAPI.enableUser(id);
    if (response.data.code === 200) {
      message.success('启用成功');
      return id;
    }
    throw new Error(response.data.message);
  }
);

// 禁用用户
export const disableUser = createAsyncThunk(
  'adminUser/disable',
  async (id: number) => {
    const response = await userAPI.disableUser(id);
    if (response.data.code === 200) {
      message.success('禁用成功');
      return id;
    }
    throw new Error(response.data.message);
  }
);

const adminUserSlice = createSlice({
  name: 'adminUser',
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
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.total = action.payload.total;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        message.error(action.error.message || '获取用户列表失败');
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.currentUser = (action.payload as any)?.data ?? null;
      })
      .addCase(fetchUserDetail.rejected, () => {
        message.error('获取用户详情失败');
      })
      .addCase(addUser.fulfilled, () => {
        message.success('添加用户成功');
      })
      .addCase(addUser.rejected, () => {
        message.error('添加用户失败');
      })
      .addCase(updateUser.fulfilled, () => {
        message.success('更新用户成功');
      })
      .addCase(updateUser.rejected, () => {
        message.error('更新用户失败');
      })
      .addCase(deleteUser.fulfilled, () => {
        message.success('删除用户成功');
      })
      .addCase(deleteUser.rejected, () => {
        message.error('删除用户失败');
      })
        //(stats)
      .addCase(batchDeleteUsers.fulfilled, () => {
        message.success('批量删除成功');
      })
      .addCase(batchDeleteUsers.rejected, () => {
        message.error('批量删除失败');
      })
      .addCase(enableUser.fulfilled, () => {
        message.success('启用用户成功');
      })
      .addCase(enableUser.rejected, () => {
        message.error('启用用户失败');
      })
      .addCase(disableUser.fulfilled, () => {
        message.success('禁用用户成功');
      })
      .addCase(disableUser.rejected, () => {
        message.error('禁用用户失败');
      });
  },
});

export const { setCurrentPage, setPageSize, setQueryDTO } = adminUserSlice.actions;

export const selectUserList = (state: RootState) => state.adminUser.list;
export const selectUserTotal = (state: RootState) => state.adminUser.total;
export const selectUserLoading = (state: RootState) => state.adminUser.loading;
export const selectUserCurrentPage = (state: RootState) => state.adminUser.currentPage;
export const selectUserPageSize = (state: RootState) => state.adminUser.pageSize;
export const selectUserQueryDTO = (state: RootState) => state.adminUser.queryDTO;

export default adminUserSlice.reducer; 
