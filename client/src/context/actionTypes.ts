import { UserResponse } from 'interface';

export enum ActionType {
  AddAuth,
  AddUser,
  Reset,
}

export interface AddAuth {
  type: ActionType.AddAuth;
  payload: { token: string };
}

export interface AddUser {
  type: ActionType.AddUser;
  payload: UserResponse;
}

export interface ResetAppState {
  type: ActionType.Reset;
}

export type AppActions = AddAuth | AddUser | ResetAppState;
