"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._toggleWatched = exports._removeFromWatchlist = exports._getWatchlist = exports._addToWatchlist = void 0;
const db_1 = require("../config/db");
const _addToWatchlist = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, showId, showTitle }) {
    try {
        const existingItem = yield (0, db_1.db)("watchlist")
            .select("show_id")
            .where("user_id", userId)
            .andWhere("show_id", showId)
            .first();
        if (existingItem) {
            throw new Error("Show already in watchlist");
        }
        const [newItem] = yield (0, db_1.db)("watchlist")
            .insert({
            user_id: userId,
            show_id: showId,
            show_name: showTitle
        }).returning("*");
        return newItem;
    }
    catch (error) {
        console.error("Error adding to watchlist:", error);
        throw error;
    }
});
exports._addToWatchlist = _addToWatchlist;
const _getWatchlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const watchlist = yield (0, db_1.db)("watchlist")
            .select("show_id", "show_name", "watched")
            .where("user_id", userId);
        return watchlist;
    }
    catch (error) {
        console.error("Error getting watchlist:", error);
        throw error;
    }
});
exports._getWatchlist = _getWatchlist;
const _removeFromWatchlist = (_b) => __awaiter(void 0, [_b], void 0, function* ({ userId, showId }) {
    try {
        const deleted = yield (0, db_1.db)("watchlist")
            .where("user_id", userId)
            .andWhere("show_id", showId)
            .del();
        return deleted;
    }
    catch (error) {
        console.error("Error removing from watchlist:", error);
        throw error;
    }
});
exports._removeFromWatchlist = _removeFromWatchlist;
const _toggleWatched = (_c) => __awaiter(void 0, [_c], void 0, function* ({ userId, showId, watched }) {
    try {
        console.log(`userId: ${userId}, showId: ${showId}, watched: ${watched}`);
        const show = yield (0, db_1.db)("watchlist")
            .where("user_id", userId)
            .andWhere("show_id", showId)
            .first();
        console.log(`Retrieved show: ${JSON.stringify(show)}`);
        if (!show) {
            throw new Error("Show not in watchlist");
        }
        const updated = yield (0, db_1.db)("watchlist")
            .where("user_id", userId)
            .andWhere("show_id", showId)
            .update({ watched: watched });
        console.log(`Updated show: ${JSON.stringify(updated)}`);
        return updated;
    }
    catch (error) {
        console.error("Error marking as watched:", error);
        throw error;
    }
});
exports._toggleWatched = _toggleWatched;
