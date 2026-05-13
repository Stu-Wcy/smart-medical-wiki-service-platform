import request from '@/utils/request';
import type { FeedbackQueryDTO, FeedbackReplyDTO, FeedbackVO, PageResultFeedbackVO } from '@/types/feedback';

// 分页查询意见反馈列表
export function getFeedbackList(params: {
  queryDTO: FeedbackQueryDTO;
  page?: number;
  size?: number;
}) {
  return request<PageResultFeedbackVO>({
    url: '/admin/feedbacks',
    method: 'GET',
    params,
  });
}

// 获取意见反馈详情
export function getFeedbackDetail(id: number) {
  return request<FeedbackVO>({
    url: `/admin/feedbacks/${id}`,
    method: 'GET',
  });
}

// 回复意见反馈
export function replyFeedback(id: number, data: FeedbackReplyDTO) {
  return request({
    url: `/admin/feedbacks/${id}/reply`,
    method: 'PUT',
    data,
  });
} 