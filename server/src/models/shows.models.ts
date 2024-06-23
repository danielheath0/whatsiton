import { db } from "../config/db";

export const _addToWatchlist = async ({userId, showId, showTitle}:{userId:number, showId:string, showTitle:string}) => {

    try {

        const existingItem = await db("watchlist")
        .select("show_id")
        .where("user_id", userId)
        .andWhere("show_id", showId)
        .first();

        if (existingItem) { throw new Error("Show already in watchlist") }

         const [newItem] = await db("watchlist")
         .insert({
                user_id: userId,
                show_id: showId,
                show_name: showTitle
            }).returning("*");
            return newItem
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        throw error;
    }
}

export const _getWatchlist = async (userId:number) => {
    try {
        const watchlist = await db("watchlist")
        .select("show_id", "show_name", "watched")
        .where("user_id", userId);
        return watchlist;
    } catch (error) {
        console.error("Error getting watchlist:", error);
        throw error;
    }
}

export const _removeFromWatchlist = async ({userId, showId}:{userId:number, showId:string}) => {
    try {
        const deleted = await db("watchlist")
        .where("user_id", userId)
        .andWhere("show_id", showId)
        .del();
        return deleted;
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        throw error;
    }
}

export const _toggleWatched = async ({userId, showId, watched}:{userId:number, showId:string, watched:boolean}) => {
    try {
        // console.log(`userId: ${userId}, showId: ${showId}, watched: ${watched}`);

        const show = await db("watchlist")
        .where("user_id", userId)
        .andWhere("show_id", showId)
        .first()

        // console.log(`Retrieved show: ${JSON.stringify(show)}`);

        if (!show) { throw new Error("Show not in watchlist") }

        const updated = await db("watchlist")
        .where("user_id", userId)
        .andWhere("show_id", showId)
        .update({ watched: watched });

        // console.log(`Updated show: ${JSON.stringify(updated)}`);

        return updated;
    } catch (error) {
        console.error("Error marking as watched:", error);
        throw error;
    }
}
