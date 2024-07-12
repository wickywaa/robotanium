import JWT from 'jsonwebtoken';
const {sign,verify} = JWT


export class JWTService  {

    private secretToken;
    
    constructor(){
        this.secretToken = process.env.AUTH_SECRET;
    }

   public createJWT = async(id:string):Promise<string> => {
       const token = JWT.sign({id}, this.secretToken,{expiresIn:'1day'})
       return token
    }
    public verifyJWT = async(token:string): Promise<boolean> => {
        return true
    }

}