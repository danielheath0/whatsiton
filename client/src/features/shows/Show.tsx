import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { allShows } from "./showsSlice"
import MovieComponent from "./MovieComponent"
import { userCountry } from "../users/usersSlice"
import AddToWatchlistButton from "../watchlist/AddToWatchlistButton"
import ViewWatchlist from "../watchlist/ViewWatchlist"

const Show = () => {

    const {id} = useParams<{id:string}>()
    const shows = useSelector(allShows)
    const region = useSelector(userCountry)

    const show = shows.find(show=>show.id===id)

    if (!show) {
        return <div>Could not find show with id {id}</div>
    }





  return (<>
        <MovieComponent data={show} region={region}/>
        <AddToWatchlistButton showId={show.id} showTitle={show.title}/>
        <ViewWatchlist/>
    </>
  )
}
export default Show