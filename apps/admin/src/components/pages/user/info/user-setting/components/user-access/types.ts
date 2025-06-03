export type UserLevels = 'admin' | 'operator' | 'user';

export interface UserAccessLevelProps {
  userLevel: UserLevels;
}

export type FormValues = {
  accessLevel: UserLevels;
};
