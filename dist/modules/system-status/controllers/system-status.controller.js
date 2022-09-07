"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemStatusController = void 0;
const express_1 = require("express");
class SystemStatusController {
    constructor(systemStatusService) {
        this.systemStatusService = systemStatusService;
        this.path = '';
        this.router = (0, express_1.Router)();
        this.getOk = (req, res, next) => {
            try {
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        };
        this.getSystemInfo = (req, res, next) => {
            try {
                const response = this.systemStatusService.getSystemInfo();
                res.send(response);
            }
            catch (err) {
                next(err);
            }
        };
        this.getServerTime = (req, res, next) => {
            try {
                const response = this.systemStatusService.getServerTime();
                res.send(response);
            }
            catch (err) {
                next(err);
            }
        };
        this.getResourceUsage = (req, res, next) => {
            try {
                const response = this.systemStatusService.getResourceUsage();
                res.send(response);
            }
            catch (err) {
                next(err);
            }
        };
        this.getProcessInfo = (req, res, next) => {
            try {
                const response = this.systemStatusService.getProcessInfo();
                res.send(response);
            }
            catch (err) {
                next(err);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path + '/', this.getOk);
        this.router.get(this.path + '/system', this.getSystemInfo);
        this.router.get(this.path + '/time', this.getServerTime);
        this.router.get(this.path + '/usage', this.getResourceUsage);
        this.router.get(this.path + '/process', this.getProcessInfo);
    }
}
exports.SystemStatusController = SystemStatusController;
//# sourceMappingURL=system-status.controller.js.map