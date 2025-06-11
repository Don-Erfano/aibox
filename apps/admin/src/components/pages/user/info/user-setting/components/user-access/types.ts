export type UserLevels = 'admin' | 'operator' | 'user';

export interface UserAccessLevelProps {
  accessLevel: UserLevels;
  userId: string;
}

export type FormValues = {
  accessLevel: UserLevels;
};
