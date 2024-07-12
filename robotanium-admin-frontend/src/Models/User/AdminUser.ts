import {UserInfo} from 'firebase/auth'


export interface IFirebaseUser  extends UserInfo {
   emailVerified : boolean;
   idToken: string;
} 

export interface IAdminUser   {
   displayName:string | null;
   emailVerified: boolean;
   email:string | null;
   phoneNumber: string|null;
   photoURL:string | null;
   providerId:string | null;
   uid:string | null
}

export const emptyAdminUser:IAdminUser = {
   displayName:null,
   emailVerified: false,
   email:null,
   phoneNumber:null,
   photoURL:null,
   providerId:'',
   uid:''
}

export const emptyFireBaseUser:IFirebaseUser = {
   displayName:null,
   emailVerified: false,
   email:null,
   phoneNumber:null,
   photoURL:null,
   providerId:'',
   uid:'',
   idToken:''
}