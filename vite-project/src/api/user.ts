import request from '@/utils/request';
import type { Result } from '@/types/common';

export const heartbeat = () => {
  return request.post<Result<void>>('/user/heartbeat');
};
