import { Auth } from "../firebase/AdminFirebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { IFirebaseUser, IUserCredentials } from "../Models";

export const firebaseAdminServices = {
  signOut: () => {
    return Auth.signOut();
  },

  getGames: () => {
    return;
  },
};
