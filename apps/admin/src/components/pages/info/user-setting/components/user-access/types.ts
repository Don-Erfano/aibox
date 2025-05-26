export type UserLevels = 'admin' | 'operator' | 'user';

export interface UserAccessLevelProps {
  userLevel: UserLevels;
  userId: string;
}

export type FormValues = {
  accessLevel: UserLevels;
};
