/**
 * 日期格式化工具
 */

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式化字符串，默认为 'YYYY-MM-DD'
 */
export function formatDate(date: Date | number | string, format = 'YYYY-MM-DD'): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return '';
  }
  
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  
  const formatMap: { [key: string]: string } = {
    'YYYY': year.toString(),
    'MM': padZero(month),
    'DD': padZero(day),
    'M': month.toString(),
    'D': day.toString(),
    'HH': padZero(hours),
    'mm': padZero(minutes),
    'ss': padZero(seconds),
    'H': hours.toString(),
    'm': minutes.toString(),
    's': seconds.toString()
  };
  
  let result = format;
  
  // 替换格式化字符串
  Object.keys(formatMap).forEach(key => {
    result = result.replace(new RegExp(key, 'g'), formatMap[key]);
  });
  
  return result;
}

/**
 * 数字补零
 * @param num 数字
 */
function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

/**
 * 获取相对时间
 * @param date 日期对象或时间戳
 */
export function getRelativeTime(date: Date | number | string): string {
  const now = new Date();
  const target = new Date(date);
  const diff = now.getTime() - target.getTime();
  
  if (diff < 0) {
    return '未来时间';
  }
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) {
    return `${years}年前`;
  } else if (months > 0) {
    return `${months}个月前`;
  } else if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return '刚刚';
  }
}

/**
 * 计算日期差
 * @param startDate 开始日期
 * @param endDate 结束日期
 */
export function getDateDiff(startDate: Date | number | string, endDate: Date | number | string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // 返回天数差
}

/**
 * 获取日期范围
 * @param startDate 开始日期
 * @param endDate 结束日期
 */
export function getDateRange(startDate: Date | number | string, endDate: Date | number | string): Date[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const result: Date[] = [];
  
  // 确保开始日期不大于结束日期
  if (start > end) {
    return result;
  }
  
  const current = new Date(start);
  while (current <= end) {
    result.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return result;
}

/**
 * 判断是否为今天
 * @param date 日期对象或时间戳
 */
export function isToday(date: Date | number | string): boolean {
  const today = new Date();
  const target = new Date(date);
  
  return today.getFullYear() === target.getFullYear() &&
    today.getMonth() === target.getMonth() &&
    today.getDate() === target.getDate();
}

/**
 * 判断是否为昨天
 * @param date 日期对象或时间戳
 */
export function isYesterday(date: Date | number | string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const target = new Date(date);
  
  return yesterday.getFullYear() === target.getFullYear() &&
    yesterday.getMonth() === target.getMonth() &&
    yesterday.getDate() === target.getDate();
}