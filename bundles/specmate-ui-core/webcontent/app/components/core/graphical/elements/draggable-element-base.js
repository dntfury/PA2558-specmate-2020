"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../../../config/config");
var Id_1 = require("../../../../util/Id");
var graphical_node_base_1 = require("./graphical-node-base");
var DraggableElementBase = (function (_super) {
    __extends(DraggableElementBase, _super);
    function DraggableElementBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isGrabbed = false;
        return _this;
    }
    Object.defineProperty(DraggableElementBase.prototype, "rawX", {
        get: function () {
            if (this._rawX === undefined) {
                return this.center.x;
            }
            return this._rawX;
        },
        set: function (x) {
            this._rawX = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableElementBase.prototype, "rawY", {
        get: function () {
            if (this._rawX === undefined) {
                return this.center.y;
            }
            return this._rawY;
        },
        set: function (y) {
            this._rawY = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableElementBase.prototype, "x", {
        get: function () {
            if (this.isOffX && !this.isGrabbed) {
                this.rawX = this.center.x;
            }
            return DraggableElementBase.roundToGrid(this.rawX);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableElementBase.prototype, "y", {
        get: function () {
            if (this.isOffY && !this.isGrabbed) {
                this.rawY = this.center.y;
            }
            return DraggableElementBase.roundToGrid(this.rawY);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableElementBase.prototype, "isOffX", {
        get: function () {
            return this.isCoordOff(this.rawX, this.center.x);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableElementBase.prototype, "isOffY", {
        get: function () {
            return this.isCoordOff(this.rawY, this.center.y);
        },
        enumerable: true,
        configurable: true
    });
    DraggableElementBase.prototype.isCoordOff = function (rawCoord, nodeCoord) {
        return rawCoord === undefined || Math.abs(rawCoord - nodeCoord) >= config_1.Config.GRAPHICAL_EDITOR_GRID_SPACE;
    };
    Object.defineProperty(DraggableElementBase.prototype, "dragDummyPosition", {
        get: function () {
            if (this.isGrabbed) {
                return {
                    x: 0,
                    y: 0
                };
            }
            return this.topLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableElementBase.prototype, "dragDummyDimensions", {
        get: function () {
            if (this.isGrabbed) {
                return {
                    width: this.topLeft.x + this.dimensions.width + 300,
                    height: this.topLeft.y + this.dimensions.height + 300
                };
            }
            return this.dimensions;
        },
        enumerable: true,
        configurable: true
    });
    DraggableElementBase.roundToGrid = function (coord) {
        var rest = coord % config_1.Config.GRAPHICAL_EDITOR_GRID_SPACE;
        if (rest === 0) {
            return coord;
        }
        return coord - rest;
    };
    DraggableElementBase.prototype.drag = function (e) {
        e.preventDefault();
        if (this.isGrabbed) {
            var movementX = (this.prevX ? e.offsetX - this.prevX : 0);
            var movementY = (this.prevY ? e.offsetY - this.prevY : 0);
            var destX = this.rawX + movementX;
            var destY = this.rawY + movementY;
            if (this.isMove(movementX, movementY) && this.isWithinBounds(destX, destY)) {
                this.rawX = destX;
                this.rawY = destY;
                // Works, because this.element.x === this.center.x && this.element.y === this.center.y
                this.element.x = this.x;
                this.element.y = this.y;
            }
            this.prevX = e.offsetX;
            this.prevY = e.offsetY;
        }
    };
    DraggableElementBase.prototype.leave = function (e) {
        e.preventDefault();
        this.dragEnd();
    };
    DraggableElementBase.prototype.grab = function (e) {
        e.preventDefault();
        this.dragStart(e);
    };
    DraggableElementBase.prototype.drop = function (e) {
        e.preventDefault();
        this.dragEnd();
    };
    DraggableElementBase.prototype.dragStart = function (e) {
        this.isGrabbed = true;
    };
    DraggableElementBase.prototype.dragEnd = function () {
        if (this.isGrabbed) {
            this.isGrabbed = false;
            this.prevX = undefined;
            this.prevY = undefined;
            this.dataService.updateElement(this.element, true, Id_1.Id.uuid);
        }
    };
    DraggableElementBase.prototype.isMove = function (movementX, movementY) {
        return movementX > 0 || movementX < 0 || movementY > 0 || movementY < 0;
    };
    DraggableElementBase.prototype.isWithinBounds = function (destX, destY) {
        return destX - this.dimensions.width / 2 >= 0 && destY - this.dimensions.height / 2 >= 0;
    };
    return DraggableElementBase;
}(graphical_node_base_1.GraphicalNodeBase));
exports.DraggableElementBase = DraggableElementBase;
//# sourceMappingURL=draggable-element-base.js.map