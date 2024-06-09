"use strict";
// import express, { Request, Response } from "express"
// import axios from "axios"
// import dotenv from "dotenv"
// dotenv.config()
// const { API_KEY, API_HOST } = process.env
// const router = express.Router()
// router.get("/data", async (req: Request, res: Response) => {
//     const options = {
//         method: 'GET',
//         url: 'https://streaming-availability.p.rapidapi.com/shows/search/title',
//         params: {
//             country: 'il', //TODO: get the list of countries from the API and dynamically fill in this field from select list - probably from useparams in URL
//             title: 'Batman',
//             series_granularity: 'show',
//             show_type: 'movie',
//             output_language: 'en'
//         },
//         headers: {
//             'X-RapidAPI-Key': API_KEY,
//             'X-RapidAPI-Host': "streaming-availability.p.rapidapi.com"
//         }
//     };
//     try {
//         const response = await axios.request(options)
//         return response.data
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             throw error
//         } else {
//             console.error("Error fetching from API");
//             res.status(500).json({ error: "Internal server error" })
//         }
//     }
// })
// export default router
