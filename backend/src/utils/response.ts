import { Response } from 'express';

/**
 * API响应接口
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  timestamp: string;
}

/**
 * 响应工具类
 */
export class ResponseUtil {
  /**
   * 成功响应
   */
  public static success<T>(res: Response, data?: T, message = '操作成功', code = 200): void {
    const response: ApiResponse<T> = {
      code,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    res.status(code).json(response);
  }

  /**
   * 失败响应
   */
  public static error(res: Response, message = '操作失败', code = 500, data?: any): void {
    const response: ApiResponse = {
      code,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    res.status(code).json(response);
  }

  /**
   * 参数错误响应
   */
  public static badRequest(res: Response, message = '参数错误', data?: any): void {
    this.error(res, message, 400, data);
  }

  /**
   * 未授权响应
   */
  public static unauthorized(res: Response, message = '未授权访问'): void {
    this.error(res, message, 401);
  }

  /**
   * 禁止访问响应
   */
  public static forbidden(res: Response, message = '禁止访问'): void {
    this.error(res, message, 403);
  }

  /**
   * 资源未找到响应
   */
  public static notFound(res: Response, message = '资源未找到'): void {
    this.error(res, message, 404);
  }

  /**
   * 服务器错误响应
   */
  public static serverError(res: Response, message = '服务器内部错误', data?: any): void {
    this.error(res, message, 500, data);
  }
}