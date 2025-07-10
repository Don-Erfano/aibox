export const ticketTranslations = {
  status_name: {
    admin_answer: 'در انتظار پاسخ کاربر',
    user_answer: ' در انتظار پاسخ شما',
    closed: 'بسته',
  },
  priority: {
    high: 'بالا',
    medium: 'متوسط',
    low: 'پایین',
  },
} as const;

export const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
  const colors = {
    high: 'bg-orange-500',
    medium: 'bg-cyan-300',
    low: 'bg-gray-600',
  };
  return colors[priority];
};

export const getStatusColor = (
  status_name: 'admin_answer' | 'user_answer' | 'closed'
) => {
  const colors = {
    admin_answer: 'bg-blue-500',
    user_answer: 'bg-purple-700',
    closed: 'bg-gray-500',
  };
  return colors[status_name];
};
