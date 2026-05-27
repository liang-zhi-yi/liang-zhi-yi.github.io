const zhCnDateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

export function formatDate(date: Date) {
  return zhCnDateFormatter.format(date);
}
