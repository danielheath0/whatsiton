"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = __importDefault(require("knex"));
// import fs from "fs";
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
exports.db = (0, knex_1.default)({
    client: "pg",
    connection: {
        host: PGHOST,
        port: Number(PGPORT),
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        ssl: { rejectUnauthorized: false }
    }
});
