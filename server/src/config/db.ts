import knex from "knex";
// import fs from "fs";
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, "../../.env")});

import { ConnectionInterface } from "../types/interfaces";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

export const db = knex({
    client: "pg",
    connection: {
        host: PGHOST,
        port: Number(PGPORT),
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        ssl: { rejectUnauthorized: false }
    } as ConnectionInterface
});
