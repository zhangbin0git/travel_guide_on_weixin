/**
 * 验证工具函数
 */

/**
 * 验证手机号
 * @param phone 手机号
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 验证邮箱
 * @param email 邮箱
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * 验证身份证号
 * @param idCard 身份证号
 */
export function isValidIdCard(idCard: string): boolean {
  // 简单验证18位身份证
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  return idCardRegex.test(idCard);
}

/**
 * 验证URL
 * @param url URL地址
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 验证密码强度
 * @param password 密码
 * @param minLength 最小长度
 */
export function isValidPassword(password: string, minLength = 8): boolean {
  if (password.length < minLength) {
    return false;
  }
  
  // 至少包含一个数字、一个字母
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  
  return hasNumber && hasLetter;
}

/**
 * 验证日期格式
 * @param date 日期字符串
 * @param format 格式，默认为 YYYY-MM-DD
 */
export function isValidDate(date: string, format = 'YYYY-MM-DD'): boolean {
  if (!date) {
    return false;
  }
  
  // 简单验证 YYYY-MM-DD 格式
  if (format === 'YYYY-MM-DD') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return false;
    }
    
    const parts = date.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    
    const dateObj = new Date(year, month - 1, day);
    
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }
  
  // 其他格式可以扩展
  return false;
}

/**
 * 验证是否为数字
 * @param value 值
 */
export function isNumber(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * 验证是否为整数
 * @param value 值
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(Number(value));
}

/**
 * 验证是否为空字符串
 * @param value 值
 */
export function isEmptyString(value: any): boolean {
  return typeof value === 'string' && value.trim() === '';
}

/**
 * 验证是否为空数组
 * @param value 值
 */
export function isEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length === 0;
}

/**
 * 验证是否为空对象
 * @param value 值
 */
export function isEmptyObject(value: any): boolean {
  return typeof value === 'object' && value !== null && Object.keys(value).length === 0;
}

/**
 * 验证是否为空值
 * @param value 值
 */
export function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    isEmptyString(value) ||
    isEmptyArray(value) ||
    isEmptyObject(value)
  );
}

/**
 * 验证字符串长度
 * @param value 字符串
 * @param min 最小长度
 * @param max 最大长度
 */
export function isValidLength(value: string, min: number, max?: number): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  
  const length = value.length;
  
  if (max !== undefined) {
    return length >= min && length <= max;
  }
  
  return length >= min;
}

/**
 * 验证数字范围
 * @param value 数字
 * @param min 最小值
 * @param max 最大值
 */
export function isValidRange(value: number, min: number, max?: number): boolean {
  if (!isNumber(value)) {
    return false;
  }
  
  const num = Number(value);
  
  if (max !== undefined) {
    return num >= min && num <= max;
  }
  
  return num >= min;
}

/**
 * 验证经度
 * @param longitude 经度
 */
export function isValidLongitude(longitude: number): boolean {
  return isValidRange(longitude, -180, 180);
}

/**
 * 验证纬度
 * @param latitude 纬度
 */
export function isValidLatitude(latitude: number): boolean {
  return isValidRange(latitude, -90, 90);
}