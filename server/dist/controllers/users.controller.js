"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_models_1 = require("../models/users.models");
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fName, lName, email, uName, password, countryCode } = req.body;
        const lowerEmail = email.toLowerCase();
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const newUser = yield (0, users_models_1._createNewUser)({ fName, lName, email: lowerEmail, uName, password: hashedPassword, countryCode });
        res.json(newUser);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createNewUser = createNewUser;
