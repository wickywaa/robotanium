export declare class JWTService {
    private secretToken;
    constructor();
    createJWT: (id: string) => Promise<string>;
    verifyJWT: (token: string) => Promise<boolean>;
}
