import { z } from 'zod';

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const setupZodErrors = () => {
  z.setErrorMap((issue, ctx) => {
    let message: string;

    switch (issue.code) {
      case 'invalid_type':
        if (issue.received === 'undefined' || issue.received === 'null') {
          message = 'این فیلد اجباری است.';
        } else if (issue.expected === 'date') {
          message = 'لطفاً یک تاریخ معتبر وارد کنید.';
        } else {
          message = 'مقدار وارد شده نامعتبر است.';
        }
        break;

      case 'too_small':
        if (issue.type === 'date') {
          const minDate = new Date(issue.minimum as number);
          message = `تاریخ باید بعد از ${formatDate(minDate)} باشد.`;
        } else if (issue.minimum === 1) {
          message = 'این فیلد اجباری است.';
        } else if (issue.type === 'array') {
          message = 'حداقل یک مورد لازم است.';
        } else {
          message = `حداقل ${issue.minimum} کاراکتر است.`;
        }
        break;

      case 'too_big':
        if (issue.type === 'date') {
          if (
            issue.maximum &&
            typeof issue.maximum === 'object' &&
            (issue.maximum as Date).getTime() ===
              new Date().setHours(0, 0, 0, 0)
          ) {
            message = 'تاریخ نمی‌تواند در آینده باشد.';
          } else {
            const maxDate = new Date(issue.maximum as number);
            message = `تاریخ باید قبل از ${formatDate(maxDate)} باشد.`;
          }
        } else if (issue.type === 'string') {
          message = `حداکثر ${issue.maximum} کاراکتر مجاز است.`;
        } else {
          message = ctx.defaultError;
        }
        break;

      case 'invalid_date':
        message = 'لطفاً یک تاریخ معتبر وارد کنید.';
        break;

      case 'invalid_string':
        if (issue.validation === 'email') {
          message =
            ctx.data === '' ? 'این فیلد اجباری است.' : 'ایمیل نامعتبر است.';
        } else {
          message = 'مقدار وارد شده نامعتبر است.';
        }
        break;

      default:
        message = ctx.defaultError;
    }

    return { message };
  });
};

export { setupZodErrors };
