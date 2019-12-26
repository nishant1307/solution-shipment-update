"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/**
 * @developer Kumar Nishant
 * @email nishant.mitra94@gmail.com
 */
var challenge_1 = require("./challenge");
var ShipmentUpdate = /** @class */ (function (_super) {
    __extends(ShipmentUpdate, _super);
    function ShipmentUpdate() {
        var _this = _super.call(this) || this;
        _this.activeTasks = [];
        _this.pendingTasks = [];
        _this.taskScheduler();
        return _this;
    }
    ShipmentUpdate.prototype.receiveUpdate = function (id, shipmentData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.activeTasks.filter(function (obj) { return obj.id === id; }).length > 0) {
                    this.pendingTasks.push({ id: id, shipmentData: shipmentData });
                    console.log('Task with same id is already running. Queued for execution', 'ID : ', id);
                }
                else {
                    this.activeTasks.push({ id: id, shipmentData: shipmentData });
                }
                return [2 /*return*/];
            });
        });
    };
    // Task Scheduler polling every 50ms
    ShipmentUpdate.prototype.taskScheduler = function () {
        var _this = this;
        console.log('Polling every 50ms');
        var interval = setInterval(function () {
            if (_this.activeTasks.length) {
                _this.updateShipment(_this.activeTasks[0].id, _this.activeTasks[0].shipmentData);
                console.log('Task execution started', 'ID : ', _this.activeTasks.shift());
            }
            else if (_this.pendingTasks.length) {
                _this.activeTasks.push(_this.pendingTasks.shift());
            }
            else {
                console.log('Idle. No tasks scheduled');
                clearInterval(interval);
            }
        }, 50);
    };
    return ShipmentUpdate;
}(challenge_1.ShipmentSearchIndex));
// Testing
var solutionObj = new ShipmentUpdate();
for (var i = 0; i < 10; i++) {
    solutionObj.receiveUpdate("ID" + (Math.floor(Math.random() * 11) + 1), Math.random().toString());
}
