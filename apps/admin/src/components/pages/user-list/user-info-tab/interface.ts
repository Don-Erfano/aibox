import { z } from 'zod';

import { userInfoSchema } from './constants';

export type UserInfoForm = z.infer<typeof userInfoSchema>;
