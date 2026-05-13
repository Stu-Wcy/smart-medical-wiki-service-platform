// 存储键名
export const STORAGE_KEY = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
};

// 获取本地存储
export const getStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('获取本地存储失败：', error);
    return null;
  }
};

// 设置本地存储
export const setStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('设置本地存储失败：', error);
  }
};

// 移除本地存储
export const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('移除本地存储失败：', error);
  }
};

// 清空本地存储
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('清空本地存储失败：', error);
  }
}; 