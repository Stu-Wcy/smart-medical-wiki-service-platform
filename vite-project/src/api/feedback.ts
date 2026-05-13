import request  from '@/utils/request';

export interface FeedbackCreateDTO {
  type: number; // 反馈类型：1-产品建议，2-功能异常，3-使用咨询，4-其他
  content: string; // 反馈内容
  images?: string; // 图片URL，多个用逗号分隔
}

// 创建意见反馈
export const createFeedback = (data: FeedbackCreateDTO) => {
  return request({
    url: '/feedbacks',
    method: 'POST',
    data,
  });
}; 