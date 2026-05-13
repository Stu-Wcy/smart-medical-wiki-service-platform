export interface FeedbackVO {
  id: number;
  userId: number;
  type: number;
  typeDesc: string;
  content: string;
  images: string;
  status: number;
  statusDesc: string;
  reply: string;
  replyTime: string;
  createdTime: string;
}

export interface FeedbackQueryDTO {
  type?: number;
  status?: number;
  userId?: number;
  startTime?: string;
  endTime?: string;
}

export interface FeedbackReplyDTO {
  reply: string;
}

export interface PageResultFeedbackVO {
  total: number;
  list: FeedbackVO[];
  pages: number;
  pageNum: number;
  pageSize: number;
} 