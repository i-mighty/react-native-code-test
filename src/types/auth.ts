import { User } from "firebase";

export interface AuthRequestPayload {
  email: string;
  password: string
}

export enum AuthActionTypes{
  AUTH_REQUEST = 'AUTH_REQUEST',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
}

export interface AuthSuccessAction{
  type: AuthActionTypes.AUTH_SUCCESS,
  payload: User
}

export interface AuthRequestAction {
  type: AuthActionTypes.AUTH_REQUEST,
  payload: AuthRequestPayload
}

export type AuthAction = 
  | AuthRequestAction
  | AuthSuccessAction;

export interface FirebaseAuthServiceResponse {
  error: boolean,
  data?: User | null,
  message?: string,
}