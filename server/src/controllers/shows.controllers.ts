import { IncomingHttpHeaders } from "http"
import jwt from "jsonwebtoken"
import { _addToWatchlist, _getWatchlist, _toggleWatched, _removeFromWatchlist } from "../models/shows.models"
import dotenv from "dotenv"
import { Request, Response } from "express"
dotenv.config()

export const addToWatchlist = async (req: Request, res: Response) => {
    try {
        const headers = req.headers as unknown as Record<string, string>

        // console.log('About to extract token');

        const token = headers.authorization?.split(" ")[1]
        // console.log('Token extracted:', token);

        // console.log('About to verify token');

        const decoded = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string) as { id: number, uName: string }

        // console.log('Token verified:', decoded);


        const userId = decoded.id
        // console.log("userId",userId)

        // const { showId, showTitle } = req.body as unknown as { showId: string; showTitle: string } 

        const showId = req.params.showid

        const {showTitle}=req.body as unknown as {showTitle:string}

        // console.log("showId",showId)
        // console.log("showTitle",showTitle)

        const newItem = await _addToWatchlist({userId, showId, showTitle})
        res.status(200).json(newItem)
    } catch (error) {
        res.status(500).json({ message: (error) })
    }}

    export const getWatchlist = async (req: Request, res: Response) => {
        try {
            const headers = req.headers as unknown as Record<string, string>
            const token = headers.authorization?.split(" ")[1]
            const decoded = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string) as { id: number, uName: string }
            const userId = decoded.id
            const watchlist = await _getWatchlist(userId)
            res.status(200).json(watchlist)
        } catch (error) {
            res.status(500).json({ message: (error) })
        }
    }

    export const removeFromWatchlist = async (req: Request, res: Response) => {
        try {
            const headers = req.headers as unknown as Record<string, string>
            const token = headers.authorization?.split(" ")[1]
            const decoded = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string) as { id: number, uName: string }
            const userId = decoded.id
            const showId = req.params.showid
            const deleted = await _removeFromWatchlist({userId, showId})
            res.status(200).json(deleted)
        } catch (error) {
            res.status(500).json({ message: (error) })
        }
    }

    export const toggleWatched = async (req: Request, res: Response) => {
        try {
            const headers = req.headers as unknown as Record<string, string>
            const token = headers.authorization?.split(" ")[1]
            const decoded = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string) as { id: number, uName: string }
            const userId = decoded.id
            const showId = req.params.showid
            const watched = req.body.watched
            const updated = await _toggleWatched({userId, showId, watched}) 
            res.status(200).json(updated)
        } catch (error) {
            res.status(500).json({ message: (error) })
        }
    }