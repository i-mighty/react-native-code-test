import { auth, User } from "firebase"
import { FirebaseAuthServiceResponse } from "../types/auth";

export const firebaseAuthRequest = async (email: string, password: string): Promise<FirebaseAuthServiceResponse> => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    return {
      error: false,
      data: res.user
    }
  } catch (error) {
    return {
      error: true,
      message: error.message
    }
  }
}