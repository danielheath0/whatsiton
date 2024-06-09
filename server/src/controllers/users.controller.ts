import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { _createNewUser, _login } from "../models/users.models";
import { UserRegister } from "../types/interfaces";
dotenv.config()

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

export const createNewUser = async (req: Request<UserRegister>, res: Response) => {
    try {
        const { fName, lName, email, uName, password, countryCode }: UserRegister = req.body.user
        const lowerEmail = email.toLowerCase()
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = await _createNewUser({ fName, lName, email: lowerEmail, uName, password: hashedPassword, countryCode })
        res.status(200).json(newUser)

    } catch (error) {

        res.status(500).json({ message: (error as Error).message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { uName, password } = req.body.user
        const user = await _login(uName)

        if (!user) return res.status(404).json({ user: null, status: "failed", error: "User not found" })

        const passwordMatch = bcrypt.compareSync(password + "", user.password_hash)

        if (!passwordMatch) return res.status(401).json({
            user: null,
            status: "failed",
            error: "Invalid credentials"
        })

        const accessToken = jwt.sign({ id: user.user_id, uName: user.u_name }, ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" })

        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })

        res.status(200).json({
            user: {
                fName: user.f_name,
                lName: user.l_name,
                email: user.email,
                uName: user.u_name,
                countryCode: user.country_code
            },
            status: "succeeded",
            error: null,
            token: accessToken
        })
    } catch (error) {
        console.error("Error logging in user:", error)
        res.status(404).json({ user:null,
            status: "failed",
            error: (error as Error).message
         })
    }

}
