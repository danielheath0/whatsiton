import express, { Express, Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import usersRouter from "./routes/users.routes"
import showsRouter from "./routes/shows.routes"
// import apiRoutes from "./routes/api.routes"

dotenv.config()

const app: Express = express()
const port = process.env.SERVER_PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/users", usersRouter)
app.use("/watchlist", showsRouter)





app.use((err:Error, req:Request, res:Response, next:NextFunction):void => { res.status(500).json({ message: err.message }) })
app.get("/", (req: Request, res: Response) => {
    res.send("Express + Typescript Server")
})



// app.use("/api", apiRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

