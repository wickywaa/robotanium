export declare class AuthService {
    constructor();
    private finduser;
    isFirebaseUser: (token: string, callback: (response: {
        verified: boolean;
        uid: string;
    }) => void) => void;
}
