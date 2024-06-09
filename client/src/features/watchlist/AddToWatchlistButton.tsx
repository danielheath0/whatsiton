import { useDispatch } from "react-redux"
import { addToWatchlist } from "./watchlistSlice"
import { useAppDispatch } from "../../app/store"

const AddToWatchlistButton = ({showId, showTitle}) => {
const dispatch = useAppDispatch()

const handleClick = ()=>{
  dispatch(addToWatchlist({showId, showTitle}))
}
  return (
    <button onClick={handleClick}>Add to watchlist</button>
  )
}
export default AddToWatchlistButton