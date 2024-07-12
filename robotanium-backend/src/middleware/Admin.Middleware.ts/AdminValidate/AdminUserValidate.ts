import { Response, NextFunction } from 'express';
import { IconnectBot } from '../../../interfaces';
import { auth } from '../../../firebase/firebase';

export const validateAdminUser =
  async (req: IconnectBot, res: Response, next: NextFunction) => {
    try{
      const isVerified = await auth.verifyIdToken(req.body.idToken)
      .then((decodedToken) => {
        if (decodedToken.uid !== req.body.uid ||
          decodedToken.email !== 'gav@robotanium.com'
        ) return false;
        return true;
      })
      .catch((e) => {
        throw new Error()
      })
      if (isVerified) return next();
      console.log(isVerified,isVerified)
    }
    catch(e){
      return res.status(500).json({ message: 'could not validate user' })
    }

  }



