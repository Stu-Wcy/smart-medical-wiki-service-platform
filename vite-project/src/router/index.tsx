import { lazy } from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import AuthLayout from '../layouts/AuthLayout';
import AuthGuard from '../components/AuthGuard';
import AdminGuard from './AdminGuard';
import DoctorGuard from './DoctorGuard';
import AdminLayout from '@/layouts/AdminLayout';
import DoctorLayout from '@/layouts/DoctorLayout';
import HomePage from '../pages/home';
import NotFound from '../pages/error/404';
import Forbidden from '../pages/error/403';
import ServerError from '../pages/error/500';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import Profile from '../pages/user/profile';

// 懒加载路由组件
const DashboardPage = lazy(() => import('@/pages/admin/dashboard'));
const UsersPage = lazy(() => import('@/pages/admin/users'));
const MedicineList = lazy(() => import('@/pages/admin/medicines/medicine'));
const CategoryList = lazy(() => import('@/pages/admin/medicines/category'));
const DiseaseCategoryList = lazy(() => import('@/pages/admin/disease/category'));
const DiseaseList = lazy(() => import('@/pages/admin/disease/list'));
const AdminOrderList = lazy(() => import('@/pages/admin/orders'));
const AdminOrderDetail = lazy(() => import('@/pages/admin/orders/detail'));
const AdminProfile = lazy(() => import('@/pages/admin/profile'));
const FeedbackList = lazy(() => import('@/pages/admin/feedbacks'));
const ConsultationList = lazy(() => import('@/pages/admin/consultations'));

// 前台疾病页面
const PublicDiseaseList = lazy(() => import('@/pages/disease/list'));
const PublicDiseaseDetail = lazy(() => import('@/pages/disease/detail'));

// 前台药品页面
const PublicMedicineList = lazy(() => import('@/pages/medicine/list'));
const PublicMedicineDetail = lazy(() => import('@/pages/medicine/detail'));

// 购物车和订单页面
const Cart = lazy(() => import('@/pages/cart'));
const OrderList = lazy(() => import('@/pages/order/list'));
const OrderDetail = lazy(() => import('@/pages/order/detail'));

// AI问诊页面
const ConsultationChat = lazy(() => import('@/pages/ai/consultation'));
const ConsultationHistory = lazy(() => import('@/pages/ai/consultation/history'));

// 医院页面
const HospitalList = lazy(() => import('@/pages/hospital/HospitalList'));
const HospitalDetail = lazy(() => import('@/pages/hospital/HospitalDetail'));

// 科室页面
const DepartmentList = lazy(() => import('@/pages/department/DepartmentList'));
const DepartmentDetail = lazy(() => import('@/pages/department/DepartmentDetail'));

// 医生页面
const DoctorDetail = lazy(() => import('@/pages/doctor/DoctorDetail'));

// 管理员医院页面
const AdminHospitalList = lazy(() => import('@/pages/admin/hospital/HospitalList'));

// 管理员科室页面
const AdminDepartmentCategoryList = lazy(() => import('@/pages/admin/department/categories'));
const AdminDepartmentList = lazy(() => import('@/pages/admin/department'));

// 管理员医生页面
const AdminDoctorList = lazy(() => import('@/pages/admin/doctor'));

// 管理员排班页面
const AdminScheduleList = lazy(() => import('@/pages/admin/schedule'));

// 医生后台页面
const DoctorAppointments = lazy(() => import('@/pages/doctor/appointments'));
const DoctorConsultations = lazy(() => import('@/pages/doctor/consultations'));






// 就诊人页面
const UserPatients = lazy(() => import('@/pages/user/patients'));
const AdminPatients = lazy(() => import('@/pages/admin/patients'));

// 预约挂号页面
const AppointmentBooking = lazy(() => import('@/pages/user/appointment'));
const UserAppointments = lazy(() => import('@/pages/user/appointments'));
const AdminAppointments = lazy(() => import('@/pages/admin/appointments'));
const UserConsult = lazy(() => import('@/pages/user/consult'));
const UserConsultHistory = lazy(() => import('@/pages/user/consult/history'));
const UserConsultForm = lazy(() => import('@/pages/user/consult/form'));



// 测试页面
const TestAPI = lazy(() => import('@/pages/admin/TestAPI'));

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'disease/list', element: <PublicDiseaseList /> },
      { path: 'disease/detail/:id', element: <PublicDiseaseDetail /> },
      { path: 'medicine/list', element: <PublicMedicineList /> },
      { path: 'medicine/detail/:id', element: <PublicMedicineDetail /> },
      { path: 'hospital/list', element: <HospitalList /> },
      { path: 'hospital/detail/:id', element: <HospitalDetail /> },
      { path: 'department/list', element: <DepartmentList /> },
      { path: 'department/detail/:id', element: <DepartmentDetail /> },
      { path: 'doctor/detail/:id', element: <DoctorDetail /> },
      { path: 'consult/list', element: <UserConsult /> },
      { path: 'consult/history', element: <UserConsultHistory /> },
      { path: 'consult/form', element: <UserConsultForm /> },
      {
        path: 'ai/consultation',
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ),
        children: [
          { index: true, element: <ConsultationChat /> },
          { path: 'history', element: <ConsultationHistory /> },
        ],
      },
      {
        path: 'user',
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ),
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'patients', element: <UserPatients /> },
          { path: 'appointment', element: <AppointmentBooking /> },
          { path: 'appointments', element: <UserAppointments /> },
          { path: 'consult', element: <UserConsult /> },
          { path: 'consult/history', element: <UserConsultHistory /> },
          { path: 'consult/form', element: <UserConsultForm /> },
          { path: 'cart', element: <Cart /> },
          { path: 'order/list', element: <OrderList /> },
          { path: 'order/detail/:orderNo', element: <OrderDetail /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  // 管理后台路由
  {
    path: '/admin',
    element: (
      <AuthGuard>
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'medicines', element: <MedicineList /> },
      { path: 'medicines/categories', element: <CategoryList /> },
      { path: 'disease/categories', element: <DiseaseCategoryList /> },
      { path: 'diseases', element: <DiseaseList /> },
      { path: 'orders', element: <AdminOrderList /> },
      { path: 'orders/detail/:orderNo', element: <AdminOrderDetail /> },
      { path: 'profile', element: <AdminProfile /> },
      { path: 'feedbacks', element: <FeedbackList /> },
      { path: 'consultations', element: <ConsultationList /> },
      { path: 'hospitals', element: <AdminHospitalList /> },
      { path: 'department/categories', element: <AdminDepartmentCategoryList /> },
      { path: 'departments', element: <AdminDepartmentList /> },
      { path: 'doctors', element: <AdminDoctorList /> },
      { path: 'patients', element: <AdminPatients /> },
      { path: 'schedules', element: <AdminScheduleList /> },
      { path: 'appointments', element: <AdminAppointments /> },
      { path: 'test-api', element: <TestAPI /> },
    ],
  },
  // 医生后台路由
  {
    path: '/doctor',
    element: (
      <AuthGuard>
        <DoctorGuard>
          <DoctorLayout />
        </DoctorGuard>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/doctor/appointments" replace /> },
      { path: 'appointments', element: <DoctorAppointments /> },
      { path: 'medicines', element: <CategoryList /> },
      { path: 'diseases', element: <DiseaseList /> },
      { path: 'consultations', element: <DoctorConsultations /> },
    ],
  },
  // 错误页面路由
  {
    path: '/403',
    element: <Forbidden />,
  },
  {
    path: '/500',
    element: <ServerError />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
