"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminUser = void 0;
const firebase_1 = require("../../../firebase/firebase");
const validateAdminUser = async (req, res, next) => {
    try {
        const isVerified = await firebase_1.auth.verifyIdToken(req.body.idToken)
            .then((decodedToken) => {
            if (decodedToken.uid !== req.body.uid ||
                decodedToken.email !== 'gav@robotanium.com')
                return false;
            return true;
        })
            .catch((e) => {
            throw new Error();
        });
        if (isVerified)
            return next();
        console.log(isVerified, isVerified);
    }
    catch (e) {
        return res.status(500).json({ message: 'could not validate user' });
    }
};
exports.validateAdminUser = validateAdminUser;
//# sourceMappingURL=AdminUserValidate.js.map