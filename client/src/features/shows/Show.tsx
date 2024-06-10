import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { allShows } from "./showsSlice"
import MovieComponent from "./MovieComponent"
import { userCountry } from "../users/usersSlice"
import AddToWatchlistButton from "../watchlist/AddToWatchlistButton"
import type { Show } from "../../interfaces/interfaces"

const Show = () => {

    const {id} = useParams<{id:string}>()
    console.log(id)
    const shows = useSelector(allShows)
    console.log("shows:", shows)
    const region = useSelector(userCountry)

    const show = shows.find((show:Show)=>show.id===id)
    console.log("show",show)

    if (!show) {
      return <div>Could not find show with id {id}</div>
    }

    return (
      <>
        <MovieComponent data={show} region={region}/>
        <AddToWatchlistButton showId={show.id} showTitle={show.title}/>
        
      </>
    )
}
export default Show