"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userAuth = (req, res, next) => {
    if (req.body.idToken && typeof req.body.idToken === 'string' && req.body.idToken.length > 0) {
        return next();
    }
    else {
        res.status(400).json({
            error: {
                message: "id Token not recognized or not given",
            },
        });
        return;
    }
};
//# sourceMappingURL=botRouterSessionAuth.js.map