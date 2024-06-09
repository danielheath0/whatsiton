"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const shows_routes_1 = __importDefault(require("./routes/shows.routes"));
// import apiRoutes from "./routes/api.routes"
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/users", users_routes_1.default);
app.use("/watchlist", shows_routes_1.default);
app.use((err, req, res, next) => { res.status(500).json({ message: err.message }); });
app.get("/", (req, res) => {
    res.send("Express + Typescript Server");
});
// app.use("/api", apiRoutes)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
