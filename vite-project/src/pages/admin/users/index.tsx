import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Modal,
  Select,
  Popconfirm,
  Avatar,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUserList,
  deleteUser,
  enableUser,
  disableUser,
  batchDeleteUsers,
  setCurrentPage,
  setPageSize,
  setQueryDTO,
  selectUserList,
  selectUserTotal,
  selectUserLoading,
  selectUserCurrentPage,
  selectUserPageSize,
  selectUserQueryDTO,
} from '@/store/slices/adminUserSlice';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';
import type { UserInfoDTO } from '@/types/admin/user';
import { 
  Gender, 
  RoleType, 
  UserStatus, 
  GENDER_MAP, 
  ROLE_TYPE_MAP, 
  USER_STATUS_MAP,
  getEnumText,
  getEnumValue
} from '@/constants/enums';
import styles from './styles.module.less';

const { Option } = Select;

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserList);
  const total = useAppSelector(selectUserTotal);
  const loading = useAppSelector(selectUserLoading);
  const currentPage = useAppSelector(selectUserCurrentPage);
  const pageSize = useAppSelector(selectUserPageSize);
  const queryDTO = useAppSelector(selectUserQueryDTO);

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [currentUser, setCurrentUser] = useState<Partial<UserInfoDTO>>();
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentDetailUser, setCurrentDetailUser] = useState<UserInfoDTO>();

  useEffect(() => {
    loadData();
  }, [currentPage, pageSize, queryDTO]);

  const loadData = () => {
    dispatch(fetchUserList({
      page: currentPage,
      size: pageSize,
      queryDTO,
    }));
  };

  const handleAdd = () => {
    setFormTitle('添加用户');
    setCurrentUser(undefined);
    setFormVisible(true);
  };

  const handleEdit = (record: UserInfoDTO) => {
    setFormTitle('编辑用户');
    setCurrentUser(record);
    setFormVisible(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteUser(id)).unwrap();
    loadData();
  };

  const handleStatusChange = async (id: number, status: UserStatus) => {
    if (UserStatus[status] === UserStatus.NORMAL as any) {
      await dispatch(disableUser(id)).unwrap();
    } else {
      await dispatch(enableUser(id)).unwrap();
    }
    loadData();
  };

  const handleReset = () => {
    dispatch(setQueryDTO({
      username: undefined,
      phone: undefined,
      email: undefined,
      realName: undefined,
      status: undefined,
    }));
    dispatch(setCurrentPage(1));
  };

  const handleSearch = (values: any) => {
    const queryDTO = {
      username: values.username || undefined,
      phone: values.phone || undefined,
      email: values.email || undefined,
      realName: values.realName || undefined,
      status: values.status || undefined,
    };
    dispatch(setQueryDTO(queryDTO));
    dispatch(setCurrentPage(1));
  };

  const handleBatchDelete = () => {
    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await dispatch(batchDeleteUsers(selectedRowKeys.map(Number)));
        setSelectedRowKeys([]);
        loadData();
      },
    });
  };

  const handleTableChange = (page: number, newPageSize?: number) => {
    dispatch(setCurrentPage(page));
    if (newPageSize !== pageSize) {
      dispatch(setPageSize(newPageSize || 10));
    }
    loadData();
  };

  const handleViewDetail = (record: UserInfoDTO) => {
    setCurrentDetailUser(record);
    setDetailVisible(true);
  };

  const columns: ColumnsType<UserInfoDTO> = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string) => (
        <Avatar src={avatar} size="large">
          {avatar ? '' : 'U'}
        </Avatar>
      ),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender: Gender) => getEnumText(GENDER_MAP,Gender[gender]),
    },
    {
      title: '角色',
      dataIndex: 'roleType',
      key: 'roleType',
      width: 100,
      render: (roleType: RoleType) => {
        const colorMap = {
          [RoleType.USER]: 'blue',
          [RoleType.ADMIN]: 'red',
          [RoleType.VISITOR]: 'default',
        };
        return (
          <Tag color={colorMap[roleType as keyof typeof colorMap]}>
            {getEnumText(ROLE_TYPE_MAP, RoleType[roleType])}
          </Tag>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: UserStatus, record: UserInfoDTO) => {
        const colorMap = {
          [UserStatus.NORMAL]: 'success',
          [UserStatus.DISABLED]: 'error',
        };
        const value = getEnumValue(USER_STATUS_MAP, UserStatus[status], UserStatus.NORMAL);

        return (
          <Tag color={ colorMap[value as UserStatus] } onClick={() => handleStatusChange(record.id, record.status)} style={{ cursor: 'pointer' }}>
            {getEnumText(USER_STATUS_MAP, UserStatus[status])}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: any, record: UserInfoDTO) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleViewDetail(record)}>
            查看
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.users}>
      <Card>
        <div className={styles.toolbar}>
          <Space>
            <Input
              placeholder="搜索用户名"
              prefix={<SearchOutlined />}
              allowClear
              value={queryDTO.username}
              onChange={(e) => handleSearch({ ...queryDTO, username: e.target.value })}
              style={{ width: 120 }}
            />
            <Input
              placeholder="真实姓名"
              allowClear
              value={queryDTO.realName}
              onChange={(e) => handleSearch({ ...queryDTO, realName: e.target.value })}
              style={{ width: 120 }}
            />
            <Input
              placeholder="手机号"
              allowClear
              value={queryDTO.phone}
              onChange={(e) => handleSearch({ ...queryDTO, phone: e.target.value })}
              style={{ width: 120 }}
            />
            <Input
              placeholder="邮箱"
              allowClear
              value={queryDTO.email}
              onChange={(e) => handleSearch({ ...queryDTO, email: e.target.value })}
              style={{ width: 180 }}
            />
            <Select
              placeholder="状态"
              allowClear
              value={queryDTO.status}
              onChange={(value) => handleSearch({ ...queryDTO, status: value })}
              style={{ width: 100 }}
            >
              {Object.values(USER_STATUS_MAP).map(({ text, value }) => (
                <Option key={value} value={value}>{text}</Option>
              ))}
            </Select>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加用户
            </Button>
          </Space>
          <Space>
            <Button
              danger
              disabled={selectedRowKeys.length === 0}
              onClick={handleBatchDelete}
            >
              批量删除
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: handleTableChange,
          }}
        />
      </Card>

      <UserForm
        open={formVisible}
        title={formTitle}
        initialValues={currentUser}
        onCancel={() => {
          setFormVisible(false);
          setCurrentUser(undefined);
        }}
        onSuccess={() => {
          setFormVisible(false);
          setCurrentUser(undefined);
          loadData();
        }}
      />

      <UserDetail
        open={detailVisible}
        user={currentDetailUser}
        onCancel={() => {
          setDetailVisible(false);
          setCurrentDetailUser(undefined);
        }}
      />
    </div>
  );
};

export default UserList; 
