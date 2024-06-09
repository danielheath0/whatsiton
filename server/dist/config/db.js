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
// interface Service {
//     id: string
//     addons: any[]
// }
// interface CountryData {
//     name: string
//     services: Service[]
// }
// const data: Record<string, CountryData> = JSON.parse(fs.readFileSync("../../countriesList.json", "utf8"))
// async function insertCountryData(countryCode:string, countryData:CountryData) {
//     await db("countries")
//       .insert({
//         country_code: countryCode,
//         name: countryData.name,
//       })
//       .onConflict("country_code")
//       .ignore();
//     const services = countryData.services.map((service) => ({
//       country_code: countryCode,
//       service_id: service.id,
//       addons: JSON.stringify(service.addons),
//     }));
//     await db("services_options").insert(services).onConflict("id").ignore();
//   }
//   Promise.all(
//     Object.entries(data).map(([countryCode, countryData]) =>
//       insertCountryData(countryCode, countryData)
//     )
//   )
//     .then(() => {
//       console.log("Data inserted successfully");
//       return db.destroy();
//     })
//     .catch((err) => {
//       console.error("An error occurred", err);
//       return db.destroy();
//     });
