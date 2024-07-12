"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGamesHandler = void 0;
const loadGamesHandler = (req, res, next) => {
    const fromDateQuery = req.query.fromDate;
    const toDateQuery = req.query.toDate;
    console.log('from date', fromDateQuery);
    console.log(' to date', toDateQuery);
    res.status(500).send();
};
exports.loadGamesHandler = loadGamesHandler;
//# sourceMappingURL=loadGamesHandler.js.map