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
exports.login = exports.createNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_models_1 = require("../models/users.models");
dotenv_1.default.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fName, lName, email, uName, password, countryCode } = req.body.user;
        console.log(fName, lName, email, uName, password, countryCode);
        const lowerEmail = email.toLowerCase();
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const newUser = yield (0, users_models_1._createNewUser)({ fName, lName, email: lowerEmail, uName, password: hashedPassword, countryCode });
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createNewUser = createNewUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("login: Hi", req.body, "Bye");
        const { uName, password } = req.body;
        console.log("Received in server login:", uName, password);
        console.log("uName in login:", uName);
        console.log("password in login:", password);
        const user = yield (0, users_models_1._login)(uName);
        if (!user)
            return res.status(404).json({ user: null, status: "failed", error: "User not found" });
        const passwordMatch = bcrypt_1.default.compareSync(password + "", user.password_hash);
        if (!passwordMatch)
            return res.status(401).json({
                user: null,
                status: "failed",
                error: "Invalid credentials"
            });
        const accessToken = jsonwebtoken_1.default.sign({ id: user.user_id, uName: user.u_name }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });
        console.log("Sending from server login:", { user, token: accessToken });
        res.status(200).json({
            user: {
                fName: user.f_name,
                lName: user.l_name,
                email: user.email,
                uName: user.u_name,
                password: user.password_hash,
                countryCode: user.country_code
            },
            status: "succeeded",
            error: null,
            token: accessToken
        });
    }
    catch (error) {
        console.log("Server login error:", error);
        console.error("Error logging in user:", error);
        res.status(404).json({ user: null,
            status: "failed",
            error: error.message
        });
    }
});
exports.login = login;
