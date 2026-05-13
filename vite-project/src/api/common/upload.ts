import request from '@/utils/request';
import type { ResultString } from '@/types/common';

const BASE_URL = '/files';

/**
 * 上传文件
 * @param file 文件对象
 * @param folder 文件夹名称，默认为 common
 * @returns 文件访问路径
 */
export const uploadFile = async (file: File, folder: string = 'common') => {
  const formData = new FormData();
  formData.append('file', file);

  return request.post<ResultString>(`${BASE_URL}/upload`, formData, {
    params: { folder },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}; 