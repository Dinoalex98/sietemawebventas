"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductCController_1 = require("../controllers/ProductCController");
const router = express_1.default.Router();
router.get('/', ProductCController_1.getProducts);
router.post('/', ProductCController_1.createProduct);
exports.default = router;
