import express from "express";
import { addToWatchlist, getWatchlist, toggleWatched, removeFromWatchlist } from "../controllers/shows.controllers";

const router = express.Router()
// router.post('/watchlist', async (req, res) => {
//     console.log('Request received at /watchlist');
//     // rest of your code
// });
router.post("/:showid", addToWatchlist)
router.get("/",getWatchlist)
router.delete("/:showid", removeFromWatchlist)
router.put("/:showid", toggleWatched)
export default router