import request from '@/utils/request';
import type {
  ConsultationQueryDTO,
  ConsultationVO,
  ConsultationMessageVO,
  ConsultationMessageDTO,
  PageResultConsultationVO,
} from '@/types/consultation';

// 分页查询我的问诊记录
export function getConsultationList(params: {
  queryDTO: ConsultationQueryDTO;
  page?: number;
  size?: number;
}) {
  return request<PageResultConsultationVO>({
    url: '/ai/consultations',
    method: 'GET',
    params,
  });
}

// 获取问诊记录详情
export function getConsultationDetail(id: number) {
  return request<ConsultationVO>({
    url: `/ai/consultations/${id}`,
    method: 'GET',
  });
}

// 获取问诊记录的消息列表
export function getConsultationMessages(id: number) {
  return request<ConsultationMessageVO[]>({
    url: `/ai/consultations/${id}/messages`,
    method: 'GET',
  });
}

// 发送问诊消息
export function sendConsultationMessage(data: ConsultationMessageDTO) {
  return request<ConsultationMessageVO>({
    url: '/ai/consultations/messages',
    method: 'POST',
    data,
  });
} 