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
  