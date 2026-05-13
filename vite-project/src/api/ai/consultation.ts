import request from '@/utils/request';
import type {
  ConsultationVO,
  ConsultationMessageVO,
  PageResultConsultationVO,
  ConsultationMessageDTO,
} from '@/types/consultation';

// 分页查询我的问诊记录
export function getMyConsultationList(params: {
  queryDTO: {
    status?: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    startTime?: string;
    endTime?: string;
  };
  page?: number;
  size?: number;
}) {
  return request<{ data: PageResultConsultationVO }>({
    url: '/public/ai/consultations',
    method: 'GET',
    params,
    timeout: 30000,
  });
}

// 获取问诊记录详情
export function getConsultationDetail(id: number) {
  return request<{ data: ConsultationVO }>({
    url: `/public/ai/consultations/${id}`,
    method: 'GET',
    timeout: 30000,
  });
}

// 获取问诊记录的消息列表
export function getConsultationMessages(id: number) {
  return request<{ data: ConsultationMessageVO[] }>({
    url: `/public/ai/consultations/${id}/messages`,
    method: 'GET',
    timeout: 30000,
  });
}

// 发送问诊消息
export function sendConsultationMessage(data: ConsultationMessageDTO) {
  return request<{ data: ConsultationMessageVO }>({
    url: '/public/ai/consultations/messages',
    method: 'POST',
    data,
    timeout: 60000,
  });
} 