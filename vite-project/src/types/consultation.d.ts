export interface ConsultationVO {
  id: number;
  userId: number;
  symptoms: string;
  diagnosis: string;
  suggestions: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  statusDesc: string;
  duration: number;
  createdTime: string;
}

export interface ConsultationQueryDTO {
  userId?: number;
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  startTime?: string;
  endTime?: string;
}

export interface ConsultationMessageVO {
  id: number;
  consultationId: number;
  type: 'USER' | 'AI';
  typeDesc: string;
  content: string;
  sequence: number;
  createdTime: string;
}

export interface ConsultationMessageDTO {
  consultationId?: number;
  content: string;
  finish?: boolean;
}

export interface PageResultConsultationVO {
  total: number;
  list: ConsultationVO[];
  pages: number;
  pageNum: number;
  pageSize: number;
} 