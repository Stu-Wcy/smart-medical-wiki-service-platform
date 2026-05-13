import React, { useState } from 'react';
import { Button, Card, Space, message } from 'antd';
import { getAllDepartmentCategories } from '@/api/admin/departmentCategory';
import { getDepartmentList } from '@/api/admin/department';
import { adminHospitalApi } from '@/api/admin/hospital';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const TestAPI: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { token, isLoggedIn, userInfo } = useSelector((state: RootState) => state.auth);

  const testCategories = async () => {
    setLoading(true);
    try {
      console.log('测试获取分类...');
      const response = await getAllDepartmentCategories();
      console.log('分类响应:', response);
      setResult(response);
      message.success('获取分类成功');
    } catch (error) {
      console.error('获取分类失败:', error);
      message.error('获取分类失败');
      setResult(error);
    } finally {
      setLoading(false);
    }
  };

  const testDepartments = async () => {
    setLoading(true);
    try {
      console.log('测试获取科室...');
      const response = await getDepartmentList({ page: 1, size: 10 });
      console.log('科室响应:', response);
      setResult(response);
      message.success('获取科室成功');
    } catch (error) {
      console.error('获取科室失败:', error);
      message.error('获取科室失败');
      setResult(error);
    } finally {
      setLoading(false);
    }
  };

  const testHospitals = async () => {
    setLoading(true);
    try {
      console.log('测试获取医院...');
      const response = await adminHospitalApi.getList({ status: 1, page: 1, size: 10 });
      console.log('医院响应:', response);
      setResult(response);
      message.success('获取医院成功');
    } catch (error) {
      console.error('获取医院失败:', error);
      message.error('获取医院失败');
      setResult(error);
    } finally {
      setLoading(false);
    }
  };

  const checkToken = () => {
    const localToken = localStorage.getItem('token');
    console.log('localStorage token:', localToken);
    console.log('Redux token:', token);
    console.log('isLoggedIn:', isLoggedIn);
    console.log('userInfo:', userInfo);
    setResult({
      localToken,
      reduxToken: token,
      isLoggedIn,
      userInfo
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="API测试">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space>
            <Button onClick={testCategories} loading={loading}>
              测试获取分类
            </Button>
            <Button onClick={testDepartments} loading={loading}>
              测试获取科室
            </Button>
            <Button onClick={testHospitals} loading={loading}>
              测试获取医院
            </Button>
            <Button onClick={checkToken}>
              检查Token
            </Button>
          </Space>
          
          {result && (
            <Card title="结果" style={{ marginTop: 16 }}>
              <pre style={{ maxHeight: 400, overflow: 'auto' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </Card>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default TestAPI;
