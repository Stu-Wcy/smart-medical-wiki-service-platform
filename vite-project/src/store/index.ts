import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import adminMedicineReducer from './slices/adminMedicineSlice';
import adminMedicineCategoryReducer from './slices/adminMedicineCategorySlice';
import adminUserReducer from './slices/adminUserSlice';
import diseaseCategoryReducer from './slices/diseaseCategorySlice';
import diseaseReducer from './slices/diseaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminMedicine: adminMedicineReducer,
    adminMedicineCategory: adminMedicineCategoryReducer,
    adminUser: adminUserReducer,
    diseaseCategory: diseaseCategoryReducer,
    disease: diseaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; 