// API 响应结果
export interface Result<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 通用API响应类型别名
export type ResultData<T = unknown> = Result<T>;
export type ResultPageData<T = unknown> = Result<PageResult<T>>;

// 分页结果
export interface PageResult<T = unknown> {
  total: number;
  list: T[];
  pages: number;
  pageNum: number;
  pageSize: number;
}

// 分页查询参数
export interface PageParams {
  page?: number;
  size?: number;
}

// 文件上传响应
export interface ResultString {
  code: number;
  message: string;
  data: string;
}

// // 文件上传参数
// export interface UploadParams {
//   file: File;
//   folder?: string;
// }