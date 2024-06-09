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
Object.defineProperty(exports, "__esModule", { value: true });
exports._login = exports._createNewUser = void 0;
const db_1 = require("../config/db");
const _createNewUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ fName, lName, email, uName, password, countryCode }) {
    try {
        const [user] = yield (0, db_1.db)("users").insert({
            f_name: fName,
            l_name: lName,
            email: email,
            u_name: uName,
            password_hash: password,
            country_code: countryCode
        }, ["f_name", "l_name"]);
        return user;
    }
    catch (error) {
        console.error("Error registering user:", error);
        if (error.code === "23505")
            throw new Error("User already exists - please log in.");
        throw error;
    }
});
exports._createNewUser = _createNewUser;
const _login = (uName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("_login uName:", uName);
        const user = yield (0, db_1.db)("users").select("f_name", "l_name", "email", "user_id", "u_name", "password_hash", "country_code").where("u_name", uName).first();
        return user || null;
    }
    catch (error) {
        console.error("Error logging in user:", error);
        console.error("Full error object:", JSON.stringify(error, null, 2));
        throw new Error("Login failed");
    }
});
exports._login = _login;
