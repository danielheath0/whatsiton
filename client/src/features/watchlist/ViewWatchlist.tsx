import { useSelector } from "react-redux";
import { allItems, getWatchlist, removeFromWatchlist, toggleWatched } from "./watchlistSlice";
import { useAppDispatch } from "../../app/store";
import { useEffect } from "react";
import { WatchListItemFromDB } from "../../interfaces/interfaces";

const ViewWatchlist = () => {
  const dispatch = useAppDispatch();

  // const state = useSelector((state) => state);
  // console.log(state);
  const watchlist = useSelector(allItems);
  // console.log(watchlist);

  const handleRowClick = (showId:string) => {
    const show = watchlist.find((item:WatchListItemFromDB) => item.show_id === showId);
    // console.log("handleRow", show)
    if (show) {
      dispatch(toggleWatched({ showId, watched: !show.watched })).then(() =>
        dispatch(getWatchlist())
      );
    }
  };

  useEffect(() => {
    dispatch(getWatchlist());
  }, [dispatch]);
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Watched</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(watchlist) &&
          [...watchlist]
            .sort((a, b) => a.show_name.localeCompare(b.show_name))
            .map(
              (item) =>
                item && (
                  <tr
                    key={item.show_id}
                    onClick={() => handleRowClick(item.show_id)}
                    style={{
                      backgroundColor: item.watched ?  "#463465": "#6077b3",
                    }}>
                    <td>{item.show_name}</td>
                    <td>{item.watched ? "✔️" : ""}</td>
                    <td>
                      <button onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(removeFromWatchlist(item.show_id)).then(() => dispatch(getWatchlist()));
                      
                      }}>
                          -
                      </button>
                    </td>
                  </tr>
                )
            )}
      </tbody>
    </table>
  );
};

export default ViewWatchlist;
