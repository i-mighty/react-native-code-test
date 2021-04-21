import { User } from "firebase"
import { AuthActionTypes, AuthRequestPayload } from "../../types/auth"

export const authRequest = (payload: AuthRequestPayload) => {
  return {
    type: AuthActionTypes.AUTH_REQUEST,
    payload
  }
}

export const authRequestSuccess = (payload: User) => {
  return {
    type: AuthActionTypes.AUTH_SUCCESS,
    payload
  }
};