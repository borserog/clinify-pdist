import { PermissionsEnum } from './permissions.enum';

export interface User {
  id: string | number;
  username: string;
  email: string;
  password: string;
  active: boolean;
  permission: PermissionsEnum;
  // TODO: BACKEND
  createdOn: Date;
}

export type UserRequest = Omit<User, 'id'>;

