import request from '@/utils/request';
import type { Result } from '@/types/common';

export const uploadFile = (file: File, folder: string = 'common') => {
  const form = new FormData();
  form.append('file', file);
  form.append('folder', folder);
  return request.post<Result<string>>('/files/upload', form);
};

